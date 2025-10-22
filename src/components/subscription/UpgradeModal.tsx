'use client'

import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Crown, 
  Check, 
  ArrowRight, 
  Star,
  Zap,
  Users,
  BookOpen,
  Calculator,
  Shield,
  Clock,
  Award
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  requiredPlan: 'guideflow' | 'mindflow'
  currentFeature?: string
  redirectUrl?: string
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  requiredPlan,
  currentFeature = 'este recurso',
  redirectUrl
}) => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Acessibilidade: foco no modal quando aberto
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  // Acessibilidade: fechar com ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevenir scroll do body
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Fechar ao clicar fora do modal
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const planDetails = {
    guideflow: {
      name: 'GuideFlow',
      price: 'R$ 57,00',
      originalPrice: 'R$ 97,00',
      color: 'blue',
      icon: BookOpen,
      badge: 'MAIS POPULAR',
      features: [
        'Acesso a todos os guidelines premium',
        'Fluxogramas interativos avançados',
        'Calculadoras médicas integradas',
        'Casos clínicos exclusivos',
        'Suporte prioritário',
        'Atualizações em tempo real',
        'Download de conteúdo para offline',
        'Certificados de participação'
      ]
    },
    mindflow: {
      name: 'MindFlow',
      price: 'R$ 149,00',
      originalPrice: 'R$ 249,00',
      color: 'purple',
      icon: Crown,
      badge: 'PREMIUM',
      features: [
        'Tudo do GuideFlow +',
        'Grupo VIP WhatsApp "Hobby Cirúrgico"',
        'Aulas exclusivas com especialistas',
        'Network com cirurgiões renomados',
        'Casos clínicos premium',
        'Mentoria personalizada',
        'Acesso antecipado a novos recursos',
        'Consultoria em pesquisa científica'
      ]
    }
  }

  const plan = planDetails[requiredPlan]
  const PlanIcon = plan.icon

  const handleUpgradeClick = () => {
    if (!isAuthenticated) {
      // Usuário não logado - redirecionar para cadastro com plano selecionado
      const params = new URLSearchParams({
        plano: requiredPlan,
        ...(redirectUrl && { redirect: redirectUrl })
      })
      router.push(`/cadastro?${params.toString()}`)
    } else {
      // Usuário logado - redirecionar para página de planos
      const params = new URLSearchParams({
        plano: requiredPlan,
        ...(redirectUrl && { redirect: redirectUrl })
      })
      router.push(`/planos?${params.toString()}`)
    }
    onClose()
  }

  const getCtaText = () => {
    if (!isAuthenticated) {
      return 'Criar Conta e Fazer Upgrade'
    }
    return 'Fazer Upgrade Agora'
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-title"
      aria-describedby="upgrade-modal-description"
    >
      <div className="relative w-full max-w-2xl" ref={modalRef}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <Card className="border-2 border-purple-200 shadow-2xl">
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Fechar modal"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <CardHeader className="text-center pb-6 pt-8">
              {/* Premium Badge */}
              <div className="flex justify-center mb-4">
                <Badge className={`px-4 py-2 ${
                  plan.color === 'purple' 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                }`}>
                  <Crown className="h-4 w-4 mr-2" />
                  {plan.badge}
                </Badge>
              </div>

              <div className="mb-6">
                <div className={`w-20 h-20 ${
                  plan.color === 'purple' ? 'bg-purple-100' : 'bg-blue-100'
                } rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <PlanIcon className={`h-10 w-10 ${
                    plan.color === 'purple' ? 'text-purple-600' : 'text-blue-600'
                  }`} />
                </div>
                
                <CardTitle id="upgrade-modal-title" className="text-3xl font-bold text-gray-900 mb-2">
                  Acesso ao {plan.name}
                </CardTitle>
                <p id="upgrade-modal-description" className="text-gray-600 text-lg">
                  Para acessar {currentFeature}, você precisa do plano {plan.name}
                </p>
              </div>

              {/* Price with Discount */}
              <div className="flex items-center justify-center mb-2">
                <span className="text-lg text-gray-500 line-through mr-3">
                  {plan.originalPrice}
                </span>
                <span className={`text-5xl font-bold ${
                  plan.color === 'purple' ? 'text-purple-600' : 'text-blue-600'
                }`}>
                  {plan.price}
                </span>
                <span className="text-gray-600 ml-2 text-lg">/mês</span>
              </div>
              
              {/* Discount Badge */}
              <div className="flex items-center justify-center mb-6">
                <Badge variant="destructive" className="bg-red-500 text-white">
                  <Clock className="h-3 w-3 mr-1" />
                  50% OFF - Oferta Limitada
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {/* Features List */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  O que você terá acesso:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Status Message */}
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-medium">
                      Novo no SurgFlow? Crie sua conta e ganhe acesso imediato!
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleUpgradeClick}
                  className={`w-full py-4 text-lg font-semibold ${
                    plan.color === 'purple'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    plan.color === 'purple' ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
                >
                  {getCtaText()}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                
                <Button
                  onClick={onClose}
                  variant="ghost"
                  className="w-full py-3 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Talvez mais tarde
                </Button>
              </div>

              {/* Guarantee and Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <span>Garantia de 7 dias ou seu dinheiro de volta</span>
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Award className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Cancele a qualquer momento</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Proof */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Mais de 2.000 profissionais já confiam no SurgFlow
            </p>
            <p className="text-xs text-gray-500 mt-1">
              "Revolucionou minha prática clínica" - Dr. João Silva, Cirurgião Geral
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradeModal