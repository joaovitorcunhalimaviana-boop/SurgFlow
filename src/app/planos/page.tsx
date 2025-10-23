'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Check, Star, Crown, Zap, Users, BookOpen, Calculator, Shield, Award, MessageCircle, UserCheck, TrendingUp, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PlanosPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const router = useRouter()

  const plans = [
    {
      id: 'teste',
      name: 'Teste',
      description: 'Perfeito para conhecer a plataforma',
      price: { monthly: 0, annual: 0 },
      color: 'gray',
      features: [
        'Acesso limitado a conteúdos básicos',
        'Visualização de alguns guideflows',
        'Acesso a calculadoras básicas'
      ],
      cta: 'Começar Gratuitamente',
      badge: null
    },
    {
      id: 'guideflow',
      name: 'GuideFlow',
      description: 'Acesso aos guideflows, calculadoras e scores',
      price: { monthly: 49, annual: 490 },
      color: 'purple',
      features: [
        'Acesso completo a todos os guideflows',
        'Todas as calculadoras médicas',
        'Atualizações constantes',
        'Acesso via mobile e desktop'
      ],
      cta: 'Assinar GuideFlow',
      badge: 'Mais Barato'
    },
    {
      id: 'mindflow',
      name: 'MindFlow',
      description: 'Experiência completa - combo completo',
      price: { monthly: 179, annual: 1790 },
      color: 'yellow',
      features: [
        'Tudo do GuideFlow +',
        'Acesso ao grupo VIP WhatsApp "SurgFlow"',
        'Discussões de casos clínicos',
        'Network com subespecialistas',
        'Oportunidades de pesquisa',
        'Acesso antecipado a novos recursos'
      ],
      cta: 'Assinar MindFlow',
      badge: 'Mais Completo'
    }
  ]

  const faqs = [
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Seu acesso continuará ativo até o final do período pago.'
    },
    {
      question: 'O conteúdo é atualizado regularmente?',
      answer: 'Sim! Nosso time de especialistas atualiza constantemente o conteúdo com as mais recentes evidências científicas e guidelines internacionais.'
    },
    {
      question: 'Posso acessar de qualquer dispositivo?',
      answer: 'Claro! O SurgFlow funciona perfeitamente em computadores, tablets e smartphones, permitindo acesso onde você estiver.'
    },
    {
      question: 'Como funciona o grupo VIP do MindFlow?',
      answer: 'É um grupo exclusivo no WhatsApp com cirurgiões especialistas, onde você pode tirar dúvidas, discutir casos e fazer network profissional.'
    }
  ]

  const getBadgeStyle = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-600 text-white'
      case 'yellow':
        return 'bg-yellow-500 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getButtonStyle = (plan: any) => {
    if (plan.id === 'teste') {
      return 'bg-gray-600 hover:bg-gray-700 text-white'
    } else if (plan.color === 'purple') {
      return 'bg-purple-600 hover:bg-purple-700 text-white'
    } else if (plan.color === 'yellow') {
      return 'bg-yellow-500 hover:bg-yellow-600 text-white'
    }
    return 'bg-gray-600 hover:bg-gray-700 text-white'
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Acelere sua
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Evolução Cirúrgica
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Escolha o plano ideal para sua jornada. Todos incluem acesso aos melhores recursos para sua prática médica.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Mensal
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Anual
              </span>
              {isAnnual && (
                <div className="relative ml-3 group">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full cursor-help">
                    Economize 17%
                  </span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    Pagando anualmente, você economiza R$ {((49 * 12) - 490).toFixed(0)} por ano no GuideFlow e R$ {((179 * 12) - 1790).toFixed(0)} por ano no MindFlow
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl flex flex-col ${
                    plan.badge === 'Mais Completo' ? 'border-yellow-300 scale-105' : 
                    plan.badge === 'Mais Barato' ? 'border-purple-300 scale-105' : 'border-gray-200'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${getBadgeStyle(plan.color)}`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      
                      {/* Price */}
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gray-900">
                          R$ {isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-gray-600">
                          {plan.price.monthly === 0 ? '' : isAnnual ? '/ano' : '/mês'}
                        </span>
                        {isAnnual && plan.price.monthly > 0 && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            ou R$ {(plan.price.annual / 12).toFixed(2).replace('.', ',')}/mês
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8 flex-grow">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button - Always at bottom */}
                    <div className="mt-auto">
                      <Button 
                        className={`w-full py-3 font-semibold ${getButtonStyle(plan)}`}
                        size="lg"
                        onClick={() => {
                          if (plan.id === 'teste') {
                            router.push('/cadastro')
                          } else {
                            // Redirect to login with plan parameter for checkout
                            router.push(`/login?plano=${plan.id}`)
                          }
                        }}
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* MindFlow Special Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              💡 Por que MindFlow vale o investimento?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <MessageCircle className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Acesso a subespecialistas na palma da mão</h3>
              <p className="text-gray-600 text-sm">Tire dúvidas diretamente com cirurgiões especialistas</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Network que impulsiona sua carreira</h3>
              <p className="text-gray-600 text-sm">Conecte-se com profissionais de referência</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <BookOpen className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Discussões de casos clínicos</h3>
              <p className="text-gray-600 text-sm">Discuta casos clínicos e tenha discussões aprofundadas com especialistas e subespecialistas</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <TrendingUp className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Oportunidades de pesquisa</h3>
              <p className="text-gray-600 text-sm">Acesso a projetos e orientação científica</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes sobre Planos
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
       </div>
     </Layout>
   )
 }