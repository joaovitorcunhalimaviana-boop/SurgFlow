'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function RedefinirSenhaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [errors, setErrors] = useState<{password?: string, confirmPassword?: string}>({})
  const { toast } = useToast()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
      // Simular validação do token
      setTimeout(() => {
        setIsValidToken(true) // Em produção, validar no backend
      }, 1000)
    } else {
      setIsValidToken(false)
    }
  }, [searchParams])

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'Senha deve ter pelo menos 8 caracteres'
    if (!/(?=.*[a-z])/.test(password)) return 'Senha deve conter pelo menos uma letra minúscula'
    if (!/(?=.*[A-Z])/.test(password)) return 'Senha deve conter pelo menos uma letra maiúscula'
    if (!/(?=.*\d)/.test(password)) return 'Senha deve conter pelo menos um número'
    return null
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/(?=.*[a-z])/.test(password)) strength++
    if (/(?=.*[A-Z])/.test(password)) strength++
    if (/(?=.*\d)/.test(password)) strength++
    if (/(?=.*[@$!%*?&])/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-red-500'
    if (strength <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return 'Fraca'
    if (strength <= 3) return 'Média'
    return 'Forte'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação
    const newErrors: {password?: string, confirmPassword?: string} = {}
    
    const passwordError = validatePassword(password)
    if (passwordError) {
      newErrors.password = passwordError
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simular redefinição de senha (aqui você implementaria a lógica real)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setPasswordChanged(true)
      toast({
        title: "Senha alterada!",
        description: "Sua senha foi redefinida com sucesso.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Token inválido
  if (isValidToken === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Link Inválido
            </h1>
            
            <p className="text-gray-600 mb-6">
              Este link de recuperação é inválido ou expirou. 
              Solicite um novo link de recuperação.
            </p>
            
            <div className="space-y-4">
              <Link href="/recuperar-senha">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Solicitar Novo Link
                </Button>
              </Link>
              
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Senha alterada com sucesso
  if (passwordChanged) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Senha Redefinida!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Sua senha foi alterada com sucesso. 
              Agora você pode fazer login com sua nova senha.
            </p>
            
            <Link href="/login">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Carregando validação do token
  if (isValidToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Validando link de recuperação...</p>
          </div>
        </div>
      </div>
    )
  }

  const passwordStrength = getPasswordStrength(password)

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
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nova Senha
          </h1>
          
          <p className="text-gray-600">
            Digite sua nova senha
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) {
                      setErrors(prev => ({ ...prev, password: undefined }))
                    }
                  }}
                  placeholder="Digite sua nova senha"
                  className={`pl-10 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Força da senha:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength <= 2 ? 'text-red-600' : 
                      passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {getStrengthText(passwordStrength)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Mínimo 8 caracteres, com maiúscula, minúscula e número
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirmar Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) {
                      setErrors(prev => ({ ...prev, confirmPassword: undefined }))
                    }
                  }}
                  placeholder="Confirme sua nova senha"
                  className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
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
                  Redefinindo...
                </div>
              ) : (
                'Redefinir Senha'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}