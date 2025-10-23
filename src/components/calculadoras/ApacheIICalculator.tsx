'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Activity, AlertTriangle, CheckCircle, XCircle, Heart } from 'lucide-react'

interface ApacheIIData {
  // Variáveis fisiológicas
  temperature: string
  meanArterialPressure: string
  heartRate: string
  respiratoryRate: string
  oxygenation: string
  arterialPH: string
  serumSodium: string
  serumPotassium: string
  serumCreatinine: string
  hematocrit: string
  whiteBloodCells: string
  glasgowComaScale: string
  
  // Idade
  age: string
  
  // Doença crônica
  chronicHealth: string
  
  // Tipo de admissão
  admissionType: string
}

export default function ApacheIICalculator() {
  const [data, setData] = useState<ApacheIIData>({
    temperature: '',
    meanArterialPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenation: '',
    arterialPH: '',
    serumSodium: '',
    serumPotassium: '',
    serumCreatinine: '',
    hematocrit: '',
    whiteBloodCells: '',
    glasgowComaScale: '',
    age: '',
    chronicHealth: '',
    admissionType: ''
  })

  const [showResult, setShowResult] = useState(false)

  const getTemperatureScore = (temp: number) => {
    if (temp >= 41) return 4
    if (temp >= 39) return 3
    if (temp >= 38.5) return 1
    if (temp >= 36) return 0
    if (temp >= 34) return 1
    if (temp >= 32) return 2
    if (temp >= 30) return 3
    return 4
  }

  const getMAPScore = (map: number) => {
    if (map >= 160) return 4
    if (map >= 130) return 3
    if (map >= 110) return 2
    if (map >= 70) return 0
    if (map >= 50) return 2
    return 4
  }

  const getHeartRateScore = (hr: number) => {
    if (hr >= 180) return 4
    if (hr >= 140) return 3
    if (hr >= 110) return 2
    if (hr >= 70) return 0
    if (hr >= 55) return 2
    if (hr >= 40) return 3
    return 4
  }

  const getRespiratoryRateScore = (rr: number) => {
    if (rr >= 50) return 4
    if (rr >= 35) return 3
    if (rr >= 25) return 1
    if (rr >= 12) return 0
    if (rr >= 10) return 1
    if (rr >= 6) return 2
    return 4
  }

  const getOxygenationScore = (pao2: number) => {
    // Assumindo FiO2 < 0.5
    if (pao2 >= 70) return 0
    if (pao2 >= 61) return 1
    if (pao2 >= 55) return 3
    return 4
  }

  const getpHScore = (ph: number) => {
    if (ph >= 7.7) return 4
    if (ph >= 7.6) return 3
    if (ph >= 7.5) return 1
    if (ph >= 7.33) return 0
    if (ph >= 7.25) return 2
    if (ph >= 7.15) return 3
    return 4
  }

  const getSodiumScore = (na: number) => {
    if (na >= 180) return 4
    if (na >= 160) return 3
    if (na >= 155) return 2
    if (na >= 150) return 1
    if (na >= 130) return 0
    if (na >= 120) return 2
    if (na >= 111) return 3
    return 4
  }

  const getPotassiumScore = (k: number) => {
    if (k >= 7) return 4
    if (k >= 6) return 3
    if (k >= 5.5) return 1
    if (k >= 3.5) return 0
    if (k >= 3) return 1
    if (k >= 2.5) return 2
    return 4
  }

  const getCreatinineScore = (cr: number, arf: boolean = false) => {
    const multiplier = arf ? 2 : 1
    if (cr >= 3.5) return 4 * multiplier
    if (cr >= 2) return 3 * multiplier
    if (cr >= 1.5) return 2 * multiplier
    if (cr >= 0.6) return 0
    return 2
  }

  const getHematocritScore = (hct: number) => {
    if (hct >= 60) return 4
    if (hct >= 50) return 2
    if (hct >= 46) return 1
    if (hct >= 30) return 0
    if (hct >= 20) return 2
    return 4
  }

  const getWBCScore = (wbc: number) => {
    if (wbc >= 40) return 4
    if (wbc >= 20) return 2
    if (wbc >= 15) return 1
    if (wbc >= 3) return 0
    if (wbc >= 1) return 2
    return 4
  }

  const getAgeScore = (age: number) => {
    if (age >= 75) return 6
    if (age >= 65) return 5
    if (age >= 55) return 3
    if (age >= 45) return 2
    return 0
  }

  const getChronicHealthScore = (condition: string, admissionType: string) => {
    if (condition === 'none') return 0
    if (admissionType === 'emergency') return 5
    return 2 // elective surgery
  }

  const calculateAPACHEII = () => {
    const temp = parseFloat(data.temperature) || 0
    const map = parseFloat(data.meanArterialPressure) || 0
    const hr = parseFloat(data.heartRate) || 0
    const rr = parseFloat(data.respiratoryRate) || 0
    const pao2 = parseFloat(data.oxygenation) || 0
    const ph = parseFloat(data.arterialPH) || 0
    const na = parseFloat(data.serumSodium) || 0
    const k = parseFloat(data.serumPotassium) || 0
    const cr = parseFloat(data.serumCreatinine) || 0
    const hct = parseFloat(data.hematocrit) || 0
    const wbc = parseFloat(data.whiteBloodCells) || 0
    const gcs = parseFloat(data.glasgowComaScale) || 15
    const age = parseFloat(data.age) || 0

    const physiologicScore = 
      getTemperatureScore(temp) +
      getMAPScore(map) +
      getHeartRateScore(hr) +
      getRespiratoryRateScore(rr) +
      getOxygenationScore(pao2) +
      getpHScore(ph) +
      getSodiumScore(na) +
      getPotassiumScore(k) +
      getCreatinineScore(cr) +
      getHematocritScore(hct) +
      getWBCScore(wbc) +
      (15 - gcs)

    const ageScore = getAgeScore(age)
    const chronicHealthScore = getChronicHealthScore(data.chronicHealth, data.admissionType)

    const totalScore = physiologicScore + ageScore + chronicHealthScore

    // Cálculo da mortalidade predita
    const logOdds = -3.517 + (totalScore * 0.146)
    const predictedMortality = (Math.exp(logOdds) / (1 + Math.exp(logOdds))) * 100

    return {
      physiologicScore,
      ageScore,
      chronicHealthScore,
      totalScore,
      predictedMortality
    }
  }

  const getInterpretation = () => {
    const result = calculateAPACHEII()
    
    if (result.totalScore <= 4) {
      return {
        severity: 'Baixo Risco',
        description: 'Mortalidade hospitalar muito baixa.',
        recommendation: 'Monitorização padrão. Prognóstico favorável.',
        color: 'green',
        icon: CheckCircle
      }
    } else if (result.totalScore <= 14) {
      return {
        severity: 'Risco Moderado',
        description: 'Mortalidade hospitalar baixa a moderada.',
        recommendation: 'Monitorização cuidadosa. Considerar cuidados intermediários.',
        color: 'yellow',
        icon: AlertTriangle
      }
    } else if (result.totalScore <= 24) {
      return {
        severity: 'Alto Risco',
        description: 'Mortalidade hospitalar elevada.',
        recommendation: 'Cuidados intensivos. Monitorização contínua necessária.',
        color: 'orange',
        icon: AlertTriangle
      }
    } else {
      return {
        severity: 'Risco Muito Alto',
        description: 'Mortalidade hospitalar muito elevada.',
        recommendation: 'Cuidados intensivos máximos. Prognóstico reservado.',
        color: 'red',
        icon: XCircle
      }
    }
  }

  const handleCalculate = () => {
    setShowResult(true)
  }

  const handleReset = () => {
    setData({
      temperature: '',
      meanArterialPressure: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenation: '',
      arterialPH: '',
      serumSodium: '',
      serumPotassium: '',
      serumCreatinine: '',
      hematocrit: '',
      whiteBloodCells: '',
      glasgowComaScale: '',
      age: '',
      chronicHealth: '',
      admissionType: ''
    })
    setShowResult(false)
  }

  const result = calculateAPACHEII()
  const interpretation = getInterpretation()
  const IconComponent = interpretation.icon

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Heart className="h-8 w-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">APACHE II Score</h1>
        </div>
        <p className="text-gray-600">
          Acute Physiology and Chronic Health Evaluation II - Predição de mortalidade em UTI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-red-500" />
                Parâmetros Clínicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Variáveis Fisiológicas */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Variáveis Fisiológicas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temperature">Temperatura (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      value={data.temperature}
                      onChange={(e) => setData(prev => ({ ...prev, temperature: e.target.value }))}
                      placeholder="36.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="map">Pressão Arterial Média (mmHg)</Label>
                    <Input
                      id="map"
                      type="number"
                      value={data.meanArterialPressure}
                      onChange={(e) => setData(prev => ({ ...prev, meanArterialPressure: e.target.value }))}
                      placeholder="90"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hr">Frequência Cardíaca (bpm)</Label>
                    <Input
                      id="hr"
                      type="number"
                      value={data.heartRate}
                      onChange={(e) => setData(prev => ({ ...prev, heartRate: e.target.value }))}
                      placeholder="80"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rr">Frequência Respiratória (rpm)</Label>
                    <Input
                      id="rr"
                      type="number"
                      value={data.respiratoryRate}
                      onChange={(e) => setData(prev => ({ ...prev, respiratoryRate: e.target.value }))}
                      placeholder="16"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pao2">PaO2 (mmHg)</Label>
                    <Input
                      id="pao2"
                      type="number"
                      value={data.oxygenation}
                      onChange={(e) => setData(prev => ({ ...prev, oxygenation: e.target.value }))}
                      placeholder="90"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ph">pH Arterial</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.01"
                      value={data.arterialPH}
                      onChange={(e) => setData(prev => ({ ...prev, arterialPH: e.target.value }))}
                      placeholder="7.40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sodium">Sódio Sérico (mEq/L)</Label>
                    <Input
                      id="sodium"
                      type="number"
                      value={data.serumSodium}
                      onChange={(e) => setData(prev => ({ ...prev, serumSodium: e.target.value }))}
                      placeholder="140"
                    />
                  </div>

                  <div>
                    <Label htmlFor="potassium">Potássio Sérico (mEq/L)</Label>
                    <Input
                      id="potassium"
                      type="number"
                      step="0.1"
                      value={data.serumPotassium}
                      onChange={(e) => setData(prev => ({ ...prev, serumPotassium: e.target.value }))}
                      placeholder="4.0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="creatinine">Creatinina Sérica (mg/dL)</Label>
                    <Input
                      id="creatinine"
                      type="number"
                      step="0.1"
                      value={data.serumCreatinine}
                      onChange={(e) => setData(prev => ({ ...prev, serumCreatinine: e.target.value }))}
                      placeholder="1.0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hematocrit">Hematócrito (%)</Label>
                    <Input
                      id="hematocrit"
                      type="number"
                      value={data.hematocrit}
                      onChange={(e) => setData(prev => ({ ...prev, hematocrit: e.target.value }))}
                      placeholder="40"
                    />
                  </div>

                  <div>
                    <Label htmlFor="wbc">Leucócitos (x1000/mm³)</Label>
                    <Input
                      id="wbc"
                      type="number"
                      step="0.1"
                      value={data.whiteBloodCells}
                      onChange={(e) => setData(prev => ({ ...prev, whiteBloodCells: e.target.value }))}
                      placeholder="8.0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gcs">Escala de Coma de Glasgow</Label>
                    <Input
                      id="gcs"
                      type="number"
                      min="3"
                      max="15"
                      value={data.glasgowComaScale}
                      onChange={(e) => setData(prev => ({ ...prev, glasgowComaScale: e.target.value }))}
                      placeholder="15"
                    />
                  </div>
                </div>
              </div>

              {/* Idade e Doença Crônica */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Dados Demográficos</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Idade (anos)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={data.age}
                      onChange={(e) => setData(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="65"
                    />
                  </div>

                  <div>
                    <Label htmlFor="chronic">Doença Crônica</Label>
                    <Select value={data.chronicHealth} onValueChange={(value) => setData(prev => ({ ...prev, chronicHealth: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma</SelectItem>
                        <SelectItem value="present">Presente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="admission">Tipo de Admissão</Label>
                    <Select value={data.admissionType} onValueChange={(value) => setData(prev => ({ ...prev, admissionType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergência</SelectItem>
                        <SelectItem value="elective">Eletiva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCalculate} className="flex-1">
                  Calcular APACHE II
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
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Resultado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showResult ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {result.totalScore}
                    </div>
                    <Badge 
                      className={`text-lg px-4 py-2 mb-4 ${
                        interpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                        interpretation.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        interpretation.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-2" />
                      {interpretation.severity}
                    </Badge>
                  </div>

                  {/* Breakdown dos Scores */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Score Fisiológico</span>
                      <Badge variant="outline">{result.physiologicScore}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Score de Idade</span>
                      <Badge variant="outline">{result.ageScore}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Doença Crônica</span>
                      <Badge variant="outline">{result.chronicHealthScore}</Badge>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Mortalidade Predita:</h4>
                    <p className="text-2xl font-bold text-blue-800">
                      {result.predictedMortality.toFixed(1)}%
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
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Preencha os parâmetros e clique em "Calcular APACHE II" para ver o resultado</p>
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
              1. Knaus WA, Draper EA, Wagner DP, Zimmerman JE. APACHE II: a severity of disease classification system. 
              Crit Care Med. 1985;13(10):818-29.
            </p>
            <p>
              2. Vincent JL, Moreno R. Clinical review: scoring systems in the critically ill. 
              Crit Care. 2010;14(2):207.
            </p>
            <p>
              3. Zimmerman JE, Kramer AA, McNair DS, Malila FM. Acute Physiology and Chronic Health Evaluation (APACHE) IV: 
              hospital mortality assessment for today's critically ill patients. Crit Care Med. 2006;34(5):1297-310.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}