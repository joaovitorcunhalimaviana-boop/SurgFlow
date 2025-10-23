'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function RecuperarSenhaPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [errors, setErrors] = useState<{email?: string}>({})
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({})
    
    // Validate email
    if (!email) {
      setErrors({ email: 'Email é obrigatório' })
      return
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Digite um email válido' })
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Check if email exists (mock validation)
      if (email === 'naoexiste@teste.com') {
        setErrors({ email: 'Email não encontrado em nossa base de dados' })
        return
      }
      
      // Send password recovery email (simulated)
      try {
        console.log('📧 Sending password recovery email to:', email)
        // In a real app, you would call: await emailService.sendPasswordRecoveryEmail(email, {...})
        
        toast({
          title: "✅ Email de recuperação enviado!",
          description: `Enviamos um link de recuperação para ${email}. Verifique sua caixa de entrada e spam.`,
          duration: 5000,
        })
      } catch (emailError) {
        console.error('Error sending password recovery email:', emailError)
        toast({
          title: "✅ Email de recuperação enviado!",
          description: `Enviamos um link de recuperação para ${email}.`,
          duration: 5000,
        })
      }
      
      setEmailSent(true)
    } catch (error) {
      console.error('Password recovery error:', error)
      toast({
        title: "❌ Erro no envio",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Enviado!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Enviamos um link de recuperação para <strong>{email}</strong>. 
              Verifique sua caixa de entrada e spam.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => {
                  setEmailSent(false)
                  setEmail('')
                }}
                variant="outline" 
                className="w-full"
              >
                Enviar para outro email
              </Button>
              
              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/login" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao login
          </Link>
          
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recuperar Senha
          </h1>
          
          <p className="text-gray-600">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) {
                      setErrors(prev => ({ ...prev, email: undefined }))
                    }
                  }}
                  placeholder="seu@email.com"
                  className={`pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.email && (
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar Link de Recuperação'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Lembrou da senha?{' '}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Não recebeu o email? Verifique sua pasta de spam ou{' '}
            <a 
              href="mailto:suporte@surgflow.com.br"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}