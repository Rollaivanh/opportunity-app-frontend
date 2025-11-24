"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/authServices/authServices";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  tryRefresh: () => Promise<string | null>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);

    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // If no token, attempt refresh using HttpOnly cookie
  useEffect(() => {
    if (!token) {
      tryRefresh();
    }
  }, [token]);

  // LOGIN
  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);

    setToken(res.access_token);
    setUser(res.user);

    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("user", JSON.stringify(res.user));
  };

  // REGISTER
  const register = async (data: any) => {
    await authService.register(data);
  };

  // REFRESH (cookie HttpOnly)
  const tryRefresh = async () => {
    try {
      const data = await authService.refresh();

      setToken(data.access_token);
      localStorage.setItem("access_token", data.access_token);

      return data.access_token;
    } catch (err) {
      logout();
      return null;
    }
  };
  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        tryRefresh,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
