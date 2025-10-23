'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Activity, AlertTriangle, CheckCircle, XCircle, Zap } from 'lucide-react'

interface RansonCriteria {
  // Critérios na admissão
  age: string
  whiteBloodCells: string
  glucose: string
  serumLDH: string
  serumAST: string
  
  // Critérios nas primeiras 48h
  hematocritDrop: boolean
  bunIncrease: string
  serumCalcium: string
  arterialPO2: string
  baseDeficit: string
  fluidSequestration: string
}

export default function RansonCalculator() {
  const [criteria, setCriteria] = useState<RansonCriteria>({
    age: '',
    whiteBloodCells: '',
    glucose: '',
    serumLDH: '',
    serumAST: '',
    hematocritDrop: false,
    bunIncrease: '',
    serumCalcium: '',
    arterialPO2: '',
    baseDeficit: '',
    fluidSequestration: ''
  })

  const [showResult, setShowResult] = useState(false)

  const calculateRansonScore = () => {
    let score = 0

    // Critérios na admissão
    const age = parseFloat(criteria.age) || 0
    const wbc = parseFloat(criteria.whiteBloodCells) || 0
    const glucose = parseFloat(criteria.glucose) || 0
    const ldh = parseFloat(criteria.serumLDH) || 0
    const ast = parseFloat(criteria.serumAST) || 0

    if (age > 55) score++
    if (wbc > 16000) score++
    if (glucose > 200) score++
    if (ldh > 350) score++
    if (ast > 250) score++

    // Critérios nas primeiras 48h
    if (criteria.hematocritDrop) score++
    
    const bunIncrease = parseFloat(criteria.bunIncrease) || 0
    const calcium = parseFloat(criteria.serumCalcium) || 0
    const po2 = parseFloat(criteria.arterialPO2) || 0
    const baseDeficit = parseFloat(criteria.baseDeficit) || 0
    const fluidSequestration = parseFloat(criteria.fluidSequestration) || 0

    if (bunIncrease > 5) score++
    if (calcium < 8) score++
    if (po2 < 60) score++
    if (baseDeficit > 4) score++
    if (fluidSequestration > 6) score++

    return score
  }

  const getInterpretation = () => {
    const score = calculateRansonScore()
    
    if (score <= 2) {
      return {
        severity: 'Pancreatite Leve',
        description: 'Baixo risco de complicações graves.',
        mortality: '< 1%',
        recommendation: 'Tratamento conservador. Monitorização padrão.',
        color: 'green',
        icon: CheckCircle
      }
    } else if (score <= 5) {
      return {
        severity: 'Pancreatite Moderada',
        description: 'Risco moderado de complicações.',
        mortality: '10-20%',
        recommendation: 'Monitorização cuidadosa. Considerar UTI se deterioração.',
        color: 'yellow',
        icon: AlertTriangle
      }
    } else {
      return {
        severity: 'Pancreatite Grave',
        description: 'Alto risco de complicações graves e morte.',
        mortality: '> 50%',
        recommendation: 'UTI imediata. Suporte intensivo necessário.',
        color: 'red',
        icon: XCircle
      }
    }
  }

  const handleCalculate = () => {
    setShowResult(true)
  }

  const handleReset = () => {
    setCriteria({
      age: '',
      whiteBloodCells: '',
      glucose: '',
      serumLDH: '',
      serumAST: '',
      hematocritDrop: false,
      bunIncrease: '',
      serumCalcium: '',
      arterialPO2: '',
      baseDeficit: '',
      fluidSequestration: ''
    })
    setShowResult(false)
  }

  const score = calculateRansonScore()
  const interpretation = getInterpretation()
  const IconComponent = interpretation.icon

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Zap className="h-8 w-8 text-orange-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Critérios de Ranson</h1>
        </div>
        <p className="text-gray-600">
          Avaliação de gravidade da pancreatite aguda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-orange-500" />
                Critérios de Ranson
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Critérios na Admissão */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Critérios na Admissão</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Idade (anos)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={criteria.age}
                      onChange={(e) => setCriteria(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="65"
                    />
                    <p className="text-xs text-gray-500 mt-1">Positivo se &gt; 55 anos</p>
                  </div>

                  <div>
                    <Label htmlFor="wbc">Leucócitos (/mm³)</Label>
                    <Input
                      id="wbc"
                      type="number"
                      value={criteria.whiteBloodCells}
                      onChange={(e) => setCriteria(prev => ({ ...prev, whiteBloodCells: e.target.value }))}
                      placeholder="12000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Positivo se &gt; 16.000/mm³</p>
                  </div>

                  <div>
                    <Label htmlFor="glucose">Glicose (mg/dL)</Label>
                    <Input
                      id="glucose"
                      type="number"
                      value={criteria.glucose}
                      onChange={(e) => setCriteria(prev => ({ ...prev, glucose: e.target.value }))}
                      placeholder="150"
                    />
                    <p className="text-xs text-gray-500 mt-1">Positivo se &gt; 200 mg/dL</p>
                  </div>

                  <div>
                    <Label htmlFor="ldh">LDH Sérico (U/L)</Label>
                    <Input
                      id="ldh"
                      type="number"
                      value={criteria.serumLDH}
                      onChange={(e) => setCriteria(prev => ({ ...prev, serumLDH: e.target.value }))}
                      placeholder="300"
                    />
                    <p className="text-xs text-gray-500 mt-1">Positivo se &gt; 350 U/L</p>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="ast">AST Sérico (U/L)</Label>
                    <Input
                      id="ast"
                      type="number"
                      value={criteria.serumAST}
                      onChange={(e) => setCriteria(prev => ({ ...prev, serumAST: e.target.value }))}
                      placeholder="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Positivo se &gt; 250 U/L</p>
                  </div>
                </div>
              </div>

              {/* Critérios nas Primeiras 48h */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Critérios nas Primeiras 48 Horas</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="hematocritDrop"
                      checked={criteria.hematocritDrop}
                      onCheckedChange={(checked) => 
                        setCriteria(prev => ({ ...prev, hematocritDrop: checked as boolean }))
                      }
                    />
                    <label htmlFor="hematocritDrop" className="text-sm font-medium">
                      Queda do hematócrito &gt; 10%
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bunIncrease">Aumento da Ureia (mg/dL)</Label>
                      <Input
                        id="bunIncrease"
                        type="number"
                        value={criteria.bunIncrease}
                        onChange={(e) => setCriteria(prev => ({ ...prev, bunIncrease: e.target.value }))}
                        placeholder="3"
                      />
                      <p className="text-xs text-gray-500 mt-1">Positivo se aumento &gt; 5 mg/dL</p>
                    </div>

                    <div>
                      <Label htmlFor="calcium">Cálcio Sérico (mg/dL)</Label>
                      <Input
                        id="calcium"
                        type="number"
                        step="0.1"
                        value={criteria.serumCalcium}
                        onChange={(e) => setCriteria(prev => ({ ...prev, serumCalcium: e.target.value }))}
                        placeholder="9.0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Positivo se &lt; 8 mg/dL</p>
                    </div>

                    <div>
                      <Label htmlFor="po2">PaO2 Arterial (mmHg)</Label>
                      <Input
                        id="po2"
                        type="number"
                        value={criteria.arterialPO2}
                        onChange={(e) => setCriteria(prev => ({ ...prev, arterialPO2: e.target.value }))}
                        placeholder="80"
                      />
                      <p className="text-xs text-gray-500 mt-1">Positivo se &lt; 60 mmHg</p>
                    </div>

                    <div>
                      <Label htmlFor="baseDeficit">Déficit de Base (mEq/L)</Label>
                      <Input
                        id="baseDeficit"
                        type="number"
                        value={criteria.baseDeficit}
                        onChange={(e) => setCriteria(prev => ({ ...prev, baseDeficit: e.target.value }))}
                        placeholder="2"
                      />
                      <p className="text-xs text-gray-500 mt-1">Positivo se &gt; 4 mEq/L</p>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="fluidSequestration">Sequestro de Fluidos (L)</Label>
                      <Input
                        id="fluidSequestration"
                        type="number"
                        step="0.1"
                        value={criteria.fluidSequestration}
                        onChange={(e) => setCriteria(prev => ({ ...prev, fluidSequestration: e.target.value }))}
                        placeholder="4"
                      />
                      <p className="text-xs text-gray-500 mt-1">Positivo se &gt; 6 L</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCalculate} className="flex-1">
                  Calcular Score de Ranson
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultado */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-orange-600" />
                Resultado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showResult ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {score}/11
                    </div>
                    <Badge 
                      className={`text-lg px-4 py-2 mb-4 ${
                        interpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                        interpretation.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-2" />
                      {interpretation.severity}
                    </Badge>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Mortalidade Estimada:</h4>
                    <p className="text-2xl font-bold text-blue-800">
                      {interpretation.mortality}
                    </p>
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

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Interpretação dos Scores:</h4>
                    <div className="text-yellow-800 text-sm space-y-1">
                      <p>• 0-2: Pancreatite leve (&lt; 1% mortalidade)</p>
                      <p>• 3-5: Pancreatite moderada (10-20% mortalidade)</p>
                      <p>• ≥ 6: Pancreatite grave (&gt; 50% mortalidade)</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Preencha os critérios e clique em "Calcular Score de Ranson" para ver o resultado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Referências */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Referências Bibliográficas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              1. Ranson JH, Rifkind KM, Roses DF, et al. Prognostic signs and the role of operative management in acute pancreatitis. 
              Surg Gynecol Obstet. 1974;139(1):69-81.
            </p>
            <p>
              2. Ranson JH. Etiological and prognostic factors in human acute pancreatitis: a review. 
              Am J Gastroenterol. 1982;77(9):633-8.
            </p>
            <p>
              3. Banks PA, Bollen TL, Dervenis C, et al. Classification of acute pancreatitis--2012: revision of the Atlanta classification 
              and definitions by international consensus. Gut. 2013;62(1):102-11.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}