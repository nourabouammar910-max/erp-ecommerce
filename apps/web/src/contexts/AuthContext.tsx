import {
  createContext,
  useEffect,
  useState,
} from "react";

import { authService } from "../services/auth.service";

export const AuthContext =
  createContext<any>(null);

export function AuthProvider({
  children,
}: any) {
  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("access_token");

    const savedUser =
      localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  async function login(data: any) {
    const res =
      await authService.login(data);

    const {
      access_token,
      refresh_token,
      user,
    } = res.data;

    localStorage.setItem(
      "access_token",
      access_token
    );

    localStorage.setItem(
      "refresh_token",
      refresh_token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setUser(user);

    return res;
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}