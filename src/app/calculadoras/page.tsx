'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import PremiumFeatureWrapper from '@/components/features/PremiumFeatureWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Calculator,
  Heart,
  Activity,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react'

interface Calculadora {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<any>
  requiredPlan: 'guideflow' | 'mindflow' | null
  color: string
}

export default function CalculadorasPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  
  const calculadoras: Calculadora[] = [
    {
      id: 'alvarado',
      name: 'Escore de Alvarado',
      description: 'Avaliação diagnóstica para apendicite aguda',
      category: 'Cirurgia Geral',
      icon: Calculator,
      requiredPlan: null, // Gratuita
      color: 'green'
    },
    {
      id: 'aas',
      name: 'AAS - Adult Appendicitis Score',
      description: 'Score de apendicite para adultos com dados laboratoriais',
      category: 'Cirurgia Geral',
      icon: Calculator,
      requiredPlan: null, // Gratuita
      color: 'green'
    },
    {
      id: 'air',
      name: 'AIR - Appendicitis Inflammatory Response',
      description: 'Score de resposta inflamatória na apendicite',
      category: 'Cirurgia Geral',
      icon: Calculator,
      requiredPlan: null, // Gratuita
      color: 'green'
    },
    {
      id: 'tokyo-criteria',
      name: 'Critérios de Tokyo',
      description: 'Diagnóstico e gravidade da colecistite aguda',
      category: 'Cirurgia Geral',
      icon: Stethoscope,
      requiredPlan: null, // Gratuita
      color: 'blue'
    },
    {
      id: 'apache-ii',
      name: 'APACHE II',
      description: 'Avaliação de gravidade em UTI',
      category: 'Medicina Intensiva',
      icon: Activity,
      requiredPlan: 'guideflow',
      color: 'red'
    },
    {
      id: 'ranson',
      name: 'Critérios de Ranson',
      description: 'Prognóstico da pancreatite aguda',
      category: 'Gastroenterologia',
      icon: AlertTriangle,
      requiredPlan: 'guideflow',
      color: 'orange'
    },
    {
      id: 'asa-score',
      name: 'Classificação ASA',
      description: 'Avaliação do estado físico pré-operatório',
      category: 'Anestesiologia',
      icon: Stethoscope,
      requiredPlan: 'guideflow',
      color: 'blue'
    },
    {
      id: 'bmi-calculator',
      name: 'IMC e Superfície Corporal',
      description: 'Cálculo de IMC, superfície corporal e peso ideal',
      category: 'Medicina Geral',
      icon: Calculator,
      requiredPlan: 'guideflow',
      color: 'green'
    },
    {
      id: 'sofa',
      name: 'SOFA Score',
      description: 'Avaliação de disfunção orgânica sequencial',
      category: 'Medicina Intensiva',
      icon: Heart,
      requiredPlan: 'guideflow',
      color: 'purple'
    },
    {
      id: 'bisap',
      name: 'BISAP Score',
      description: 'Predição de mortalidade na pancreatite',
      category: 'Gastroenterologia',
      icon: TrendingUp,
      requiredPlan: 'mindflow',
      color: 'indigo'
    },
    {
      id: 'glasgow-coma',
      name: 'Escala de Glasgow',
      description: 'Avaliação do nível de consciência',
      category: 'Neurologia',
      icon: Target,
      requiredPlan: 'guideflow',
      color: 'teal'
    },
    {
      id: 'iss',
      name: 'Injury Severity Score',
      description: 'Gravidade de trauma múltiplo',
      category: 'Trauma',
      icon: Clock,
      requiredPlan: 'mindflow',
      color: 'pink'
    }
  ]

  const categorias = ['Todas', ...new Set(calculadoras.map(calc => calc.category))]

  // Filtrar calculadoras baseado na busca e categoria
  const calculadorasFiltradas = calculadoras.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas' || calc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categoriasFiltradas = selectedCategory === 'Todas' 
    ? [...new Set(calculadorasFiltradas.map(calc => calc.category))]
    : [selectedCategory]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200'
    }
    return colors[color] || colors.blue
  }

  const renderCalculadora = (calc: Calculadora) => {
    const IconComponent = calc.icon
    const content = (
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-lg ${getColorClasses(calc.color).replace('text-', 'text-').replace('border-', 'bg-').replace('bg-', 'bg-').split(' ')[0]}`}>
              <IconComponent className={`h-6 w-6 ${getColorClasses(calc.color).split(' ')[1]}`} />
            </div>
            {calc.requiredPlan && (
              <Badge className={`${getColorClasses(calc.color)} text-xs`}>
                {calc.requiredPlan === 'guideflow' ? 'GuideFlow' : 'MindFlow'}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg text-gray-900">{calc.name}</CardTitle>
          <p className="text-sm text-gray-600">{calc.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {calc.category}
            </Badge>
            <Link href={`/calculadoras/${calc.id}`}>
              <Button
                size="sm"
                className="text-xs"
              >
                Calcular
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )

    if (calc.requiredPlan) {
      return (
        <PremiumFeatureWrapper
          key={calc.id}
          requiredPlan={calc.requiredPlan as 'guideflow' | 'mindflow'}
          featureName={`a calculadora ${calc.name}`}
          className="h-full"
        >
          {content}
        </PremiumFeatureWrapper>
      )
    }

    return <div key={calc.id} className="h-full">{content}</div>
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Calculator className="h-4 w-4 mr-2" />
              Ferramentas de Cálculo
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Calculadoras
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Médicas
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ferramentas precisas para tomada de decisão clínica baseada em evidências científicas
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{calculadoras.length}+</div>
              <div className="text-sm text-gray-600">Calculadoras</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{calculadoras.filter(c => !c.requiredPlan).length}</div>
              <div className="text-sm text-gray-600">Gratuitas</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{[...new Set(calculadoras.map(c => c.category))].length}</div>
              <div className="text-sm text-gray-600">Especialidades</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Baseadas em Evidências</div>
            </div>
          </div>

          {/* Busca e Filtros */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar calculadoras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map(categoria => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {searchTerm && (
              <div className="mt-4 text-sm text-gray-600">
                Mostrando {calculadorasFiltradas.length} resultado(s) para "{searchTerm}"
              </div>
            )}
          </div>

          {/* Calculadoras por Categoria */}
          {calculadorasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma calculadora encontrada</h3>
              <p className="text-gray-500">Tente ajustar os filtros ou termo de busca</p>
            </div>
          ) : (
            categoriasFiltradas.map(categoria => (
              <div key={categoria} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-1 h-8 bg-purple-600 rounded-full mr-4"></div>
                  {categoria}
                  <Badge variant="outline" className="ml-3 text-xs">
                    {calculadorasFiltradas.filter(calc => calc.category === categoria).length}
                  </Badge>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {calculadorasFiltradas
                    .filter(calc => calc.category === categoria)
                    .map(calc => renderCalculadora(calc))
                  }
                </div>
              </div>
            ))
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white mt-16">
            <h3 className="text-2xl font-bold mb-4">
              Precisa de mais calculadoras?
            </h3>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              Upgrade para o GuideFlow ou MindFlow e tenha acesso a todas as calculadoras médicas e scores clínicos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => router.push('/planos')}
              >
                Ver Planos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => router.push('/contato')}
              >
                Solicitar Calculadora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}