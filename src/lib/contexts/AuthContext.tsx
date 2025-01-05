import { createContext, useContext, useReducer, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useWeb3React } from '@src/lib/hooks/useWeb3React';

// Types
interface User {
  address: string;
  // Add other user properties
}

interface AuthState {
  user: User | null;
  token: string;
  loading: boolean;
  errorMessage: string | null;
}

interface AuthContextType {
  state: AuthState;
  login: (account: string, nonce: string, signature: string) => Promise<void>;
  logout: () => void;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('0xApesToken') || '',
  loading: false,
  errorMessage: null,
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Reducer
type AuthAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'LOGOUT':
      return { ...initialState, token: '' };
    default:
      return state;
  }
}

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const queryClient = useQueryClient();
  const { account } = useWeb3React();

  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ['user', account],
    queryFn: async () => {
      if (!account) return null;
      const { data } = await axios.get('/user', {
        params: { address: account }
      });
      return data.user;
    },
    enabled: !!account,
    onSuccess: (data) => {
      dispatch({ type: 'SET_USER', payload: data });
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ account, nonce, signature }: { 
      account: string;
      nonce: string;
      signature: string;
    }) => {
      const formData = new URLSearchParams();
      formData.append('address', account);
      formData.append('signature', signature);
      
      const { data } = await axios.post('/login', formData);
      return data.token;
    },
    onSuccess: (token) => {
      localStorage.setItem('0xApesToken', token);
      dispatch({ type: 'SET_TOKEN', payload: token });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  });

  const login = async (account: string, nonce: string, signature: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await loginMutation.mutateAsync({ account, nonce, signature });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('0xApesToken');
    dispatch({ type: 'LOGOUT' });
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Usage example:
/*
const YourComponent = () => {
  const { state, login, logout } = useAuth();
  const { user, loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login(account, nonce, signature)}>Login</button>
      )}
    </div>
  );
};
*/