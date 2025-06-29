import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// ✅ Define proper types
interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  user: any | null;
  token: string | null;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  showSpinner: () => void;
  hideSpinner: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setLoggedIn(true); // ✅ Don't use stale `token`, use presence of stored values
      }

      setLoading(false); // ✅ move this outside of `if` so loading ends either way
    };

    checkToken();
  }, []);

  const login = async (token: string, user: any) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user); // ✅ Don't stringify here — we want a JS object
    setLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setLoggedIn(false);
    router.replace('/loginScreen')
  };

  const showSpinner = () => setLoading(true);
  const hideSpinner = () => setLoading(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, user, token, login, logout, showSpinner, hideSpinner }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
