"use client"

import React, { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children } : { children: React.ReactNode}) {
  const isAuthenticated = false;

  async function signUp({ name, email, password}: SignUpData) { // criar Tipo SignUpData
    const response = await fetch('http://localhost:3000/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}