import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { storage } from '../storage/mmkv';
import {
  createUser,
  findUserByCredentials,
  getUserById,
  type UserRow,
} from '../persistence/repository';

const TOKEN_KEY = 'auth.token';

interface AuthContextValue {
  user: UserRow | null;
  userToken: string | null;
  isLoading: boolean;
  signInWithCredentials: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = storage.getString(TOKEN_KEY) ?? null;
      if (savedToken) {
        setUserToken(savedToken);
        (async () => {
          const existingUser = await getUserById(savedToken);
          if (existingUser) {
            setUser(existingUser);
          } else {
            storage.remove(TOKEN_KEY);
            setUserToken(null);
          }
        })();
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithCredentials = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        let dbUser = await findUserByCredentials(email, password);
        if (!dbUser) {
          const fallbackName = 'Youssef Mrabet';
          dbUser = await createUser(fallbackName, email, password);
        }
        storage.set(TOKEN_KEY, dbUser.id);
        setUserToken(dbUser.id);
        setUser(dbUser);
        return { success: true };
      } catch (error) {
        console.error('Failed to sign in', error);
        return {
          success: false,
          error: 'Unable to sign in. Please try again.',
        };
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    storage.remove(TOKEN_KEY);
    setUserToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, userToken, isLoading, signInWithCredentials, signOut }),
    [user, userToken, isLoading, signInWithCredentials, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
