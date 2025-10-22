'use client'

import React from 'react'
import Layout from '@/components/layout/Layout'
import PremiumFeatureWrapper from '@/components/features/PremiumFeatureWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  Heart, 
  Activity, 
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  ArrowRight
} from 'lucide-react'

export default function CalculadorasPage() {
  const calculadoras = [
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
      id: 'tokyo-criteria',
      name: 'Critérios de Tóquio',
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
      color: 'purple'
    },
    {
      id: 'sofa',
      name: 'SOFA Score',
      description: 'Avaliação de disfunção orgânica sequencial',
      category: 'Medicina Intensiva',
      icon: Heart,
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

  const categorias = [...new Set(calculadoras.map(calc => calc.category))]

  const getColorClasses = (color: string) => {
    const colors = {
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

  const renderCalculadora = (calc) => {
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
            <Button size="sm" className="text-xs">
              Calcular
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )

    if (calc.requiredPlan) {
      return (
        <PremiumFeatureWrapper
          key={calc.id}
          requiredPlan={calc.requiredPlan}
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
              <div className="text-3xl font-bold text-purple-600 mb-2">8+</div>
              <div className="text-sm text-gray-600">Calculadoras</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2</div>
              <div className="text-sm text-gray-600">Gratuitas</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Especialidades</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Baseadas em Evidências</div>
            </div>
          </div>

          {/* Calculadoras por Categoria */}
          {categorias.map(categoria => (
            <div key={categoria} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-purple-600 rounded-full mr-4"></div>
                {categoria}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {calculadoras
                  .filter(calc => calc.category === categoria)
                  .map(calc => renderCalculadora(calc))
                }
              </div>
            </div>
          ))}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white mt-16">
            <h3 className="text-2xl font-bold mb-4">
              Precisa de mais calculadoras?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Upgrade para o GuideFlow ou MindFlow e tenha acesso a todas as calculadoras médicas e scores clínicos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/planos'}
              >
                Ver Planos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => window.location.href = '/contato'}
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