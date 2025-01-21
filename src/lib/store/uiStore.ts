import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  sidebar: boolean;
  notifications: boolean;
}

interface UIActions {
  toggleTheme: () => void;
  toggleSidebar: () => void;
  toggleNotifications: () => void;
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      theme: 'dark',
      sidebar: true,
      notifications: true,

      toggleTheme: () => 
        set((state) => ({ 
          theme: state.theme === 'light' ? 'dark' : 'light' 
        })),
      toggleSidebar: () => 
        set((state) => ({ 
          sidebar: !state.sidebar 
        })),
      toggleNotifications: () => 
        set((state) => ({ 
          notifications: !state.notifications 
        }))
    }),
    {
      name: 'ui-storage'
    }
  )
); 