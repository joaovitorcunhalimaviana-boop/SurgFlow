'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useToast } from '@/components/ui/toast'

interface User {
  id: string
  fullName: string
  email: string
  whatsapp: string
  plan: 'teste' | 'guideflow' | 'mindflow'
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateUserPlan: (newPlan: 'teste' | 'guideflow' | 'mindflow') => Promise<boolean>
  isAuthenticated: boolean
}

interface RegisterData {
  fullName: string
  email: string
  whatsapp: string
  password: string
  plan?: 'teste' | 'guideflow' | 'mindflow'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showSuccess, showError } = useToast()

  const isAuthenticated = !!user

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('surgflow_user')
        const storedToken = localStorage.getItem('surgflow_token')
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        localStorage.removeItem('surgflow_user')
        localStorage.removeItem('surgflow_token')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate login validation
      if (email === 'teste@teste.com' && password === 'password') {
        // Mock user data - replace with actual API response
        const mockUser: User = {
          id: '1',
          fullName: 'Dr. João Silva',
          email: email,
          whatsapp: '+55 11 99999-9999',
          plan: 'teste',
          isActive: true
        }
        
        // Store user data and token
        localStorage.setItem('surgflow_user', JSON.stringify(mockUser))
        localStorage.setItem('surgflow_token', 'mock-jwt-token')
        
        setUser(mockUser)
        showSuccess('✅ Login realizado com sucesso!', `Bem-vindo de volta, ${mockUser.fullName}!`)
        return true
      } else {
        showError('❌ Email ou senha incorretos', 'Verifique suas credenciais e tente novamente.')
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      showError('❌ Erro no login', 'Ocorreu um erro inesperado. Tente novamente.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check if email already exists (mock validation)
      if (userData.email === 'existente@teste.com') {
        showError('❌ Este email já está em uso', 'Faça login ou use outro email.')
        return false
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: userData.fullName,
        email: userData.email,
        whatsapp: userData.whatsapp,
        plan: userData.plan || 'teste',
        isActive: true
      }
      
      // Store user data and token
      localStorage.setItem('surgflow_user', JSON.stringify(newUser))
      localStorage.setItem('surgflow_token', 'mock-jwt-token')
      
      setUser(newUser)
      
      // Send welcome email (simulated)
      try {
        console.log('📧 Sending welcome email to:', newUser.email)
        // In a real app, you would call: await emailService.sendWelcomeEmail({...})
        showSuccess(`🎉 Conta criada com sucesso! Bem-vindo ao SurgFlow, ${newUser.fullName}!`, 'Sua jornada de aprendizado começa agora. Verifique seu email para mais informações.')
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError)
        showSuccess(`🎉 Conta criada com sucesso! Bem-vindo ao SurgFlow, ${newUser.fullName}!`, 'Sua jornada de aprendizado começa agora.')
      }
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      showError('❌ Erro no cadastro', 'Ocorreu um erro inesperado. Tente novamente.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('surgflow_user')
    localStorage.removeItem('surgflow_token')
    setUser(null)
    showSuccess('Logout realizado com sucesso', 'Até logo!')
  }

  const updateUserPlan = async (newPlan: 'teste' | 'guideflow' | 'mindflow'): Promise<boolean> => {
    if (!user) return false
    
    try {
      // Simulate API call to update user plan
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const oldPlan = user.plan
      const updatedUser = { ...user, plan: newPlan }
      
      // Update localStorage
      localStorage.setItem('surgflow_user', JSON.stringify(updatedUser))
      
      // Update state
      setUser(updatedUser)
      
      const planNames = {
        teste: 'Plano Teste',
        guideflow: 'GuideFlow',
        mindflow: 'MindFlow'
      }
      
      // Send plan upgrade email (simulated)
      try {
        console.log('📧 Sending plan upgrade email to:', user.email)
        // In a real app, you would call: await emailService.sendPlanUpgradeEmail({...})
        showSuccess(
          '🎉 Plano atualizado com sucesso!', 
          `Bem-vindo ao ${planNames[newPlan]}! Aproveite todos os recursos disponíveis. Verifique seu email para mais detalhes.`
        )
      } catch (emailError) {
        console.error('Error sending plan upgrade email:', emailError)
        showSuccess(
          '🎉 Plano atualizado com sucesso!', 
          `Bem-vindo ao ${planNames[newPlan]}! Aproveite todos os recursos disponíveis.`
        )
      }
      
      return true
    } catch (error) {
      console.error('Error updating user plan:', error)
      showError('❌ Erro ao atualizar plano', 'Ocorreu um erro inesperado. Tente novamente.')
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUserPlan,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}