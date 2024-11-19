import axios from "axios";
import React, { useReducer, createContext, useEffect } from "react";
import Querystring from "query-string";
import { useWeb3React } from "../hooks/useWeb3React";

// Define interfaces
interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  address: string;
  // add other user properties as needed
}

interface Signer {
  signMessage: (message: string) => Promise<string>;
}

interface AuthAction {
  type: string;
  payload?: any; // Using any temporarily to fix type issues
  error?: Error;
}

interface AuthState {
  user: User | null;
  token: string;
  loading: boolean;
  errorMessage: string | null;
}

// Initial state
export const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("0xApesToken") || "",
  loading: false,
  errorMessage: null,
};

// Context
const AuthStateContext = createContext<AuthState>(initialState);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction>>({} as React.Dispatch<AuthAction>);

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      getUser(dispatch, account);
    }
  }, [account]);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Hooks
export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

// Actions
export async function getUser(
  dispatch: React.Dispatch<AuthAction>,
  address: string
) {
  try {
    const response = await axios.get(`/user`, {
      params: { address },
    });
    dispatch({ type: "FETCH_USER_SUCCESS", payload: response.data.user });
  } catch {
    dispatch({ type: "FETCH_USER_SUCCESS", payload: null });
  }
}

export async function loginUser(
  dispatch: React.Dispatch<AuthAction>,
  account: string,
  nonce: string,
  signer: Signer,
  signature: string
) {
  dispatch({ type: "REQUEST_LOGIN" });
  
  try {
    const { data } = await axios.post(
      `/login`,
      Querystring.stringify({ address: account, signature })
    );
    
    if (data.token) {
      window.localStorage.setItem("0xApesToken", data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
      await getUser(dispatch, account);
      return data.token;
    }
  } catch (error) {
    dispatch({ 
      type: "LOGIN_ERROR", 
      error: new Error(error instanceof Error ? error.message : "Login failed") 
    });
  }
}

export async function logout(dispatch: React.Dispatch<AuthAction>) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("0xApesToken");
}

// Reducer
export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        user: action.payload as User | null,
        loading: false,
      };
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload as string,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: "",
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.error?.message || "An error occurred",
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
