'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, ArrowRight, User, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Logo } from '@/components/ui/logo'
import Layout from '@/components/layout/Layout'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

const LoginPageContent: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    rememberMe: false,
    isAdminLogin: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Capturar parâmetros da URL
    const redirect = searchParams.get('redirect')
    const plano = searchParams.get('plano')
    const admin = searchParams.get('admin')
    
    if (redirect) {
      setRedirectUrl(redirect)
    }
    
    if (plano) {
      setSelectedPlan(plano)
    }
    
    if (admin === 'true') {
      setFormData(prev => ({ ...prev, isAdminLogin: true }))
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const loginField = formData.isAdminLogin ? formData.username : formData.email
    
    if (!loginField || !formData.password) {
      setError('Por favor, preencha todos os campos')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      console.log('Tentando fazer login com:', loginField)
      const success = await login(loginField, formData.password)
      console.log('Resultado do login:', success)
      
      if (success) {
        console.log('Login bem-sucedido, redirecionando...')
        // Lógica de redirecionamento baseada nos parâmetros
        if (selectedPlan) {
          router.push(`/checkout?plano=${selectedPlan}`)
        } else if (redirectUrl) {
          router.push(redirectUrl)
        } else {
          router.push('/')
        }
      } else {
        console.log('Login falhou')
        setError('Credenciais incorretas')
      }
    } catch (error) {
      console.error('Erro durante o login:', error)
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <Logo size="lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4"
            >
              <User className="h-4 w-4 mr-2" />
              Área do Usuário
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              Bem-vindo de volta!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-center"
            >
              Entre na sua conta para continuar
            </motion.p>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-purple-200 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl text-gray-900">Fazer Login</CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Email/Username Field */}
                <div className="space-y-2">
                  <label htmlFor={formData.isAdminLogin ? "username" : "email"} className="text-sm font-medium text-gray-700">
                    {formData.isAdminLogin ? "Username" : "Email"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {formData.isAdminLogin ? (
                        <User className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Mail className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <input
                      id={formData.isAdminLogin ? "username" : "email"}
                      type={formData.isAdminLogin ? "text" : "email"}
                      value={formData.isAdminLogin ? formData.username : formData.email}
                      onChange={(e) => handleInputChange(formData.isAdminLogin ? 'username' : 'email', e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder={formData.isAdminLogin ? "Digite seu username" : "seu@email.com"}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex items-center justify-between">
                  {/* Remember Me Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                    />
                    <label 
                      htmlFor="rememberMe" 
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Lembrar-me neste dispositivo
                    </label>
                  </div>

                  <Link 
                  href="/recuperar-senha" 
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Esqueci minha senha
                </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Entrando...
                    </div>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 space-y-3 text-center">
                <p className="text-sm text-gray-600">
                  <Link href="/recuperar-senha" className="text-purple-600 hover:text-purple-700 font-medium">
                    Esqueceu sua senha?
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link href="/cadastro" className="text-purple-600 hover:text-purple-700 font-medium">
                    Criar conta
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center space-y-2"
          >
            <p className="text-sm text-gray-500">
              ✅ Acesso aos guidelines cirúrgicos
            </p>
            <p className="text-sm text-gray-500">
              ✅ Calculadoras médicas especializadas
            </p>
            <p className="text-sm text-gray-500">
              ✅ Conteúdo sempre atualizado
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </Layout>
    }>
      <LoginPageContent />
    </Suspense>
  )
}

export default LoginPage