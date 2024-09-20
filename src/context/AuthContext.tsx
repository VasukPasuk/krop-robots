'use client';
import React, { createContext, FC, useState, ReactNode } from "react";

export const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

type TypeUserPayload = {
  id: number;
  login: string;
  role: "ADMIN" | "CUSTOMER";
};

interface TypeAuth {
  token: string | undefined;
  user: TypeUserPayload | undefined;
}

interface IAuthContextValue extends TypeAuth {
  setToken: (token: string) => void;
  setUser: (user: TypeUserPayload) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<TypeAuth>({
    token: undefined,
    user: undefined,
  });

  const setToken = (token: string) => {
    setAuth((prev) => ({ ...prev, token }));
  };

  const setUser = (user: TypeUserPayload) => {
    setAuth((prev) => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
