'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calculator, Scale, User, AlertTriangle, CheckCircle, Activity } from 'lucide-react'

interface BMIData {
  weight: string
  height: string
  age: string
  gender: string
}

export default function BMICalculator() {
  const [data, setData] = useState<BMIData>({
    weight: '',
    height: '',
    age: '',
    gender: ''
  })

  const [showResult, setShowResult] = useState(false)

  const calculateBMI = () => {
    const weight = parseFloat(data.weight) || 0
    const height = parseFloat(data.height) || 0
    
    if (weight === 0 || height === 0) return 0
    
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }

  const calculateBSA = () => {
    const weight = parseFloat(data.weight) || 0
    const height = parseFloat(data.height) || 0
    
    if (weight === 0 || height === 0) return 0
    
    // Fórmula de Du Bois: BSA = 0.007184 × W^0.425 × H^0.725
    return 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725)
  }

  const calculateIdealWeight = () => {
    const height = parseFloat(data.height) || 0
    const gender = data.gender
    
    if (height === 0 || !gender) return 0
    
    // Fórmula de Robinson
    if (gender === 'male') {
      return 52 + 1.9 * ((height - 152.4) / 2.54)
    } else {
      return 49 + 1.7 * ((height - 152.4) / 2.54)
    }
  }

  const getBMIInterpretation = () => {
    const bmi = calculateBMI()
    
    if (bmi < 18.5) {
      return {
        category: 'Baixo Peso',
        description: 'Abaixo do peso normal',
        risk: 'Risco de desnutrição e problemas de saúde',
        color: 'blue',
        icon: AlertTriangle
      }
    } else if (bmi < 25) {
      return {
        category: 'Peso Normal',
        description: 'Peso adequado para a altura',
        risk: 'Baixo risco de comorbidades',
        color: 'green',
        icon: CheckCircle
      }
    } else if (bmi < 30) {
      return {
        category: 'Sobrepeso',
        description: 'Acima do peso normal',
        risk: 'Risco aumentado de comorbidades',
        color: 'yellow',
        icon: AlertTriangle
      }
    } else if (bmi < 35) {
      return {
        category: 'Obesidade Grau I',
        description: 'Obesidade leve',
        risk: 'Risco moderado de comorbidades',
        color: 'orange',
        icon: AlertTriangle
      }
    } else if (bmi < 40) {
      return {
        category: 'Obesidade Grau II',
        description: 'Obesidade moderada',
        risk: 'Risco alto de comorbidades',
        color: 'red',
        icon: AlertTriangle
      }
    } else {
      return {
        category: 'Obesidade Grau III',
        description: 'Obesidade mórbida',
        risk: 'Risco muito alto de comorbidades',
        color: 'red',
        icon: AlertTriangle
      }
    }
  }

  const getRecommendations = () => {
    const bmi = calculateBMI()
    const interpretation = getBMIInterpretation()
    
    const recommendations = []
    
    if (bmi < 18.5) {
      recommendations.push('Consultar nutricionista para ganho de peso saudável')
      recommendations.push('Avaliar causas de baixo peso')
      recommendations.push('Considerar suplementação nutricional')
    } else if (bmi >= 25 && bmi < 30) {
      recommendations.push('Adotar dieta balanceada e hipocalórica')
      recommendations.push('Aumentar atividade física regular')
      recommendations.push('Monitorar fatores de risco cardiovascular')
    } else if (bmi >= 30) {
      recommendations.push('Acompanhamento médico especializado')
      recommendations.push('Programa estruturado de perda de peso')
      recommendations.push('Avaliação de comorbidades associadas')
      if (bmi >= 40) {
        recommendations.push('Considerar cirurgia bariátrica se indicado')
      }
    } else {
      recommendations.push('Manter peso atual com dieta equilibrada')
      recommendations.push('Praticar atividade física regular')
      recommendations.push('Monitoramento periódico do peso')
    }
    
    return recommendations
  }

  const handleCalculate = () => {
    setShowResult(true)
  }

  const handleReset = () => {
    setData({
      weight: '',
      height: '',
      age: '',
      gender: ''
    })
    setShowResult(false)
  }

  const bmi = calculateBMI()
  const bsa = calculateBSA()
  const idealWeight = calculateIdealWeight()
  const interpretation = getBMIInterpretation()
  const recommendations = getRecommendations()
  const IconComponent = interpretation.icon

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Calculator className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Calculadora de IMC e Superfície Corporal</h1>
        </div>
        <p className="text-gray-600">
          Índice de Massa Corporal, Superfície Corporal e Peso Ideal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-green-500" />
              Dados Antropométricos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={data.weight}
                onChange={(e) => setData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="70.0"
              />
            </div>

            <div>
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                type="number"
                value={data.height}
                onChange={(e) => setData(prev => ({ ...prev, height: e.target.value }))}
                placeholder="170"
              />
            </div>

            <div>
              <Label htmlFor="age">Idade (anos)</Label>
              <Input
                id="age"
                type="number"
                value={data.age}
                onChange={(e) => setData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="30"
              />
            </div>

            <div>
              <Label htmlFor="gender">Sexo</Label>
              <Select value={data.gender} onValueChange={(value) => setData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleCalculate} 
                className="flex-1"
                disabled={!data.weight || !data.height}
              >
                Calcular
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-green-600" />
                Resultados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showResult ? (
                <div className="space-y-6">
                  {/* Métricas Principais */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">IMC</h4>
                      <p className="text-3xl font-bold text-blue-800">
                        {bmi.toFixed(1)}
                      </p>
                      <p className="text-sm text-blue-600">kg/m²</p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Superfície Corporal</h4>
                      <p className="text-3xl font-bold text-green-800">
                        {bsa.toFixed(2)}
                      </p>
                      <p className="text-sm text-green-600">m²</p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Peso Ideal</h4>
                      <p className="text-3xl font-bold text-purple-800">
                        {idealWeight.toFixed(1)}
                      </p>
                      <p className="text-sm text-purple-600">kg</p>
                    </div>
                  </div>

                  {/* Classificação do IMC */}
                  <div className="text-center">
                    <Badge 
                      className={`text-lg px-4 py-2 mb-4 ${
                        interpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                        interpretation.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        interpretation.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        interpretation.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-2" />
                      {interpretation.category}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Interpretação:</h4>
                      <p className="text-gray-700">{interpretation.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Avaliação de Risco:</h4>
                      <p className="text-gray-700">{interpretation.risk}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Recomendações:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Diferença do Peso Ideal:</h4>
                      <p className="text-lg font-medium text-gray-800">
                        {(parseFloat(data.weight) - idealWeight).toFixed(1)} kg
                      </p>
                      <p className="text-sm text-gray-600">
                        {parseFloat(data.weight) > idealWeight ? 'Acima do ideal' : 'Abaixo do ideal'}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Faixa de Peso Saudável:</h4>
                      <p className="text-lg font-medium text-gray-800">
                        {((18.5 * Math.pow(parseFloat(data.height) / 100, 2))).toFixed(1)} - {((24.9 * Math.pow(parseFloat(data.height) / 100, 2))).toFixed(1)} kg
                      </p>
                      <p className="text-sm text-gray-600">Para sua altura</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Preencha peso e altura e clique em "Calcular" para ver os resultados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabela de Referência */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Classificação do IMC (OMS)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Classificação</th>
                  <th className="text-left py-2">IMC (kg/m²)</th>
                  <th className="text-left py-2">Risco de Comorbidades</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">Baixo peso</td>
                  <td className="py-2">&lt; 18,5</td>
                  <td className="py-2">Baixo</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Peso normal</td>
                  <td className="py-2">18,5 - 24,9</td>
                  <td className="py-2">Médio</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Sobrepeso</td>
                  <td className="py-2">25,0 - 29,9</td>
                  <td className="py-2">Pouco elevado</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Obesidade grau I</td>
                  <td className="py-2">30,0 - 34,9</td>
                  <td className="py-2">Elevado</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Obesidade grau II</td>
                  <td className="py-2">35,0 - 39,9</td>
                  <td className="py-2">Muito elevado</td>
                </tr>
                <tr>
                  <td className="py-2">Obesidade grau III</td>
                  <td className="py-2">≥ 40,0</td>
                  <td className="py-2">Extremamente elevado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Referências */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Referências Bibliográficas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              1. World Health Organization. Obesity: preventing and managing the global epidemic. 
              WHO Technical Report Series 894. Geneva: WHO; 2000.
            </p>
            <p>
              2. Du Bois D, Du Bois EF. A formula to estimate the approximate surface area if height and weight be known. 
              Arch Intern Med. 1916;17(6):863-71.
            </p>
            <p>
              3. Robinson JD, Lupkiewicz SM, Palenik L, et al. Determination of ideal body weight for drug dosage calculations. 
              Am J Hosp Pharm. 1983;40(6):1016-9.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}