import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  showSpinner: () => Promise<void>;
  hideSpinner: () => Promise<void>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setLoggedIn(!!token);
      setLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setLoggedIn(false);
  };
  const showSpinner = async ()=>{
    setLoading(true);
  }
  const hideSpinner = async ()=>{
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, showSpinner, hideSpinner }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
