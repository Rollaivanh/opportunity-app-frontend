"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

import { refreshSession } from "@/services/authServices/authServices"; // ahora usa tu servicio

interface AuthContextType {
  token: string | null;
  user: any | null;
  loading: boolean;
  login: (token: string, refreshToken: string, userData: any) => void;
  logout: () => void;
  refreshTokenFn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------------------------------
  // 🔥 REFRESH TOKEN usando tu servicio authServices.ts
  // ----------------------------------------------------
  const refreshTokenFn = async () => {
    if (!refreshToken) return;

    try {
      const res = await refreshSession(refreshToken);

      if (!res?.access_token) {
        throw new Error("No se pudo refrescar el token");
      }

      setToken(res.access_token);
      localStorage.setItem("token", res.access_token);
    } catch (err) {
      console.error("Refresh token inválido");
      logout();
    }
  };

  // ----------------------------------------------------
  // 🔥 Cargar tokens del localStorage de manera segura
  // ----------------------------------------------------
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefresh = localStorage.getItem("refresh_token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedRefresh) setRefreshToken(storedRefresh);

    // FIX: evitar error "undefined is not valid JSON"
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parseando user:", err);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // ----------------------------------------------------
  // 🔥 Silent Refresh cada 10 minutos
  // ----------------------------------------------------
  useEffect(() => {
    if (!refreshToken) return;

    const interval = setInterval(() => {
      refreshTokenFn();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  // ----------------------------------------------------
  // 🔥 Login: guarda access, refresh y user
  // ----------------------------------------------------
  const login = (newToken: string, newRefresh: string, userData: any) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);

    setRefreshToken(newRefresh);
    localStorage.setItem("refresh_token", newRefresh);

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ----------------------------------------------------
  // 🔥 Logout completo
  // ----------------------------------------------------
  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        refreshTokenFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
