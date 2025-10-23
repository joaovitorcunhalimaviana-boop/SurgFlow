'use client'

import React, { useState } from 'react'
import Breadcrumb from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import GuideFlowColecistite from '@/components/guidelines/GuideFlowColecistite'
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ArrowRight,
  FileText,
  Users,
  Calendar,
  Play
} from 'lucide-react'

interface GuideFlowState {
  murphyPositivo: boolean;
  dorQSD: boolean;
  febre: boolean;
  pcrElevada: boolean;
  leucocitose: boolean;
  usg: boolean;
  tc: boolean;
  rm: boolean;
  diagnostico: string;
  etapaAtual: number;
  disfuncaoCardiovascular: boolean;
  disfuncaoNeurologica: boolean;
  disfuncaoRespiratoria: boolean;
  disfuncaoRenal: boolean;
  disfuncaoHepatica: boolean;
  disfuncaoHematologica: boolean;
  leucocitoseMaior18000: boolean;
  massaPalpavel: boolean;
  sintomas72h: boolean;
  inflamacaoLocalGrave: boolean;
  cciMaiorIgual6_ASA3: boolean;
  cciMaiorIgual4_ASA3_GrauIII: boolean;
  idadeMais75Comorbidades: boolean;
  comorbidadesDescompensadas: boolean;
  gravidade: string;
  riscoCircurgico: string;
  ictericia: boolean;
}

export default function CholecystitisTokyoPage() {
  const [guideFlowState, setGuideFlowState] = useState<GuideFlowState>({
    murphyPositivo: false,
    dorQSD: false,
    sensibilidadeQSD: false,
    febre: false,
    temperaturaValue: 0,
    pcrElevada: false,
    pcrValue: 0,
    leucocitose: false,
    leucocitosValue: 0,
    usgPositivo: false,
    usgAchados: [],
    tcPositivo: false,
    tcAchados: [],
    rmPositivo: false,
    rmAchados: [],
    cprm: false,
    disfuncaoCardiovascular: false,
    hipotensao: false,
    pressaoSistolica: 0,
    necessidadeDrogas: false,
    disfuncaoNeurologica: false,
    alteracaoConsciencia: false,
    glasgowValue: 15,
    disfuncaoRespiratoria: false,
    pao2fio2: 400,
    necessidadeVentilacao: false,
    disfuncaoRenal: false,
    creatininaValue: 0,
    oliguria: false,
    diurese24h: 0,
    disfuncaoHepatica: false,
    bilirrubinaTotal: 0,
    disfuncaoHematologica: false,
    plaquetas: 0,
    leucocitoseMaior18000: false,
    massaPalpavel: false,
    sintomas72h: false,
    inflamacaoLocalGrave: false,
    inflamacaoAchados: [],
    idade: 0,
    cci: 0,
    asaScore: 0,
    comorbidades: [],
    
    // Comorbidades do Charlson Comorbidity Index - 1 ponto
    iamPrevio: false,
    iccCongestiva: false,
    doencaVascularPeriferica: false,
    doencaCerebrovascular: false,
    demencia: false,
    dpocCronico: false,
    doencaTecidoConectivo: false,
    ulceraPeptica: false,
    hepatopatiaLeve: false,
    diabetesSemComplicacao: false,
    
    // Comorbidades do Charlson Comorbidity Index - 2 pontos
    diabetesComComplicacao: false,
    hemiplegiaParaplegia: false,
    doencaRenalGrave: false,
    neoplasiaSemMetastase: false,
    leucemia: false,
    linfoma: false,
    
    // Comorbidades do Charlson Comorbidity Index - 3 pontos
    hepatopatiaGrave: false,
    
    // Comorbidades do Charlson Comorbidity Index - 6 pontos
    neoplasiaMetastatica: false,
    aids: false,
    gravidade: '',
    riscoCircurgico: '',
    condutaRecomendada: '',
    antibiotico: '',
    dosagem: '',
    duracao: 0,
    seguimento: [],
    etapaAtual: 1,
    diagnostico: '',
    ictericia: false,
    bilirrubinaDireta: 0,
    colangite: false,
    sepse: false,
    choqueSetico: false
  });
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

        {/* GuideFlow Interativo */}
        <div className="mb-8">
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <div className="bg-purple-600 p-2 rounded-lg mr-3">
                  <Play className="h-6 w-6 text-white" />
                </div>
                GuideFlow Interativo - Colecistite Aguda
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Ferramenta interativa para diagnóstico, classificação e manejo da colecistite aguda baseada nas Tokyo Guidelines 2018.
                Siga as etapas sequenciais para uma avaliação completa do paciente.
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* Componente GuideFlow */}
        <GuideFlowColecistite 
          state={guideFlowState}
          setState={setGuideFlowState}
        />

        {/* Seção de Referência Rápida */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumo dos Critérios */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-xl">Resumo dos Critérios Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Critério A - Local
                    </h4>
                    <ul className="space-y-1 text-blue-800 text-sm">
                      <li>• Sinal de Murphy positivo</li>
                      <li>• Dor/sensibilidade em QSD</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Critério B - Sistêmico
                    </h4>
                    <ul className="space-y-1 text-yellow-800 text-sm">
                      <li>• Febre</li>
                      <li>• Leucocitose</li>
                      <li>• PCR elevado</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Critério C - Imagem
                    </h4>
                    <ul className="space-y-1 text-green-800 text-sm">
                      <li>• USG com sinais</li>
                      <li>• TC com alterações</li>
                      <li>• RM com achados</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-800 font-medium text-center">
                    <strong>Diagnóstico Definitivo:</strong> A + B + C ou A + C | 
                    <strong> Diagnóstico Suspeito:</strong> A + B
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com Informações Adicionais */}
          <div className="space-y-6">
            {/* Pontos Importantes */}
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
                  <li>• Considerar cirurgia precoce quando indicada</li>
                  <li>• Monitorar sinais de complicações</li>
                  <li>• Antibioticoterapia precoce é fundamental</li>
                </ul>
              </CardContent>
            </Card>

            {/* Guidelines Relacionados */}
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