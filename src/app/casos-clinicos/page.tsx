'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import PremiumFeatureWrapper from '@/components/features/PremiumFeatureWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Users, 
  Clock, 
  Star,
  BookOpen,
  Stethoscope,
  Heart,
  Brain,
  Scissors,
  ArrowRight,
  Play,
  Award
} from 'lucide-react'

interface CasoClinico {
  id: string
  title: string
  description: string
  specialty: string
  difficulty: string
  duration: string
  icon: React.ComponentType<any>
  requiredPlan: 'guideflow' | 'mindflow' | null
  featured: boolean
}

export default function CasosClinicosPage() {
  const router = useRouter()
  
  const casosClinicosData: CasoClinico[] = [
    {
      id: 'apendicite-atipica',
      title: 'Apendicite Atípica em Idoso',
      description: 'Caso complexo de apresentação não clássica em paciente de 78 anos',
      specialty: 'Cirurgia Geral',
      difficulty: 'Intermediário',
      duration: '15 min',
      icon: Scissors,
      requiredPlan: null, // Gratuito
      featured: false
    },
    {
      id: 'colecistite-complicada',
      title: 'Colecistite Gangrenosa',
      description: 'Manejo cirúrgico de colecistite complicada com perfuração',
      specialty: 'Cirurgia Geral',
      difficulty: 'Avançado',
      duration: '20 min',
      icon: Stethoscope,
      requiredPlan: null, // Gratuito
      featured: true
    },
    {
      id: 'pancreatite-necrotizante',
      title: 'Pancreatite Necrotizante',
      description: 'Abordagem multidisciplinar em pancreatite grave',
      specialty: 'Gastroenterologia',
      difficulty: 'Avançado',
      duration: '25 min',
      icon: Heart,
      requiredPlan: 'guideflow',
      featured: true
    },
    {
      id: 'trauma-abdominal',
      title: 'Trauma Abdominal Penetrante',
      description: 'Avaliação e conduta em ferimento por arma branca',
      specialty: 'Cirurgia do Trauma',
      difficulty: 'Avançado',
      duration: '18 min',
      icon: Scissors,
      requiredPlan: 'guideflow',
      featured: false
    },
    {
      id: 'obstrucao-intestinal',
      title: 'Obstrução Intestinal Complexa',
      description: 'Diagnóstico diferencial e manejo cirúrgico',
      specialty: 'Cirurgia Geral',
      difficulty: 'Intermediário',
      duration: '22 min',
      icon: Stethoscope,
      requiredPlan: 'guideflow',
      featured: false
    },
    {
      id: 'sepse-abdominal',
      title: 'Sepse de Origem Abdominal',
      description: 'Controle de foco e manejo intensivo',
      specialty: 'Medicina Intensiva',
      difficulty: 'Avançado',
      duration: '30 min',
      icon: Heart,
      requiredPlan: 'mindflow',
      featured: true
    },
    {
      id: 'cirurgia-robotica',
      title: 'Cirurgia Robótica Avançada',
      description: 'Técnicas minimamente invasivas em cirurgia complexa',
      specialty: 'Cirurgia Robótica',
      difficulty: 'Expert',
      duration: '35 min',
      icon: Brain,
      requiredPlan: 'mindflow',
      featured: true
    },
    {
      id: 'transplante-figado',
      title: 'Transplante Hepático',
      description: 'Seleção de receptor e técnica cirúrgica',
      specialty: 'Transplantes',
      difficulty: 'Expert',
      duration: '40 min',
      icon: Heart,
      requiredPlan: 'mindflow',
      featured: false
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'Básico': 'bg-green-100 text-green-800',
      'Intermediário': 'bg-yellow-100 text-yellow-800',
      'Avançado': 'bg-orange-100 text-orange-800',
      'Expert': 'bg-red-100 text-red-800'
    }
    return colors[difficulty] || colors['Básico']
  }

  const renderCaso = (caso: CasoClinico) => {
    const IconComponent = caso.icon
    const content = (
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 relative overflow-hidden">
        {caso.featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 text-xs font-semibold">
            DESTAQUE
          </div>
        )}
        
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <IconComponent className="h-6 w-6 text-purple-600" />
            </div>
            {caso.requiredPlan && (
              <Badge className="bg-purple-100 text-purple-800 text-xs">
                {caso.requiredPlan === 'guideflow' ? 'GuideFlow' : 'MindFlow'}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg text-gray-900 mb-2">{caso.title}</CardTitle>
          <p className="text-sm text-gray-600 mb-3">{caso.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {caso.specialty}
            </Badge>
            <Badge className={`text-xs ${getDifficultyColor(caso.difficulty)}`}>
              {caso.difficulty}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {caso.duration}
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Play className="h-3 w-3 mr-1" />
              Estudar
            </Button>
          </div>
        </CardContent>
      </Card>
    )

    if (caso.requiredPlan) {
      return (
        <PremiumFeatureWrapper
          key={caso.id}
          requiredPlan={caso.requiredPlan}
          featureName={`o caso clínico "${caso.title}"`}
          className="h-full"
        >
          {content}
        </PremiumFeatureWrapper>
      )
    }

    return <div key={caso.id} className="h-full">{content}</div>
  }

  const casosGratuitos = casosClinicosData.filter(caso => !caso.requiredPlan)
  const casosGuideFlow = casosClinicosData.filter(caso => caso.requiredPlan === 'guideflow')
  const casosMindFlow = casosClinicosData.filter(caso => caso.requiredPlan === 'mindflow')

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <FileText className="h-4 w-4 mr-2" />
              Aprendizado Prático
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Casos
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Clínicos
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aprenda com casos reais e desenvolva seu raciocínio clínico através de situações práticas
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{casosClinicosData.length}+</div>
              <div className="text-sm text-gray-600">Casos Disponíveis</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{casosGratuitos.length}</div>
              <div className="text-sm text-gray-600">Casos Gratuitos</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Especialidades</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
          </div>

          {/* Casos Gratuitos */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-1 h-8 bg-green-600 rounded-full mr-4"></div>
                Casos Gratuitos
              </h2>
              <Badge className="bg-green-100 text-green-800">
                Acesso Livre
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casosGratuitos.map(caso => renderCaso(caso))}
            </div>
          </div>

          {/* Casos GuideFlow */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-1 h-8 bg-blue-600 rounded-full mr-4"></div>
                Casos GuideFlow
              </h2>
              <Badge className="bg-blue-100 text-blue-800">
                Plano GuideFlow
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casosGuideFlow.map(caso => renderCaso(caso))}
            </div>
          </div>

          {/* Casos MindFlow */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-1 h-8 bg-purple-600 rounded-full mr-4"></div>
                Casos MindFlow Premium
              </h2>
              <Badge className="bg-purple-100 text-purple-800">
                Plano MindFlow
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casosMindFlow.map(caso => renderCaso(caso))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <Award className="h-12 w-12 mx-auto mb-4 text-purple-200" />
              <h3 className="text-2xl font-bold mb-4">
                Acelere seu Aprendizado
              </h3>
              <p className="text-purple-100 mb-6">
                Tenha acesso a todos os casos clínicos premium e desenvolva suas habilidades com situações reais e complexas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => router.push('/planos')}
                >
                  Upgrade para Premium
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  onClick={() => router.push('/contato')}
                >
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}