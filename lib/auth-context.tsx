"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserType = "creator" | "brand"

export interface User {
  name: string
  email: string
  company?: string
  avatar?: string
  userType: UserType
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (email: string, password: string, userType: UserType) => Promise<void>
  signup: (data: { email: string; password: string; name: string; userType: UserType; company?: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: Record<UserType, User> = {
  creator: {
    name: "Lea Martin",
    email: "lea@example.com",
    userType: "creator",
  },
  brand: {
    name: "Marie Dupont",
    email: "marie@greenbeauty.fr",
    company: "GreenBeauty",
    userType: "brand",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const login = useCallback(
    async (email: string, _password: string, userType: UserType) => {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const mockUser = { ...MOCK_USERS[userType], email }
      setUser(mockUser)
      router.push(userType === "creator" ? "/creator/dashboard" : "/brand/dashboard")
    },
    [router]
  )

  const signup = useCallback(
    async (data: { email: string; password: string; name: string; userType: UserType; company?: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const newUser: User = {
        name: data.name,
        email: data.email,
        company: data.company,
        userType: data.userType,
      }
      setUser(newUser)
      router.push(data.userType === "creator" ? "/creator/dashboard" : "/brand/dashboard")
    },
    [router]
  )

  const logout = useCallback(() => {
    setUser(null)
    router.push("/")
  }, [router])

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
