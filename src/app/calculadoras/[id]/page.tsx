'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import AlvaradoCalculator from '@/components/calculadoras/AlvaradoCalculator'
import TokyoCalculator from '@/components/calculadoras/TokyoCalculator'
import ApacheIICalculator from '@/components/calculadoras/ApacheIICalculator'
import RansonCalculator from '@/components/calculadoras/RansonCalculator'
import ASACalculator from '@/components/calculadoras/ASACalculator'
import BMICalculator from '@/components/calculadoras/BMICalculator'
import PremiumFeatureWrapper from '@/components/features/PremiumFeatureWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const calculatorComponents: { [key: string]: React.ComponentType } = {
  'alvarado': AlvaradoCalculator,
  'tokyo-criteria': TokyoCalculator,
  'apache-ii': ApacheIICalculator,
  'ranson': RansonCalculator,
  'asa-score': ASACalculator,
  'bmi-calculator': BMICalculator,
}

const calculatorInfo: { [key: string]: { name: string; requiredPlan: 'guideflow' | 'mindflow' | null } } = {
  'alvarado': { name: 'Escore de Alvarado', requiredPlan: null },
  'tokyo-criteria': { name: 'Critérios de Tóquio', requiredPlan: null },
  'apache-ii': { name: 'APACHE II', requiredPlan: 'guideflow' },
  'ranson': { name: 'Critérios de Ranson', requiredPlan: 'guideflow' },
  'asa-score': { name: 'Classificação ASA', requiredPlan: 'guideflow' },
  'bmi-calculator': { name: 'IMC e Superfície Corporal', requiredPlan: 'guideflow' },
}

export default function CalculatorPage() {
  const params = useParams()
  const router = useRouter()
  const calculatorId = params.id as string

  const CalculatorComponent = calculatorComponents[calculatorId]
  const info = calculatorInfo[calculatorId]

  if (!CalculatorComponent || !info) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Calculadora não encontrada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                A calculadora solicitada não foi encontrada.
              </p>
              <Button onClick={() => router.push('/calculadoras')} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar às Calculadoras
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  const renderCalculator = () => {
    if (info.requiredPlan) {
      return (
        <PremiumFeatureWrapper requiredPlan={info.requiredPlan}>
          <CalculatorComponent />
        </PremiumFeatureWrapper>
      )
    }
    return <CalculatorComponent />
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/calculadoras')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar às Calculadoras
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{info.name}</h1>
          {info.requiredPlan && (
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full">
                {info.requiredPlan === 'guideflow' ? 'GuideFlow' : 'MindFlow'}
              </span>
            </div>
          )}
        </div>

        {renderCalculator()}
      </div>
    </Layout>
  )
}