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

interface AASScore {
  // Sintomas e Achados Clínicos
  dorFID: boolean
  migracaoDor: boolean
  defesaLeve: boolean
  defesaModeradaGrave: boolean
  
  // Dados demográficos
  sexoMasculino: boolean
  sexoFeminino: boolean
  idade: number
  
  // Exames laboratoriais
  leucocitos: number
  neutrofilos: number
  pcr: number
  pcrMenos24h: boolean
  pcrMais24h: boolean
}

export default function AASCalculator() {
  const [scores, setScores] = useState<AASScore>({
    dorFID: false,
    migracaoDor: false,
    defesaLeve: false,
    defesaModeradaGrave: false,
    sexoMasculino: false,
    sexoFeminino: false,
    idade: 0,
    leucocitos: 0,
    neutrofilos: 0,
    pcr: 0,
    pcrMenos24h: false,
    pcrMais24h: false
  })

  const [showResult, setShowResult] = useState(false)

  const calculateScore = () => {
    let total = 0
    
    // Sintomas e achados clínicos
    if (scores.dorFID) total += 2
    if (scores.migracaoDor) total += 2
    if (scores.defesaLeve) total += 2
    if (scores.defesaModeradaGrave) total += 4
    
    // Dados demográficos - Sexo
    if (scores.sexoMasculino) {
      total += 3 // Sexo masculino sempre 3 pontos
    } else if (scores.sexoFeminino) {
      // Sexo feminino depende da idade
      if (scores.idade >= 16 && scores.idade <= 49) {
        total += 1 // 16-49 anos: 1 ponto
      } else if (scores.idade >= 50) {
        total += 3 // ≥50 anos: 3 pontos
      }
    }
    
    // Exames laboratoriais
    // Leucócitos
    if (scores.leucocitos >= 11 && scores.leucocitos <= 15) {
      total += 1
    } else if (scores.leucocitos > 15) {
      total += 2
    }
    
    // Neutrófilos
    if (scores.neutrofilos >= 70 && scores.neutrofilos <= 84) {
      total += 1
    } else if (scores.neutrofilos >= 85) {
      total += 2
    }
    
    // PCR
    if (scores.pcrMenos24h) {
      if (scores.pcr >= 10 && scores.pcr <= 49) {
        total += 1
      } else if (scores.pcr >= 50) {
        total += 2
      }
    } else if (scores.pcrMais24h) {
      if (scores.pcr >= 50 && scores.pcr <= 99) {
        total += 1
      } else if (scores.pcr >= 100) {
        total += 2
      }
    }
    
    return total
  }

  const getInterpretation = (score: number) => {
    if (score <= 10) {
      return {
        level: 'Baixa probabilidade',
        description: 'Apendicite improvável. Considerar diagnósticos alternativos.',
        color: 'green',
        icon: CheckCircle,
        recommendation: 'Observação clínica ou alta com orientações de retorno.'
      }
    } else if (score <= 15) {
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

  const handleSexChange = (sexo: 'masculino' | 'feminino') => {
    setScores(prev => ({
      ...prev,
      sexoMasculino: sexo === 'masculino',
      sexoFeminino: sexo === 'feminino'
    }))
  }

  const handleDefesaChange = (tipo: 'leve' | 'moderada') => {
    setScores(prev => ({
      ...prev,
      defesaLeve: tipo === 'leve',
      defesaModeradaGrave: tipo === 'moderada'
    }))
  }

  const handlePCRTimeChange = (tempo: 'menos24h' | 'mais24h') => {
    setScores(prev => ({
      ...prev,
      pcrMenos24h: tempo === 'menos24h',
      pcrMais24h: tempo === 'mais24h'
    }))
  }

  const resetCalculator = () => {
    setScores({
      dorFID: false,
      migracaoDor: false,
      defesaLeve: false,
      defesaModeradaGrave: false,
      sexoMasculino: false,
      sexoFeminino: false,
      idade: 0,
      leucocitos: 0,
      neutrofilos: 0,
      pcr: 0,
      pcrMenos24h: false,
      pcrMais24h: false
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
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Score AAS (Adult Appendicitis Score)</CardTitle>
              <p className="text-gray-600 mt-1">
                Calculadora para avaliação diagnóstica de apendicite aguda em adultos
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Referência:</strong> WSES Jerusalem Guidelines 2020. Score validado para adultos com suspeita de apendicite aguda.
              Incorpora dados clínicos, demográficos e laboratoriais.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sintomas e Achados Clínicos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sintomas e Achados Clínicos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dorFID"
                    checked={scores.dorFID}
                    onCheckedChange={(checked) => 
                      setScores(prev => ({ ...prev, dorFID: checked as boolean }))
                    }
                  />
                  <Label htmlFor="dorFID" className="text-sm">
                    Dor em fossa ilíaca direita <Badge variant="secondary">2 pts</Badge>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="migracaoDor"
                    checked={scores.migracaoDor}
                    onCheckedChange={(checked) => 
                      setScores(prev => ({ ...prev, migracaoDor: checked as boolean }))
                    }
                  />
                  <Label htmlFor="migracaoDor" className="text-sm">
                    Migração da dor (relocação) <Badge variant="secondary">2 pts</Badge>
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Defesa muscular:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="defesaLeve"
                        checked={scores.defesaLeve}
                        onCheckedChange={() => handleDefesaChange('leve')}
                      />
                      <Label htmlFor="defesaLeve" className="text-sm">
                        Defesa leve <Badge variant="secondary">2 pts</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="defesaModerada"
                        checked={scores.defesaModeradaGrave}
                        onCheckedChange={() => handleDefesaChange('moderada')}
                      />
                      <Label htmlFor="defesaModerada" className="text-sm">
                        Defesa moderada/grave <Badge variant="secondary">4 pts</Badge>
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados Demográficos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados Demográficos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sexo:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sexoMasculino"
                        checked={scores.sexoMasculino}
                        onCheckedChange={() => handleSexChange('masculino')}
                      />
                      <Label htmlFor="sexoMasculino" className="text-sm">
                        Masculino <Badge variant="secondary">3 pts</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sexoFeminino"
                        checked={scores.sexoFeminino}
                        onCheckedChange={() => handleSexChange('feminino')}
                      />
                      <Label htmlFor="sexoFeminino" className="text-sm">
                        Feminino <Badge variant="secondary">1-3 pts*</Badge>
                      </Label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    *Feminino: 16-49 anos = 1pt, ≥50 anos = 3pts
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idade" className="text-sm font-medium">Idade (anos):</Label>
                  <Input
                    id="idade"
                    type="number"
                    min="0"
                    max="120"
                    value={scores.idade || ''}
                    onChange={(e) => 
                      setScores(prev => ({ ...prev, idade: parseInt(e.target.value) || 0 }))
                    }
                    placeholder="Digite a idade"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Exames Laboratoriais */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Exames Laboratoriais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
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
                      11-15 = 1pt, &gt;15 = 2pts
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
                      placeholder="Ex: 75"
                    />
                    <p className="text-xs text-gray-500">
                      70-84% = 1pt, ≥85% = 2pts
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
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tempo de sintomas para coleta da PCR:</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pcrMenos24h"
                        checked={scores.pcrMenos24h}
                        onCheckedChange={() => handlePCRTimeChange('menos24h')}
                      />
                      <Label htmlFor="pcrMenos24h" className="text-sm">
                        &lt;24 horas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pcrMais24h"
                        checked={scores.pcrMais24h}
                        onCheckedChange={() => handlePCRTimeChange('mais24h')}
                      />
                      <Label htmlFor="pcrMais24h" className="text-sm">
                        ≥24 horas
                      </Label>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>&lt;24h: 10-49mg/L = 1pt, ≥50mg/L = 2pts</p>
                    <p>≥24h: 50-99mg/L = 1pt, ≥100mg/L = 2pts</p>
                  </div>
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
              Calcular Score AAS
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
                      Score AAS: {currentScore} pontos
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
                    <p>• 0-10 pontos: Baixa probabilidade</p>
                    <p>• 11-15 pontos: Probabilidade intermediária</p>
                    <p>• ≥16 pontos: Alta probabilidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}