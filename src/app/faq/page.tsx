'use client'

import React, { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  HelpCircle,
  BookOpen,
  Users,
  Shield,
  Smartphone,
  Clock,
  Mail,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'geral' | 'guidelines' | 'tecnico' | 'conta'
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'geral',
    question: 'O que é o SurgFlow?',
    answer: 'O SurgFlow é uma plataforma digital que transforma guidelines médicos complexos em fluxogramas interativos e de fácil consulta. Foi criado especificamente para estudantes de medicina, residentes de cirurgia e cirurgiões que precisam de acesso rápido a protocolos durante plantões e situações de urgência.'
  },
  {
    id: '2',
    category: 'geral',
    question: 'Como surgiu a ideia do SurgFlow?',
    answer: 'A ideia nasceu durante um plantão noturno, quando o criador estava explicando o manejo de colecistite aguda para uma estudante de medicina. A dificuldade de resumir rapidamente o extenso Tokyo Guidelines 2018 inspirou a criação de uma ferramenta que tornasse esses protocolos mais acessíveis e práticos.'
  },
  {
    id: '3',
    category: 'guidelines',
    question: 'Quais guidelines estão disponíveis?',
    answer: 'Atualmente oferecemos os principais guidelines para abdômen agudo, incluindo Tokyo Guidelines 2018 para colecistite e colangite, Atlanta Classification para pancreatite, e protocolos para apendicite e diverticulite. Estamos constantemente adicionando novos guidelines baseados nas necessidades da comunidade médica.'
  },
  {
    id: '4',
    category: 'guidelines',
    question: 'Os guidelines são atualizados?',
    answer: 'Sim! Monitoramos constantemente as atualizações dos guidelines internacionais e mantemos nosso conteúdo sempre atualizado com as versões mais recentes. Quando há mudanças significativas, notificamos os usuários através de nossa newsletter.'
  },
  {
    id: '5',
    category: 'tecnico',
    question: 'Posso usar o SurgFlow no meu celular?',
    answer: 'Absolutamente! O SurgFlow foi desenvolvido com design responsivo, funcionando perfeitamente em smartphones, tablets e computadores. Você pode acessar os fluxogramas rapidamente durante plantões, mesmo em dispositivos móveis.'
  },
  {
    id: '6',
    category: 'tecnico',
    question: 'Preciso de internet para usar?',
    answer: 'Atualmente, o SurgFlow requer conexão com a internet para funcionar. Estamos desenvolvendo uma versão offline que permitirá consultar os guidelines principais mesmo sem conexão, especialmente útil em ambientes hospitalares com conectividade limitada.'
  },
  {
    id: '7',
    category: 'conta',
    question: 'Preciso criar uma conta para usar?',
    answer: 'Não é necessário criar conta para acessar os guidelines básicos. No entanto, criando uma conta gratuita, você pode salvar seus guidelines favoritos, acompanhar seu histórico de consultas e receber notificações sobre atualizações.'
  },
  {
    id: '8',
    category: 'conta',
    question: 'O SurgFlow é gratuito?',
    answer: 'Sim! O SurgFlow é completamente gratuito para estudantes de medicina, residentes e profissionais da saúde. Nossa missão é democratizar o acesso aos guidelines médicos e contribuir para uma medicina mais segura e baseada em evidências.'
  },
  {
    id: '9',
    category: 'geral',
    question: 'Como posso contribuir com o projeto?',
    answer: 'Existem várias formas de contribuir: sugerindo novos guidelines, reportando erros, compartilhando casos clínicos, ou ajudando na divulgação. Entre em contato conosco através da página de contato para discutir como você pode participar do desenvolvimento do projeto.'
  },
  {
    id: '10',
    category: 'guidelines',
    question: 'Os fluxogramas substituem a leitura completa dos guidelines?',
    answer: 'Não! Os fluxogramas são ferramentas de consulta rápida e apoio à decisão clínica. Recomendamos sempre a leitura completa dos guidelines originais para compreensão aprofundada. Nossos fluxogramas incluem links para os documentos originais.'
  },
  {
    id: '11',
    category: 'tecnico',
    question: 'Como reportar um erro ou problema?',
    answer: 'Se encontrar algum erro no conteúdo ou problema técnico, por favor entre em contato através da nossa página de contato ou envie um email para contato@surgflow.com. Levamos todos os reports muito a sério e corrigimos rapidamente qualquer inconsistência.'
  },
  {
    id: '12',
    category: 'geral',
    question: 'Posso usar o SurgFlow para ensinar?',
    answer: 'Claro! Encorajamos o uso do SurgFlow em atividades educacionais. Professores e preceptores podem usar nossos fluxogramas em aulas, discussões de caso e treinamentos. Se precisar de materiais específicos para ensino, entre em contato conosco.'
  }
]

const categories = {
  geral: { name: 'Geral', icon: HelpCircle, color: 'purple' },
  guidelines: { name: 'Guidelines', icon: BookOpen, color: 'blue' },
  tecnico: { name: 'Técnico', icon: Smartphone, color: 'green' },
  conta: { name: 'Conta', icon: Users, color: 'orange' }
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-25 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Perguntas
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Frequentes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Encontre respostas para as dúvidas mais comuns sobre o SurgFlow
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar nas perguntas frequentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant={selectedCategory === 'all' ? 'secondary' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                Todas
              </Button>
              {Object.entries(categories).map(([key, category]) => {
                const Icon = category.icon
                return (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'secondary' : 'outline'}
                    onClick={() => setSelectedCategory(key)}
                    className={`${selectedCategory === key ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma pergunta encontrada
              </h3>
              <p className="text-gray-600">
                Tente ajustar sua busca ou selecionar uma categoria diferente
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQ.map((item) => {
                const isOpen = openItems.includes(item.id)
                const categoryInfo = categories[item.category]
                const CategoryIcon = categoryInfo.icon

                return (
                  <Card key={item.id} className="border-purple-200 hover:shadow-md transition-shadow duration-200">
                    <CardHeader 
                      className="cursor-pointer hover:bg-purple-50 transition-colors duration-200"
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`bg-${categoryInfo.color}-100 p-2 rounded-lg flex-shrink-0`}>
                            <CategoryIcon className={`h-5 w-5 text-${categoryInfo.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg text-left leading-relaxed">
                              {item.question}
                            </CardTitle>
                            <div className="flex items-center mt-2">
                              <span className={`text-xs px-2 py-1 bg-${categoryInfo.color}-100 text-${categoryInfo.color}-700 rounded-full`}>
                                {categoryInfo.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-purple-600" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {isOpen && (
                      <CardContent className="pt-0 pb-6">
                        <div className="ml-14">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para ajudar! Confira essas opções adicionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300 text-center">
              <CardContent className="pt-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Entre em Contato</h3>
                <p className="text-gray-600 mb-4">
                  Envie sua dúvida diretamente para nossa equipe
                </p>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  Falar Conosco
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300 text-center">
              <CardContent className="pt-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentação</h3>
                <p className="text-gray-600 mb-4">
                  Acesse guias detalhados sobre como usar a plataforma
                </p>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  Ver Guias
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300 text-center">
              <CardContent className="pt-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidade</h3>
                <p className="text-gray-600 mb-4">
                  Participe de discussões com outros profissionais
                </p>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                  Participar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Response Time Info */}
      <section className="py-12 bg-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-200">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Tempo de Resposta</h3>
                <p className="text-gray-600">Nosso compromisso com você</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">E-mail: até 24 horas</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Dúvidas técnicas: até 48 horas</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Sugestões: até 1 semana</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Correções: até 72 horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}