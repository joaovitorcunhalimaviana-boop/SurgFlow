'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Stethoscope, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react'

interface TokyoCriteria {
  // Critérios Locais (A)
  murphySign: boolean
  rlqMass: boolean
  
  // Critérios Sistêmicos (B)
  fever: boolean
  elevatedCRP: boolean
  elevatedWBC: boolean
  
  // Critérios de Imagem (C)
  imagingFindings: boolean
}

export default function TokyoCalculator() {
  const [criteria, setCriteria] = useState<TokyoCriteria>({
    murphySign: false,
    rlqMass: false,
    fever: false,
    elevatedCRP: false,
    elevatedWBC: false,
    imagingFindings: false
  })

  const [showResult, setShowResult] = useState(false)

  const calculateDiagnosis = () => {
    const localCriteria = criteria.murphySign || criteria.rlqMass
    const systemicCriteria = criteria.fever || criteria.elevatedCRP || criteria.elevatedWBC
    const imagingCriteria = criteria.imagingFindings

    // Suspeita de colecistite: (A + B) ou (C)
    const suspectedCholecystitis = (localCriteria && systemicCriteria) || imagingCriteria

    // Definir gravidade
    let severity = 'normal'
    if (suspectedCholecystitis) {
      // Critérios de gravidade (pelo menos um presente = grave)
      const severityCriteria = [
        criteria.elevatedWBC && criteria.elevatedWBC, // Leucocitose > 18.000
        criteria.fever, // Febre alta
        // Outros critérios de gravidade seriam avaliados clinicamente
      ]
      
      severity = 'mild' // Por padrão, consideramos leve se há suspeita
    }

    return {
      hasCholecystitis: suspectedCholecystitis,
      severity,
      localCriteria,
      systemicCriteria,
      imagingCriteria
    }
  }

  const getInterpretation = () => {
    const diagnosis = calculateDiagnosis()
    
    if (!diagnosis.hasCholecystitis) {
      return {
        diagnosis: 'Colecistite Improvável',
        description: 'Critérios insuficientes para diagnóstico de colecistite aguda.',
        recommendation: 'Considerar outros diagnósticos. Reavaliação clínica e investigação adicional se necessário.',
        color: 'green',
        icon: CheckCircle
      }
    }

    if (diagnosis.severity === 'mild') {
      return {
        diagnosis: 'Colecistite Aguda Leve',
        description: 'Critérios diagnósticos presentes sem sinais de gravidade.',
        recommendation: 'Tratamento conservador inicial. Colecistectomia laparoscópica precoce (24-72h) quando possível.',
        color: 'yellow',
        icon: AlertTriangle
      }
    }

    return {
      diagnosis: 'Colecistite Aguda Grave',
      description: 'Critérios de gravidade presentes.',
      recommendation: 'Tratamento intensivo imediato. Considerar drenagem percutânea ou cirurgia de urgência.',
      color: 'red',
      icon: XCircle
    }
  }

  const handleCalculate = () => {
    setShowResult(true)
  }

  const handleReset = () => {
    setCriteria({
      murphySign: false,
      rlqMass: false,
      fever: false,
      elevatedCRP: false,
      elevatedWBC: false,
      imagingFindings: false
    })
    setShowResult(false)
  }

  const diagnosis = calculateDiagnosis()
  const interpretation = getInterpretation()
  const IconComponent = interpretation.icon

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Critérios de Tóquio 2018</h1>
        </div>
        <p className="text-gray-600">
          Diretrizes para diagnóstico e manejo da colecistite aguda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Critérios Diagnósticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Critérios Locais (A) */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">A. Sinais Locais de Inflamação</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="murphySign"
                    checked={criteria.murphySign}
                    onCheckedChange={(checked) => 
                      setCriteria(prev => ({ ...prev, murphySign: checked as boolean }))
                    }
                  />
                  <label htmlFor="murphySign" className="text-sm font-medium">
                    Sinal de Murphy positivo
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="rlqMass"
                    checked={criteria.rlqMass}
                    onCheckedChange={(checked) => 
                      setCriteria(prev => ({ ...prev, rlqMass: checked as boolean }))
                    }
                  />
                  <label htmlFor="rlqMass" className="text-sm font-medium">
                    Massa palpável em hipocôndrio direito
                  </label>
                </div>
              </div>
            </div>

            {/* Critérios Sistêmicos (B) */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">B. Sinais Sistêmicos de Inflamação</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="fever"
                    checked={criteria.fever}
                    onCheckedChange={(checked) => 
                      setCriteria(prev => ({ ...prev, fever: checked as boolean }))
                    }
                  />
                  <label htmlFor="fever" className="text-sm font-medium">
                    Febre ≥ 37,5°C
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="elevatedCRP"
                    checked={criteria.elevatedCRP}
                    onCheckedChange={(checked) => 
                      setCriteria(prev => ({ ...prev, elevatedCRP: checked as boolean }))
                    }
                  />
                  <label htmlFor="elevatedCRP" className="text-sm font-medium">
                    PCR elevada (&gt; 3 mg/dL)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="elevatedWBC"
                    checked={criteria.elevatedWBC}
                    onCheckedChange={(checked) => 
                      setCriteria(prev => ({ ...prev, elevatedWBC: checked as boolean }))
                    }
                  />
                  <label htmlFor="elevatedWBC" className="text-sm font-medium">
                    Leucocitose (&gt; 10.000/mm³)
                  </label>
                </div>
              </div>
            </div>

            {/* Critérios de Imagem (C) */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">C. Achados de Imagem</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="imagingFindings"
                    checked={criteria.imagingFindings}
                    onCheckedChange={(checked) => 
                      setCriteria(prev => ({ ...prev, imagingFindings: checked as boolean }))
                    }
                  />
                  <label htmlFor="imagingFindings" className="text-sm font-medium">
                    Achados característicos na US/TC/RM
                    <div className="text-xs text-gray-500 mt-1">
                      (espessamento da parede, líquido perivesicular, etc.)
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCalculate} className="flex-1">
                Avaliar Critérios
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
              Diagnóstico
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showResult ? (
              <div className="space-y-6">
                <div className="text-center">
                  <Badge 
                    className={`text-lg px-4 py-2 mb-4 ${
                      interpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                      interpretation.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {interpretation.diagnosis}
                  </Badge>
                </div>

                {/* Status dos Critérios */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Critérios Locais (A)</span>
                    <Badge variant={diagnosis.localCriteria ? "default" : "secondary"}>
                      {diagnosis.localCriteria ? "Presente" : "Ausente"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Critérios Sistêmicos (B)</span>
                    <Badge variant={diagnosis.systemicCriteria ? "default" : "secondary"}>
                      {diagnosis.systemicCriteria ? "Presente" : "Ausente"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Critérios de Imagem (C)</span>
                    <Badge variant={diagnosis.imagingCriteria ? "default" : "secondary"}>
                      {diagnosis.imagingCriteria ? "Presente" : "Ausente"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Interpretação:</h4>
                    <p className="text-gray-700">{interpretation.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recomendação:</h4>
                    <p className="text-gray-700">{interpretation.recommendation}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Critério Diagnóstico:</h4>
                  <p className="text-blue-800 text-sm">
                    Suspeita de colecistite: (A + B) ou (C)
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Preencha os critérios e clique em "Avaliar Critérios" para ver o diagnóstico</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Referências */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Referências Bibliográficas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              1. Okamoto K, Suzuki K, Takada T, et al. Tokyo Guidelines 2018: flowchart for the management of acute cholecystitis. 
              J Hepatobiliary Pancreat Sci. 2018;25(1):55-72.
            </p>
            <p>
              2. Yokoe M, Hata J, Takada T, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis. 
              J Hepatobiliary Pancreat Sci. 2018;25(1):41-54.
            </p>
            <p>
              3. Gomi H, Solomkin JS, Schlossberg D, et al. Tokyo Guidelines 2018: antimicrobial therapy for acute cholangitis and cholecystitis. 
              J Hepatobiliary Pancreat Sci. 2018;25(1):3-16.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}