"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("designagent-auth");
      if (stored) {
        try {
          const authData = JSON.parse(stored);
          setIsAuthenticated(true);
          setUser(authData.user);
        } catch (error) {
          console.error("Failed to parse auth data:", error);
        }
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // TODO: Replace with actual authentication logic
    // For now, accept any email/password combination
    if (email && password) {
      const authData = {
        user: {
          id: `user-${Date.now()}`,
          email,
        },
      };
      localStorage.setItem("designagent-auth", JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser(authData.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("designagent-auth");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

