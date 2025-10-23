'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Lock, 
  CreditCard, 
  Settings, 
  Eye, 
  EyeOff,
  AlertCircle,
  CheckCircle,
  Crown,
  Shield
} from 'lucide-react'

export default function PerfilPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  
  // Estados para dados pessoais
  const [personalData, setPersonalData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    birthDate: ''
  })
  
  // Estados para alteração de senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  
  const [isLoading, setIsLoading] = useState({
    personal: false,
    password: false
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    if (user) {
      setPersonalData({
        fullName: user.fullName || '',
        email: user.email || '',
        whatsapp: user.whatsapp || '',
        birthDate: user.birthDate || ''
      })
    }
  }, [user])

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const formatBirthDate = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    }
    return value
  }

  const validatePersonalData = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!personalData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório'
    } else if (personalData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Digite seu nome completo'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!personalData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(personalData.email)) {
      newErrors.email = 'Email inválido'
    }

    const whatsappNumbers = personalData.whatsapp.replace(/\D/g, '')
    if (!personalData.whatsapp) {
      newErrors.whatsapp = 'WhatsApp é obrigatório'
    } else if (whatsappNumbers.length !== 11) {
      newErrors.whatsapp = 'WhatsApp deve ter 11 dígitos'
    }

    if (personalData.birthDate) {
      const birthNumbers = personalData.birthDate.replace(/\D/g, '')
      if (birthNumbers.length === 8) {
        const day = parseInt(birthNumbers.substring(0, 2))
        const month = parseInt(birthNumbers.substring(2, 4))
        const year = parseInt(birthNumbers.substring(4, 8))
        const birthDate = new Date(year, month - 1, day)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        
        if (age < 16) {
          newErrors.birthDate = 'Você deve ter pelo menos 16 anos'
        }
      } else {
        newErrors.birthDate = 'Data inválida'
      }
    }

    return newErrors
  }

  const validatePassword = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Senha atual é obrigatória'
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória'
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Nova senha deve ter pelo menos 8 caracteres'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Nova senha deve conter maiúscula, minúscula e número'
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    return newErrors
  }

  const handlePersonalDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validatePersonalData()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(prev => ({ ...prev, personal: true }))

    try {
      // Simular atualização (implementar lógica real)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Atualizar contexto do usuário
      updateUser({
        ...user!,
        ...personalData
      })

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(prev => ({ ...prev, personal: false }))
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validatePassword()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(prev => ({ ...prev, password: true }))

    try {
      // Simular alteração de senha (implementar lógica real)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })

      toast({
        title: "Senha alterada!",
        description: "Sua senha foi atualizada com sucesso.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erro ao alterar senha",
        description: "Verifique sua senha atual e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(prev => ({ ...prev, password: false }))
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'teste':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            <Shield className="w-4 h-4 mr-1" />
            Plano Teste
          </div>
        )
      case 'guideflow':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            GuideFlow
          </div>
        )
      case 'mindflow':
        return (
          <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
            <Crown className="w-4 h-4 mr-1" />
            MindFlow
          </div>
        )
      default:
        return null
    }
  }

  // TEMPORARIAMENTE DESABILITADO - Permitir acesso sem autenticação
  /*
  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    )
  }
  */

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Meu Perfil
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Gerencie suas informações pessoais e configurações
            </p>
            {getPlanBadge(user?.plan || 'admin')}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'personal'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <User className="w-5 h-5 mx-auto mb-1" />
                  Dados Pessoais
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'password'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Lock className="w-5 h-5 mx-auto mb-1" />
                  Alterar Senha
                </button>
                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'subscription'
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  Assinatura
                </button>
              </nav>
            </div>

            <div className="p-8">
              {/* Dados Pessoais */}
              {activeTab === 'personal' && (
                <form onSubmit={handlePersonalDataSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome Completo */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Nome Completo
                      </Label>
                      <div className="relative">
                        <Input
                          id="fullName"
                          type="text"
                          value={personalData.fullName}
                          onChange={(e) => {
                            setPersonalData(prev => ({ ...prev, fullName: e.target.value }))
                            if (errors.fullName) {
                              setErrors(prev => ({ ...prev, fullName: '' }))
                            }
                          }}
                          placeholder="Seu nome completo"
                          className={`pl-10 ${errors.fullName ? 'border-red-300' : ''}`}
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {errors.fullName && (
                        <div className="flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.fullName}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={personalData.email}
                          onChange={(e) => {
                            setPersonalData(prev => ({ ...prev, email: e.target.value }))
                            if (errors.email) {
                              setErrors(prev => ({ ...prev, email: '' }))
                            }
                          }}
                          placeholder="seu@email.com"
                          className={`pl-10 ${errors.email ? 'border-red-300' : ''}`}
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {errors.email && (
                        <div className="flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                        WhatsApp
                      </Label>
                      <div className="relative">
                        <Input
                          id="whatsapp"
                          type="tel"
                          value={personalData.whatsapp}
                          onChange={(e) => {
                            const formatted = formatWhatsApp(e.target.value)
                            setPersonalData(prev => ({ ...prev, whatsapp: formatted }))
                            if (errors.whatsapp) {
                              setErrors(prev => ({ ...prev, whatsapp: '' }))
                            }
                          }}
                          placeholder="(11) 99999-9999"
                          className={`pl-10 ${errors.whatsapp ? 'border-red-300' : ''}`}
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {errors.whatsapp && (
                        <div className="flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.whatsapp}
                        </div>
                      )}
                    </div>

                    {/* Data de Nascimento */}
                    <div className="space-y-2">
                      <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                        Data de Nascimento
                      </Label>
                      <div className="relative">
                        <Input
                          id="birthDate"
                          type="text"
                          value={personalData.birthDate}
                          onChange={(e) => {
                            const formatted = formatBirthDate(e.target.value)
                            setPersonalData(prev => ({ ...prev, birthDate: formatted }))
                            if (errors.birthDate) {
                              setErrors(prev => ({ ...prev, birthDate: '' }))
                            }
                          }}
                          placeholder="DD/MM/AAAA"
                          className={`pl-10 ${errors.birthDate ? 'border-red-300' : ''}`}
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {errors.birthDate && (
                        <div className="flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.birthDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading.personal}
                    className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    {isLoading.personal ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Salvando...
                      </div>
                    ) : (
                      'Salvar Alterações'
                    )}
                  </Button>
                </form>
              )}

              {/* Alterar Senha */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
                  {/* Senha Atual */}
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                      Senha Atual
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => {
                          setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))
                          if (errors.currentPassword) {
                            setErrors(prev => ({ ...prev, currentPassword: '' }))
                          }
                        }}
                        placeholder="Digite sua senha atual"
                        className={`pl-10 pr-10 ${errors.currentPassword ? 'border-red-300' : ''}`}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <div className="flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.currentPassword}
                      </div>
                    )}
                  </div>

                  {/* Nova Senha */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                      Nova Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => {
                          setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))
                          if (errors.newPassword) {
                            setErrors(prev => ({ ...prev, newPassword: '' }))
                          }
                        }}
                        placeholder="Digite sua nova senha"
                        className={`pl-10 pr-10 ${errors.newPassword ? 'border-red-300' : ''}`}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <div className="flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.newPassword}
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      Mínimo 8 caracteres, com maiúscula, minúscula e número
                    </p>
                  </div>

                  {/* Confirmar Nova Senha */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirmar Nova Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => {
                          setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))
                          if (errors.confirmPassword) {
                            setErrors(prev => ({ ...prev, confirmPassword: '' }))
                          }
                        }}
                        placeholder="Confirme sua nova senha"
                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading.password}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    {isLoading.password ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Alterando...
                      </div>
                    ) : (
                      'Alterar Senha'
                    )}
                  </Button>
                </form>
              )}

              {/* Assinatura */}
              {activeTab === 'subscription' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Plano Atual
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        {getPlanBadge(user?.plan || 'admin')}
                        <p className="text-gray-600 mt-2">
                          {user?.plan === 'teste' && 'Acesso gratuito aos conteúdos básicos'}
                          {user?.plan === 'guideflow' && 'Acesso completo aos guias e protocolos'}
                          {user?.plan === 'mindflow' && 'Acesso total + Grupo VIP'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {user?.plan === 'teste' && 'Gratuito'}
                          {user?.plan === 'guideflow' && 'R$ 57/mês'}
                          {user?.plan === 'mindflow' && 'R$ 149/mês'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {user?.plan === 'teste' && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-semibold text-purple-900 mb-2">
                        Upgrade seu plano
                      </h4>
                      <p className="text-purple-800 mb-4">
                        Tenha acesso a todos os conteúdos e funcionalidades exclusivas.
                      </p>
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                        Ver Planos
                      </Button>
                    </div>
                  )}

                  {(user?.plan === 'guideflow' || user?.plan === 'mindflow') && (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-green-800 font-medium">Assinatura Ativa</span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                          Próxima cobrança em 30 dias
                        </p>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button variant="outline">
                          Alterar Plano
                        </Button>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          Cancelar Assinatura
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}