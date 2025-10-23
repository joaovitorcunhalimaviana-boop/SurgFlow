'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserByToken } from '@/lib/mockAuth'

export interface User {
  id: string
  fullName: string
  email: string
  whatsapp: string
  plan: 'teste' | 'guideflow' | 'mindflow' | 'admin'
  role?: 'user' | 'admin' | 'super_admin'
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  fullName: string
  email: string
  whatsapp: string
  birthDate: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log('AuthContext: Verificação de autenticação TEMPORARIAMENTE DESABILITADA')
      // TEMPORARIAMENTE DESABILITADO - Simular usuário sempre logado
      setUser({
        id: 'temp-user',
        fullName: 'Usuário Temporário',
        email: 'temp@surgflow.com',
        whatsapp: '(00) 00000-0000',
        plan: 'admin',
        role: 'super_admin',
        isActive: true
      })
      setLoading(false)
      return
      
      /* CÓDIGO ORIGINAL - REATIVAR QUANDO NECESSÁRIO
      console.log('AuthContext: Verificando autenticação...')
      // Get token from cookie
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token='))
        ?.split('=')[1]

      console.log('AuthContext: Token encontrado:', token ? 'Sim' : 'Não')

      if (!token) {
        console.log('AuthContext: Nenhum token encontrado')
        setLoading(false)
        return
      }

      console.log('AuthContext: Buscando dados do usuário...')
      const userData = await getUserByToken(token)
      console.log('AuthContext: Dados do usuário:', userData)
      
      if (userData) {
        console.log('AuthContext: Definindo usuário no estado')
        setUser(userData)
      } else {
        console.log('AuthContext: Nenhum dado de usuário retornado')
      }
      */
    } catch (error) {
      console.error('AuthContext: Erro na verificação de auth:', error)
    } finally {
      console.log('AuthContext: Finalizando verificação de auth')
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('AuthContext: Iniciando login para', email)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('AuthContext: Response status:', response.status)
      const data = await response.json()
      console.log('AuthContext: Response data:', data)

      if (!response.ok) {
        console.log('AuthContext: Login falhou - response não ok')
        return false
      }

      console.log('AuthContext: Definindo usuário:', data.user)
      setUser(data.user)
      
      // Verificar se o cookie foi definido
      setTimeout(() => {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-token='))
          ?.split('=')[1]
        console.log('AuthContext: Token após login:', token ? 'Definido' : 'Não definido')
      }, 100)
      
      return true
    } catch (error) {
      console.error('AuthContext: Erro no login:', error)
      return false
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro no cadastro')
      }

      setUser(data.user)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    // Clear cookie
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setUser(null)
    window.location.href = '/login'
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}