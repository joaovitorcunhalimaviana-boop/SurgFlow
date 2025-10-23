'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Lock, User, ArrowRight } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPlan?: 'teste' | 'guideflow' | 'mindflow'
  fallbackPath?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPlan,
  fallbackPath = '/cadastro'
}) => {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(fallbackPath)
    }
  }, [loading, isAuthenticated, router, fallbackPath])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Show login required message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl"></div>
          
          <div className="relative">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <Logo size="lg" />
              </div>
              
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                <Lock className="h-4 w-4 mr-2" />
                Acesso Restrito
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Login Necessário
              </h1>
              <p className="text-gray-600">
                Você precisa estar logado para acessar esta página
              </p>
            </div>

            {/* Login Card */}
            <Card className="border-purple-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    Faça login ou crie sua conta para continuar navegando no SurgFlow
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => router.push('/cadastro')}
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    Criar Conta Gratuita
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <Button
                    onClick={() => router.push('/login')}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Já tenho conta
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-2">
                ✅ Acesso gratuito aos guidelines básicos
              </p>
              <p className="text-sm text-gray-500">
                ✅ Salve seus guidelines favoritos
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Check plan access if required
  if (requiredPlan && user) {
    // Admin users have access to everything
    if (user.role === 'super_admin' || user.role === 'admin' || user.plan === 'admin') {
      return <>{children}</>
    }
    
    const planHierarchy = { teste: 0, guideflow: 1, mindflow: 2 }
    const userPlanLevel = planHierarchy[user.plan]
    const requiredPlanLevel = planHierarchy[requiredPlan]

    if (userPlanLevel < requiredPlanLevel) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <Card className="border-purple-200 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Upgrade Necessário
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Este conteúdo requer o plano {requiredPlan === 'guideflow' ? 'GuideFlow' : 'MindFlow'}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => router.push('/planos')}
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    Ver Planos
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    size="lg"
                    className="w-full"
                  >
                    Voltar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  }

  // User is authenticated and has required plan access
  return <>{children}</>
}

export default ProtectedRoute