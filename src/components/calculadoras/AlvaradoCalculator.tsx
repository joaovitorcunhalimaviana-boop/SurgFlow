'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Calculator, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface AlvaradoScore {
  migratingPain: boolean
  anorexia: boolean
  nausea: boolean
  tendernessRLQ: boolean
  reboundPain: boolean
  fever: boolean
  leukocytosis: boolean
  leftShift: boolean
}

export default function AlvaradoCalculator() {
  const [scores, setScores] = useState<AlvaradoScore>({
    migratingPain: false,
    anorexia: false,
    nausea: false,
    tendernessRLQ: false,
    reboundPain: false,
    fever: false,
    leukocytosis: false,
    leftShift: false
  })

  const [showResult, setShowResult] = useState(false)

  const calculateScore = () => {
    let total = 0
    if (scores.migratingPain) total += 1
    if (scores.anorexia) total += 1
    if (scores.nausea) total += 1
    if (scores.tendernessRLQ) total += 2
    if (scores.reboundPain) total += 1
    if (scores.fever) total += 1
    if (scores.leukocytosis) total += 2
    if (scores.leftShift) total += 1
    return total
  }

  const getInterpretation = (score: number) => {
    if (score <= 4) {
      return {
        risk: 'Baixo',
        description: 'Apendicite improvável. Considerar outros diagnósticos.',
        recommendation: 'Observação clínica e reavaliação. Considerar alta com orientações de retorno.',
        color: 'green',
        icon: CheckCircle
      }
    } else if (score <= 6) {
      return {
        risk: 'Intermediário',
        description: 'Suspeita de apendicite. Investigação adicional necessária.',
        recommendation: 'Exames complementares (TC, US) e reavaliação seriada. Considerar internação para observação.',
        color: 'yellow',
        icon: AlertTriangle
      }
    } else {
      return {
        risk: 'Alto',
        description: 'Apendicite altamente provável.',
        recommendation: 'Indicação cirúrgica. Preparar para apendicectomia urgente.',
        color: 'red',
        icon: XCircle
      }
    }
  }

  const handleCalculate = () => {
    setShowResult(true)
  }

  const handleReset = () => {
    setScores({
      migratingPain: false,
      anorexia: false,
      nausea: false,
      tendernessRLQ: false,
      reboundPain: false,
      fever: false,
      leukocytosis: false,
      leftShift: false
    })
    setShowResult(false)
  }

  const score = calculateScore()
  const interpretation = getInterpretation(score)
  const IconComponent = interpretation.icon

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Calculator className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Escore de Alvarado</h1>
        </div>
        <p className="text-gray-600">
          Sistema de pontuação para avaliação diagnóstica de apendicite aguda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              Critérios Clínicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="migratingPain"
                  checked={scores.migratingPain}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, migratingPain: checked as boolean }))
                  }
                />
                <label htmlFor="migratingPain" className="text-sm font-medium">
                  Dor migratória para fossa ilíaca direita (1 ponto)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="anorexia"
                  checked={scores.anorexia}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, anorexia: checked as boolean }))
                  }
                />
                <label htmlFor="anorexia" className="text-sm font-medium">
                  Anorexia (1 ponto)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="nausea"
                  checked={scores.nausea}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, nausea: checked as boolean }))
                  }
                />
                <label htmlFor="nausea" className="text-sm font-medium">
                  Náusea/Vômito (1 ponto)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="tendernessRLQ"
                  checked={scores.tendernessRLQ}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, tendernessRLQ: checked as boolean }))
                  }
                />
                <label htmlFor="tendernessRLQ" className="text-sm font-medium">
                  Dor à palpação em fossa ilíaca direita (2 pontos)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="reboundPain"
                  checked={scores.reboundPain}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, reboundPain: checked as boolean }))
                  }
                />
                <label htmlFor="reboundPain" className="text-sm font-medium">
                  Dor à descompressão (Blumberg) (1 ponto)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="fever"
                  checked={scores.fever}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, fever: checked as boolean }))
                  }
                />
                <label htmlFor="fever" className="text-sm font-medium">
                  Febre ≥ 37,3°C (1 ponto)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="leukocytosis"
                  checked={scores.leukocytosis}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, leukocytosis: checked as boolean }))
                  }
                />
                <label htmlFor="leukocytosis" className="text-sm font-medium">
                  Leucocitose &gt; 10.000/mm³ (2 pontos)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="leftShift"
                  checked={scores.leftShift}
                  onCheckedChange={(checked) => 
                    setScores(prev => ({ ...prev, leftShift: checked as boolean }))
                  }
                />
                <label htmlFor="leftShift" className="text-sm font-medium">
                  Desvio à esquerda &gt; 75% neutrófilos (1 ponto)
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCalculate} className="flex-1">
                Calcular Escore
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
              <Calculator className="h-5 w-5 mr-2 text-purple-600" />
              Resultado
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showResult ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {score}/9
                  </div>
                  <Badge 
                    className={`text-sm px-3 py-1 ${
                      interpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                      interpretation.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-1" />
                    Risco {interpretation.risk}
                  </Badge>
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
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Preencha os critérios e clique em "Calcular Escore" para ver o resultado</p>
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
              1. Alvarado A. A practical score for the early diagnosis of acute appendicitis. 
              Ann Emerg Med. 1986;15(5):557-64.
            </p>
            <p>
              2. McKay R, Shepherd J. The use of the clinical scoring system by Alvarado in the decision to perform computed tomography for acute appendicitis in the ED. 
              Am J Emerg Med. 2007;25(5):489-93.
            </p>
            <p>
              3. Ohle R, O'Reilly F, O'Brien KK, Fahey T, Dimitrov BD. The Alvarado score for predicting acute appendicitis: a systematic review. 
              BMC Med. 2011;9:139.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}