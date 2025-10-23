'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Stethoscope, AlertTriangle, CheckCircle, XCircle, Activity, Heart } from 'lucide-react'

interface ASAData {
  classification: string
  emergencyModifier: boolean
  clinicalNotes: string
}

export default function ASACalculator() {
  const [data, setData] = useState<ASAData>({
    classification: '',
    emergencyModifier: false,
    clinicalNotes: ''
  })

  const [showResult, setShowResult] = useState(false)

  const asaClassifications = [
    {
      value: 'ASA1',
      label: 'ASA I',
      description: 'Paciente saudável normal',
      details: 'Sem distúrbios orgânicos, fisiológicos, bioquímicos ou psiquiátricos. Exclui extremos de idade.',
      mortality: '< 0.1%',
      color: 'green',
      icon: CheckCircle
    },
    {
      value: 'ASA2',
      label: 'ASA II',
      description: 'Paciente com doença sistêmica leve',
      details: 'Doença sistêmica leve a moderada sem limitação funcional substancial. Ex: hipertensão controlada, diabetes sem complicações, tabagismo.',
      mortality: '0.2%',
      color: 'blue',
      icon: Activity
    },
    {
      value: 'ASA3',
      label: 'ASA III',
      description: 'Paciente com doença sistêmica grave',
      details: 'Doença sistêmica grave com limitação funcional definitiva. Ex: diabetes com complicações, hipertensão mal controlada, DPOC moderado.',
      mortality: '1.8%',
      color: 'yellow',
      icon: AlertTriangle
    },
    {
      value: 'ASA4',
      label: 'ASA IV',
      description: 'Paciente com doença sistêmica grave que é ameaça constante à vida',
      details: 'Doença sistêmica grave que é ameaça constante à vida. Ex: insuficiência cardíaca grave, sepse, DM descompensado.',
      mortality: '7.8%',
      color: 'orange',
      icon: AlertTriangle
    },
    {
      value: 'ASA5',
      label: 'ASA V',
      description: 'Paciente moribundo que não se espera que sobreviva sem a operação',
      details: 'Paciente moribundo que não se espera que sobreviva sem a operação. Ex: ruptura de aneurisma aórtico, trauma massivo.',
      mortality: '9.4%',
      color: 'red',
      icon: XCircle
    },
    {
      value: 'ASA6',
      label: 'ASA VI',
      description: 'Paciente com morte cerebral declarada cujos órgãos estão sendo removidos para doação',
      details: 'Paciente com morte cerebral declarada cujos órgãos estão sendo removidos para fins de doação.',
      mortality: 'N/A',
      color: 'gray',
      icon: Heart
    }
  ]

  const getSelectedClassification = () => {
    return asaClassifications.find(asa => asa.value === data.classification)
  }

  const getInterpretation = () => {
    const selected = getSelectedClassification()
    if (!selected) return null

    return {
      classification: selected.label,
      description: selected.description,
      details: selected.details,
      mortality: selected.mortality,
      color: selected.color,
      icon: selected.icon,
      emergencyModifier: data.emergencyModifier
    }
  }

  const handleCalculate = () => {
    setShowResult(true)
  }

  const handleReset = () => {
    setData({
      classification: '',
      emergencyModifier: false,
      clinicalNotes: ''
    })
    setShowResult(false)
  }

  const interpretation = getInterpretation()
  const IconComponent = interpretation?.icon

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Classificação ASA</h1>
        </div>
        <p className="text-gray-600">
          American Society of Anesthesiologists Physical Status Classification System
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Avaliação do Estado Físico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="classification">Classificação ASA</Label>
              <Select value={data.classification} onValueChange={(value) => setData(prev => ({ ...prev, classification: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a classificação ASA" />
                </SelectTrigger>
                <SelectContent>
                  {asaClassifications.map((asa) => (
                    <SelectItem key={asa.value} value={asa.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{asa.label}</span>
                        <span className="text-sm text-gray-500">{asa.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="emergency">Modificador de Emergência</Label>
              <Select 
                value={data.emergencyModifier ? 'true' : 'false'} 
                onValueChange={(value) => setData(prev => ({ ...prev, emergencyModifier: value === 'true' }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione se é emergência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Não - Cirurgia Eletiva</SelectItem>
                  <SelectItem value="true">Sim - Cirurgia de Emergência (E)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                O modificador "E" é adicionado quando a cirurgia é de emergência
              </p>
            </div>

            <div>
              <Label htmlFor="notes">Notas Clínicas (Opcional)</Label>
              <Textarea
                id="notes"
                value={data.clinicalNotes}
                onChange={(e) => setData(prev => ({ ...prev, clinicalNotes: e.target.value }))}
                placeholder="Descreva as condições clínicas relevantes..."
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCalculate} className="flex-1" disabled={!data.classification}>
                Avaliar Classificação
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
              Classificação
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showResult && interpretation ? (
              <div className="space-y-6">
                <div className="text-center">
                  <Badge 
                    className={`text-2xl px-6 py-3 mb-4 ${
                      interpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                      interpretation.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      interpretation.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      interpretation.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                      interpretation.color === 'red' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {IconComponent && <IconComponent className="h-6 w-6 mr-2" />}
                    {interpretation.classification}{interpretation.emergencyModifier ? 'E' : ''}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Descrição:</h4>
                    <p className="text-gray-700">{interpretation.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Detalhes:</h4>
                    <p className="text-gray-700 text-sm">{interpretation.details}</p>
                  </div>

                  {interpretation.mortality !== 'N/A' && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Mortalidade Perioperatória:</h4>
                      <p className="text-2xl font-bold text-blue-800">
                        {interpretation.mortality}
                      </p>
                    </div>
                  )}

                  {interpretation.emergencyModifier && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">Modificador de Emergência:</h4>
                      <p className="text-red-800 text-sm">
                        Cirurgia de emergência - risco aumentado devido à urgência do procedimento
                      </p>
                    </div>
                  )}

                  {data.clinicalNotes && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Notas Clínicas:</h4>
                      <p className="text-gray-700 text-sm">{data.clinicalNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Selecione a classificação ASA e clique em "Avaliar Classificação" para ver o resultado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Guia de Classificação */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Guia de Classificação ASA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {asaClassifications.map((asa) => {
              const IconComp = asa.icon
              return (
                <div key={asa.value} className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <IconComp className={`h-5 w-5 mr-2 ${
                      asa.color === 'green' ? 'text-green-600' :
                      asa.color === 'blue' ? 'text-blue-600' :
                      asa.color === 'yellow' ? 'text-yellow-600' :
                      asa.color === 'orange' ? 'text-orange-600' :
                      asa.color === 'red' ? 'text-red-600' :
                      'text-gray-600'
                    }`} />
                    <span className="font-semibold">{asa.label}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{asa.description}</p>
                  <p className="text-xs text-gray-500">{asa.details}</p>
                  {asa.mortality !== 'N/A' && (
                    <p className="text-xs font-medium text-blue-600 mt-2">
                      Mortalidade: {asa.mortality}
                    </p>
                  )}
                </div>
              )
            })}
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
              1. American Society of Anesthesiologists. ASA Physical Status Classification System. 
              Last approved by the ASA House of Delegates on October 15, 2014.
            </p>
            <p>
              2. Doyle DJ, Goyal A, Bansal P, Garmon EH. American Society of Anesthesiologists Classification. 
              StatPearls. 2023 Jul 24.
            </p>
            <p>
              3. Hackett NJ, De Oliveira GS, Jain UK, Kim JY. ASA class is a reliable independent predictor of medical complications and mortality following surgery. 
              Int J Surg. 2015;18:184-90.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}