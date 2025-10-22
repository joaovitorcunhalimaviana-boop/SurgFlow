import React from 'react'
import Breadcrumb from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ArrowRight,
  FileText,
  Users,
  Calendar
} from 'lucide-react'

export default function CholecystitisTokyoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Guidelines', href: '/guidelines' },
            { label: 'Colecistite', current: true }
          ]}
          className="mb-8"
        />

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-xl mr-4">
                <Stethoscope className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Colecistite Aguda
                </h1>
                <p className="text-lg text-gray-600">
                  Tokyo Guidelines 2018 - Diagnóstico e Manejo
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Tokyo Guidelines 2018
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Atualizado em 2018
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-gray-700">Para estudantes e residentes</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-gray-700">Consulta rápida</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-gray-700">Baseado em evidências</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Flowchart Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Diagnosis */}
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </div>
                  Diagnóstico de Colecistite
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Critérios A - Inflamação Local
                    </h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Sinal de Murphy positivo</li>
                      <li>• Dor/sensibilidade no quadrante superior direito</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Critérios B - Sintomas Sistêmicos
                    </h4>
                    <ul className="space-y-2 text-yellow-800">
                      <li>• Febre</li>
                      <li>• Leucocitose</li>
                      <li>• PCR elevado</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Critérios C - Exame de Imagem
                    </h4>
                    <ul className="space-y-2 text-green-800">
                      <li>• Ultrassom com sinais de colecistite</li>
                      <li>• TC com alterações características</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-purple-800 font-medium">
                      <strong>Diagnóstico:</strong> A + B + C = Colecistite Aguda Definitiva
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Initial Management */}
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </div>
                  Manejo Inicial
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3">Medidas Gerais</h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>• Jejum</li>
                      <li>• Hidratação venosa</li>
                      <li>• Analgesia</li>
                      <li>• Antieméticos se necessário</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-3">Antibioticoterapia</h4>
                    <ul className="space-y-2 text-green-800 text-sm">
                      <li>• Iniciar se suspeita de infecção</li>
                      <li>• Ampicilina + Gentamicina</li>
                      <li>• Ou Ceftriaxone + Metronidazol</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Severity Classification */}
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </div>
                  Classificação de Gravidade
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2">
                        I
                      </div>
                      Grau I - Leve
                    </h4>
                    <p className="text-green-800 text-sm">
                      Paciente saudável, sem disfunção orgânica
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                      <div className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2">
                        II
                      </div>
                      Grau II - Moderada
                    </h4>
                    <p className="text-yellow-800 text-sm">
                      Leucocitose &gt;18.000, massa palpável, sintomas &gt;72h
                    </p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2">
                        III
                      </div>
                      Grau III - Grave
                    </h4>
                    <p className="text-red-800 text-sm">
                      Disfunção orgânica (cardiovascular, neurológica, respiratória, renal, hepática, hematológica)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Guideline Completo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Casos Clínicos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Próximo Guideline
                </Button>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-yellow-800">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Pontos Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-yellow-800 text-sm">
                  <li>• Sempre considerar diagnósticos diferenciais</li>
                  <li>• Reavaliar paciente regularmente</li>
                  <li>• Considerar cirurgia precoce em casos apropriados</li>
                  <li>• Monitorar sinais de complicações</li>
                </ul>
              </CardContent>
            </Card>

            {/* Related Guidelines */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Guidelines Relacionados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-left">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">Colangite</div>
                    <div className="text-xs text-gray-500">Tokyo Guidelines 2018</div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">Pancreatite</div>
                    <div className="text-xs text-gray-500">Atlanta 2012</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}