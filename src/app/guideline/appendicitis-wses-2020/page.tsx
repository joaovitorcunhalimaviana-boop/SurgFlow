'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import GuideFlowApendicite from '@/components/guidelines/GuideFlowApendicite'
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  Users,
  Calendar,
  Play,
  Calculator,
  Target
} from 'lucide-react'
import { GuideFlowAppendicitisState, defaultAppendicitisState } from '@/types/guideflow-appendicitis';

export default function AppendicitisWSESPage() {
  const [guideFlowState, setGuideFlowState] = useState<GuideFlowAppendicitisState>(defaultAppendicitisState);
  const [showGuideFlow, setShowGuideFlow] = useState(false);

  // Refs para navegação interna
  const guideFlowRef = useRef<HTMLDivElement>(null);
  const scoresRef = useRef<HTMLDivElement>(null);

  // Função para mostrar e scrollar para GuideFlow
  const openGuideFlow = () => {
    setShowGuideFlow(true);
    // Aguardar renderização antes de fazer scroll
    setTimeout(() => {
      guideFlowRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }, 100);
  };

  // Função de scroll suave para seções já visíveis
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Guidelines', href: '/guidelines' },
            { label: 'Apendicite Aguda', current: true }
          ]}
          className="mb-8 animate-fade-in"
        />

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8 mb-8 animate-fade-in-up animation-delay-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-xl mr-4 icon-pulse">
                <Stethoscope className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Apendicite Aguda
                </h1>
                <p className="text-lg text-gray-600">
                  WSES Guidelines 2020 - Diagnóstico e Manejo
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                WSES Guidelines 2020
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Atualizado em 2020
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-gray-700">Para estudantes e residentes</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-gray-700">Consulta rápida</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-gray-700">Baseado em evidências</span>
            </div>
          </div>
        </div>

        {/* GuideFlow Interativo - Card clicável */}
        <div className="mb-8 animate-fade-in-up animation-delay-200">
          <Card
            className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 cursor-pointer transition-all hover:shadow-lg"
            onClick={openGuideFlow}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <div className="bg-red-600 p-2 rounded-lg mr-3 icon-scale-hover">
                  <Play className="h-6 w-6 text-white" />
                </div>
                GuideFlow Interativo - Apendicite Aguda
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Ferramenta interativa para diagnóstico, classificação e manejo da apendicite aguda baseada nas WSES Guidelines 2020.
                Inclui calculadoras dos scores de Alvarado e AIR para avaliação diagnóstica precisa.
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* Componente GuideFlow - Mostrado condicionalmente */}
        {showGuideFlow && (
          <div ref={guideFlowRef} className="scroll-mt-8 mb-8 animate-fade-in-up">
            <GuideFlowApendicite
              state={guideFlowState}
              setState={setGuideFlowState}
            />
          </div>
        )}

        {/* Seção de Referência Rápida */}
        <div ref={scoresRef} className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-8">
          {/* Resumo dos Scores */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-red-200 animate-slide-in-left">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-xl">Scores Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Score de Alvarado
                    </h4>
                    <ul className="space-y-1 text-blue-800 text-sm">
                      <li>• 0-4 pontos: Baixa probabilidade</li>
                      <li>• 5-6 pontos: Probabilidade intermediária</li>
                      <li>• 7-10 pontos: Alta probabilidade</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Score AIR
                    </h4>
                    <ul className="space-y-1 text-green-800 text-sm">
                      <li>• 0-4 pontos: Baixo risco</li>
                      <li>• 5-8 pontos: Risco intermediário</li>
                      <li>• 9-12 pontos: Alto risco</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Score AAS
                    </h4>
                    <ul className="space-y-1 text-purple-800 text-sm">
                      <li>• 0-10 pontos: Baixa probabilidade</li>
                      <li>• 11-15 pontos: Probabilidade intermediária</li>
                      <li>• ≥16 pontos: Alta probabilidade</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium text-center">
                    <strong>Recomendação:</strong> Use os três scores para melhor acurácia diagnóstica
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com Informações Adicionais */}
          <div className="space-y-6">
            {/* Pontos Importantes */}
            <Card className="border-yellow-200 bg-yellow-50 animate-slide-in-right animation-delay-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-yellow-800">
                  <AlertTriangle className="h-5 w-5 mr-2 icon-bounce" />
                  Pontos Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-800 text-sm">
                  <li>• Considerar diagnósticos diferenciais</li>
                  <li>• Atenção especial em crianças e idosos</li>
                  <li>• Gravidez requer abordagem específica</li>
                  <li>• TC com contraste é padrão-ouro</li>
                  <li>• Antibioticoterapia precoce é fundamental</li>
                </ul>
              </CardContent>
            </Card>

            {/* Guidelines Relacionados */}
            <Card className="border-red-200 animate-slide-in-right animation-delay-200">
              <CardHeader>
                <CardTitle className="text-lg">Guidelines Relacionados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/calculadoras" className="block">
                  <Button variant="ghost" className="w-full justify-start text-left hover-lift">
                    <Stethoscope className="h-4 w-4 mr-2 icon-scale-hover" />
                    <div>
                      <div className="font-medium">Colecistite</div>
                      <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/calculadoras" className="block">
                  <Button variant="ghost" className="w-full justify-start text-left hover-lift">
                    <Stethoscope className="h-4 w-4 mr-2 icon-scale-hover" />
                    <div>
                      <div className="font-medium">Diverticulite</div>
                      <div className="text-xs text-gray-500">WSES 2016</div>
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}