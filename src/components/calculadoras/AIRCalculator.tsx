'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AIRScore {
  vomitos: boolean
  dorFID: boolean
  descompressaoLeve: boolean
  descompressaoModerada: boolean
  descompressaoIntensa: boolean
  temperatura: number
  leucocitos: number
  neutrofilos: number
  pcr: number
}

export default function AIRCalculator() {
  const [scores, setScores] = useState<AIRScore>({
    vomitos: false,
    dorFID: false,
    descompressaoLeve: false,
    descompressaoModerada: false,
    descompressaoIntensa: false,
    temperatura: 36.5,
    leucocitos: 0,
    neutrofilos: 0,
    pcr: 0
  })

  const [showResult, setShowResult] = useState(false)

  const calculateScore = () => {
    let total = 0
    
    // Sintomas e sinais
    if (scores.vomitos) total += 1
    if (scores.dorFID) total += 1
    
    // Descompressão (apenas uma pode ser selecionada)
    if (scores.descompressaoLeve) total += 1
    if (scores.descompressaoModerada) total += 2
    if (scores.descompressaoIntensa) total += 3
    
    // Temperatura
    if (scores.temperatura >= 38.5) total += 1
    
    // Leucócitos
    if (scores.leucocitos >= 10 && scores.leucocitos <= 14.9) {
      total += 1
    } else if (scores.leucocitos >= 15) {
      total += 2
    }
    
    // Neutrófilos
    if (scores.neutrofilos >= 85) total += 2
    
    // PCR
    if (scores.pcr >= 10 && scores.pcr <= 49) {
      total += 1
    } else if (scores.pcr >= 50) {
      total += 2
    }
    
    return total
  }

  const getInterpretation = (score: number) => {
    if (score <= 4) {
      return {
        level: 'Baixa probabilidade',
        description: 'Apendicite improvável. Considerar diagnósticos alternativos.',
        color: 'green',
        icon: CheckCircle,
        recommendation: 'Observação clínica ou alta com orientações de retorno.'
      }
    } else if (score <= 8) {
      return {
        level: 'Probabilidade intermediária',
        description: 'Apendicite possível. Exame de imagem recomendado.',
        color: 'yellow',
        icon: AlertTriangle,
        recommendation: 'Solicitar ultrassom ou tomografia computadorizada.'
      }
    } else {
      return {
        level: 'Alta probabilidade',
        description: 'Apendicite muito provável. Indicação cirúrgica.',
        color: 'red',
        icon: XCircle,
        recommendation: 'Avaliação cirúrgica urgente.'
      }
    }
  }

  const handleDescompressaoChange = (tipo: 'leve' | 'moderada' | 'intensa') => {
    setScores(prev => ({
      ...prev,
      descompressaoLeve: tipo === 'leve',
      descompressaoModerada: tipo === 'moderada',
      descompressaoIntensa: tipo === 'intensa'
    }))
  }

  const resetCalculator = () => {
    setScores({
      vomitos: false,
      dorFID: false,
      descompressaoLeve: false,
      descompressaoModerada: false,
      descompressaoIntensa: false,
      temperatura: 36.5,
      leucocitos: 0,
      neutrofilos: 0,
      pcr: 0
    })
    setShowResult(false)
  }

  const currentScore = calculateScore()
  const interpretation = getInterpretation(currentScore)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calculator className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Score AIR (Appendicitis Inflammatory Response)</CardTitle>
              <p className="text-gray-600 mt-1">
                Calculadora para avaliação diagnóstica de apendicite aguda com marcadores inflamatórios
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Referência:</strong> WSES Jerusalem Guidelines 2020. Score que incorpora marcadores inflamatórios (PCR) 
              e pode ter acurácia superior ao Alvarado. Validado para adultos e pediatria.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sintomas e Sinais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sintomas e Sinais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vomitos"
                    checked={scores.vomitos}
                    onCheckedChange={(checked) => 
                      setScores(prev => ({ ...prev, vomitos: checked as boolean }))
                    }
                  />
                  <Label htmlFor="vomitos" className="text-sm">
                    Vômitos <Badge variant="secondary">1 pt</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dorFID"
                    checked={scores.dorFID}
                    onCheckedChange={(checked) => 
                      setScores(prev => ({ ...prev, dorFID: checked as boolean }))
                    }
                  />
                  <Label htmlFor="dorFID" className="text-sm">
                    Dor em fossa ilíaca direita <Badge variant="secondary">1 pt</Badge>
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Dor à descompressão:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="descompressaoLeve"
                        checked={scores.descompressaoLeve}
                        onCheckedChange={() => handleDescompressaoChange('leve')}
                      />
                      <Label htmlFor="descompressaoLeve" className="text-sm">
                        Leve <Badge variant="secondary">1 pt</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="descompressaoModerada"
                        checked={scores.descompressaoModerada}
                        onCheckedChange={() => handleDescompressaoChange('moderada')}
                      />
                      <Label htmlFor="descompressaoModerada" className="text-sm">
                        Moderada <Badge variant="secondary">2 pts</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="descompressaoIntensa"
                        checked={scores.descompressaoIntensa}
                        onCheckedChange={() => handleDescompressaoChange('intensa')}
                      />
                      <Label htmlFor="descompressaoIntensa" className="text-sm">
                        Intensa <Badge variant="secondary">3 pts</Badge>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperatura" className="text-sm font-medium">
                    Temperatura (°C):
                  </Label>
                  <Input
                    id="temperatura"
                    type="number"
                    min="35"
                    max="45"
                    step="0.1"
                    value={scores.temperatura || ''}
                    onChange={(e) => 
                      setScores(prev => ({ ...prev, temperatura: parseFloat(e.target.value) || 36.5 }))
                    }
                    placeholder="Ex: 37.8"
                  />
                  <p className="text-xs text-gray-500">
                    ≥38.5°C = 1 ponto
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Exames Laboratoriais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exames Laboratoriais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="leucocitos" className="text-sm font-medium">
                    Leucócitos (×10³/μL):
                  </Label>
                  <Input
                    id="leucocitos"
                    type="number"
                    min="0"
                    step="0.1"
                    value={scores.leucocitos || ''}
                    onChange={(e) => 
                      setScores(prev => ({ ...prev, leucocitos: parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="Ex: 12.5"
                  />
                  <p className="text-xs text-gray-500">
                    10-14.9 = 1pt, ≥15 = 2pts
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neutrofilos" className="text-sm font-medium">
                    Neutrófilos (%):
                  </Label>
                  <Input
                    id="neutrofilos"
                    type="number"
                    min="0"
                    max="100"
                    value={scores.neutrofilos || ''}
                    onChange={(e) => 
                      setScores(prev => ({ ...prev, neutrofilos: parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="Ex: 85"
                  />
                  <p className="text-xs text-gray-500">
                    ≥85% = 2 pontos
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pcr" className="text-sm font-medium">
                    PCR (mg/L):
                  </Label>
                  <Input
                    id="pcr"
                    type="number"
                    min="0"
                    step="0.1"
                    value={scores.pcr || ''}
                    onChange={(e) => 
                      setScores(prev => ({ ...prev, pcr: parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="Ex: 25.5"
                  />
                  <p className="text-xs text-gray-500">
                    10-49mg/L = 1pt, ≥50mg/L = 2pts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 mt-6">
            <Button 
              onClick={() => setShowResult(true)}
              className="flex-1"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calcular Score AIR
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
            >
              Limpar
            </Button>
          </div>

          {showResult && (
            <Card className={`mt-6 border-2 ${
              interpretation.color === 'red' ? 'border-red-300 bg-red-50' :
              interpretation.color === 'yellow' ? 'border-yellow-300 bg-yellow-50' :
              'border-green-300 bg-green-50'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <interpretation.icon className={`h-6 w-6 ${
                    interpretation.color === 'red' ? 'text-red-600' :
                    interpretation.color === 'yellow' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} />
                  <div>
                    <h3 className="text-xl font-bold">
                      Score AIR: {currentScore}/12 pontos
                    </h3>
                    <p className={`text-sm ${
                      interpretation.color === 'red' ? 'text-red-700' :
                      interpretation.color === 'yellow' ? 'text-yellow-700' :
                      'text-green-700'
                    }`}>
                      {interpretation.level}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Interpretação:</strong> {interpretation.description}
                  </p>
                  <p className="text-sm">
                    <strong>Recomendação:</strong> {interpretation.recommendation}
                  </p>
                  
                  <div className="bg-white/50 rounded-lg p-3 text-xs">
                    <p className="font-medium mb-1">Faixas de interpretação:</p>
                    <p>• 0-4 pontos: Baixa probabilidade</p>
                    <p>• 5-8 pontos: Probabilidade intermediária (imagem recomendada)</p>
                    <p>• 9-12 pontos: Alta probabilidade</p>
                  </div>

                  <Alert className="border-purple-200 bg-purple-50">
                    <Info className="h-4 w-4 text-purple-600" />
                    <AlertDescription className="text-xs text-purple-800">
                      <strong>Vantagem do AIR:</strong> Incorpora marcadores inflamatórios (PCR) que podem melhorar 
                      a acurácia diagnóstica, especialmente em casos duvidosos.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}