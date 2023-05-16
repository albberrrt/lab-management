"use client"
import { hash } from "@/services/hashPassword";
import { parseCookies, setCookie } from "nookies";
import React, { createContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs";

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  signUp: (data: SignUpData) => Promise<void>;
}

type SignUpData = {
  name: string;
  email: string;
  password: string;
}

type User ={
  name: string;
  email: string;
  avatarUrl: string;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children } : { children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "lab-management.token": token } = parseCookies()

    if(token) {
      const res = fetch('http://localhost:3000/api/user/auth', {
        method: 'POST',
          headers: {
            'bearer': token,
          }
      })
    }
  }, [])

  async function signUp({ name, email, password }: SignUpData) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(JSON.stringify({
      name,
      email,
      password: hashedPassword
    }))

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

    setCookie(undefined, 'lab-auth.token', data.token, {
      maxAge: 60 * 60 * 1,
    })

    setUser(data.userData)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}