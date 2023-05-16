"use client"
import { hash } from "@/services/hashPassword";
import { setCookie } from "nookies";
import React, { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
}

type SignUpData = {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children } : { children: React.ReactNode}) {
  const isAuthenticated = false;

  async function signUp({ name, email, password }: SignUpData) {
    const hashedPassword = hash(password);

    const res = await fetch('http://localhost:3000/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password: hashedPassword
      })
    })

    const data = await res.json();

    setCookie(undefined, 'lab-auth.token', data.token, )

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}