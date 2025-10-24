'use client'

/**
 * GuideFlow de Apendicite Aguda
 * Baseado no WSES Jerusalem Guidelines 2020
 *
 * IMPORTANTE: Este é um aplicativo médico que se relaciona com vidas.
 * Todo o conteúdo é fiel ao guideline original com máximo rigor científico.
 *
 * Estrutura:
 * 1. DIAGNÓSTICO (Sintomas + Scores + Exames de Imagem)
 * 2. CLASSIFICAÇÃO (Complicada vs Não Complicada)
 * 3. TRATAMENTO (Baseado na classificação)
 * 4. SITUAÇÕES ESPECIAIS (Pediatria, Gestação, Idosos)
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Stethoscope,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Heart,
  Thermometer,
  Droplets,
  Calculator,
  FileText,
  Clock,
  Target,
  AlertCircle,
  Info,
  User,
  Users,
  Baby,
  PersonStanding,
  Shield,
  Syringe,
  Pill,
  ClipboardCheck,
  Microscope,
  Scan,
  BookOpen,
  TrendingUp,
  Award,
  Lightbulb,
  Calendar
} from 'lucide-react'
import { GuideFlowAppendicitisState, defaultAppendicitisState } from '@/types/guideflow-appendicitis'
import {
  validateCompleteGuideFlow,
  calculateAlvaradoScore,
  calculateAIRScore,
  calculateAASScore,
  calculatePASScore
} from '@/lib/guidelineValidator'

interface GuideFlowApendiciteProps {
  state: GuideFlowAppendicitisState
  setState: (state: GuideFlowAppendicitisState | ((prevState: GuideFlowAppendicitisState) => GuideFlowAppendicitisState)) => void
}

const GuideFlowApendicite: React.FC<GuideFlowApendiciteProps> = ({ state, setState }) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    // Etapa 1
    apresentacao: true,
    alvarado: false,
    air: false,
    aas: false,
    pas: false,
    imagemUS: false,
    imagemTC: false,
    imagemRM: false,

    // Etapa 2
    naoComplicada: true,
    complicada: false,

    // Etapa 3
    cirurgico: true,
    conservador: false,
    complicadaTratamento: false,
    abscesso: false,

    // Situações Especiais
    pediatria: false,
    gestacao: false,
    idosos: false
  })

  // Validação automática em tempo real
  const [validationResult, setValidationResult] = useState(validateCompleteGuideFlow(state))

  // useEffect para calcular scores automaticamente
  useEffect(() => {
    const novoAlvarado = calculateAlvaradoScore(state)
    const novoAIR = calculateAIRScore(state)
    const aasResult = calculateAASScore(state)
    const novoPAS = calculatePASScore(state)

    if (
      novoAlvarado !== state.scoreAlvarado ||
      novoAIR !== state.scoreAIR ||
      aasResult.score !== state.scoreAAS ||
      aasResult.resultado !== state.aasResultado ||
      novoPAS !== state.scorePAS
    ) {
      setState(prevState => ({
        ...prevState,
        scoreAlvarado: novoAlvarado,
        scoreAIR: novoAIR,
        scoreAAS: aasResult.score,
        aasResultado: aasResult.resultado,
        scorePAS: novoPAS
      }))
    }
  }, [
    // Alvarado
    state.alvaradoDorMigratoria, state.alvaradoAnorexia, state.alvaradoNauseasVomitos,
    state.alvaradoDorFID, state.alvaradoSinalBlumberg, state.alvaradoFebre,
    state.alvaradoLeucocitose, state.alvaradoDesvioEsquerda,
    // AIR
    state.airVomitos, state.airDorFID, state.airDescompressaoLeve,
    state.airDescompressaoModerada, state.airDescompressaoIntensa,
    state.airTemperatura, state.airLeucocitos, state.airNeutrofilos, state.airPCR,
    // AAS
    state.aasSexoMasculino, state.aasSexoFeminino, state.aasIdade, state.aasMigracaoDor,
    state.aasDorFID, state.aasDefesaLeve, state.aasDefesaModeradaGrave, state.aasLeucocitos,
    state.aasNeutrofilos, state.aasPCR, state.aasPCRMenos24h, state.aasPCRMais24h,
    // PAS
    state.pasFebre, state.pasAnorexia, state.pasNauseasVomitos,
    state.pasDorMigratoria, state.pasSensibilidadeFID, state.pasDorTossePuloPercussao,
    state.pasLeucocitose, state.pasNeutrofilia
  ])

  // useEffect para validação em tempo real
  useEffect(() => {
    const validation = validateCompleteGuideFlow(state)
    setValidationResult(validation)

    // Log de erros críticos no console (para desenvolvimento)
    if (validation.criticalErrors.length > 0) {
      console.error('🚨 ERROS CRÍTICOS DETECTADOS:', validation.criticalErrors)
    }
  }, [state])

  // useEffect para atualizar interpretações dos scores
  useEffect(() => {
    const alvaradoInterp = getAlvaradoInterpretation(state.scoreAlvarado)
    const airInterp = getAIRInterpretation(state.scoreAIR)
    const aasInterp = getAASInterpretation(state.scoreAAS)
    const pasInterp = getPASInterpretation(state.scorePAS)

    if (
      alvaradoInterp !== state.alvaradoResultado ||
      airInterp !== state.airResultado ||
      aasInterp !== state.aasResultado ||
      pasInterp !== state.pasResultado
    ) {
      setState(prevState => ({
        ...prevState,
        alvaradoResultado: alvaradoInterp,
        airResultado: airInterp,
        aasResultado: aasInterp,
        pasResultado: pasInterp
      }))
    }
  }, [state.scoreAlvarado, state.scoreAIR, state.scoreAAS, state.scorePAS])

  // useEffect para calcular necessidade de exame de imagem
  useEffect(() => {
    let imagemNecessaria = false
    let probabilidadeIntermediaria = false
    let probabilidadeAlta = false

    // Verificar probabilidade intermediária (imagem OBRIGATÓRIA)
    if ((state.scoreAlvarado >= 5 && state.scoreAlvarado <= 6) ||
        (state.scoreAIR >= 5 && state.scoreAIR <= 8) ||
        (state.scoreAAS >= 11 && state.scoreAAS <= 15) ||
        (state.scorePAS >= 4 && state.scorePAS <= 6)) {
      probabilidadeIntermediaria = true
      imagemNecessaria = true
    }

    // Verificar probabilidade alta
    if ((state.scoreAlvarado >= 7) ||
        (state.scoreAIR >= 9) ||
        (state.scoreAAS >= 16) ||
        (state.scorePAS >= 7)) {
      probabilidadeAlta = true
    }

    // Lógica para probabilidade alta
    if (probabilidadeAlta && !probabilidadeIntermediaria) {
      // Verificar se é pediatria (PAS score calculado indica população pediátrica)
      const isPediatric = state.scorePAS > 0 || state.crianca

      if (isPediatric) {
        // Em pediatria, imagem é SEMPRE recomendada mesmo com score alto
        imagemNecessaria = true
      } else {
        // Em adultos: imagem recomendada se qualquer checkbox marcado
        const hasSpecialCondition = state.apresentacaoAtipica ||
                                   state.incertezaDiagnostica ||
                                   state.suspeitaComplicacao ||
                                   state.pacienteIdoso ||
                                   state.gestante ||
                                   state.crianca
        
        imagemNecessaria = hasSpecialCondition
      }
    }

    // Probabilidade baixa: imagem pode ser omitida (imagemNecessaria = false)
    // Alvarado ≤4, AIR 0-4, AAS ≤10, PAS 0-3

    if (imagemNecessaria !== state.imagemRecomendada) {
      setState(prevState => ({
        ...prevState,
        imagemRecomendada: imagemNecessaria
      }))
    }
  }, [
    state.scoreAlvarado,
    state.scoreAIR,
    state.scoreAAS,
    state.scorePAS,
    state.apresentacaoAtipica,
    state.incertezaDiagnostica,
    state.suspeitaComplicacao,
    state.pacienteIdoso,
    state.gestante,
    state.crianca
  ])

  // Funções auxiliares
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const proximaEtapa = () => {
    if (state.etapaAtual < 8) {
      let proximaEtapa = state.etapaAtual + 1

      // Skip etapa 5 (Caracterização da Complicação) if classification is "não complicada"
      if (proximaEtapa === 5 && state.classificacao === 'naoComplicada') {
        proximaEtapa = 6
      }

      setState(prevState => ({ ...prevState, etapaAtual: proximaEtapa }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const etapaAnterior = () => {
    if (state.etapaAtual > 1) {
      let etapaAnterior = state.etapaAtual - 1

      // Skip etapa 5 (Caracterização da Complicação) if classification is "não complicada"
      if (etapaAnterior === 5 && state.classificacao === 'naoComplicada') {
        etapaAnterior = 4
      }

      setState(prevState => ({ ...prevState, etapaAtual: etapaAnterior }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const podeAvancar = () => {
    switch (state.etapaAtual) {
      case 1:
        // Etapa 1: Apresentação Clínica - pode sempre avançar
        return true
      case 2:
        // Etapa 2: Scores Diagnósticos - pelo menos um score calculado
        return state.scoreAlvarado > 0 || state.scoreAIR > 0 || state.scoreAAS > 0 || state.scorePAS > 0
      case 3:
        // Etapa 3: Exames de Imagem - pode avançar se não necessário ou se realizado
        return !state.imagemRecomendada || state.usgRealizado || state.tcRealizado || state.rmRealizado
      case 4:
        // Etapa 4: Classificação - deve definir se é complicada ou não
        return state.classificacao !== null
      case 5:
        // Etapa 5: Caracterização da Complicação (apenas se complicada)
        return true
      case 6:
        // Etapa 6: Tratamento Específico
        return true
      case 7:
        // Etapa 7: Particularidades Clínicas
        return true
      case 8:
        // Etapa 8: Particularidades Cirúrgicas - última etapa
        return true
      default:
        return false
    }
  }

  // Interpretações dos scores
  function getAlvaradoInterpretation(score: number): string {
    if (score <= 4) return 'Apendicite improvável (considerar diagnósticos alternativos)'
    if (score <= 6) return 'Apendicite possível (solicitar exame de imagem)'
    if (score <= 8) return 'Apendicite provável (considerar cirurgia)'
    return 'Apendicite muito provável (indicação cirúrgica)'
  }

  function getAIRInterpretation(score: number): string {
    if (score <= 4) return 'Baixa probabilidade'
    if (score <= 8) return 'Probabilidade intermediária (imagem recomendada)'
    return 'Alta probabilidade'
  }

  function getAASInterpretation(score: number): string {
    if (score <= 10) return 'Baixa probabilidade'
    if (score <= 15) return 'Probabilidade intermediária'
    return 'Alta probabilidade'
  }

  function getPASInterpretation(score: number): string {
    if (score <= 3) return 'Baixo risco'
    if (score <= 6) return 'Risco intermediário (imagem recomendada)'
    return 'Alto risco (indicação cirúrgica)'
  }

  // ========================================
  // COMPONENTE: HERO SECTION
  // ========================================
  const renderHeroSection = () => (
    <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-xl shadow-lg border border-red-100 p-8 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-100 rounded-xl">
              <Stethoscope className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apendicite Aguda</h1>
              <p className="text-lg text-gray-600 mt-1">
                WSES Jerusalem Guidelines 2020 - Diagnóstico e Manejo
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="default" className="bg-red-600 hover:bg-red-700">
              <Award className="h-3 w-3 mr-1" />
              WSES Guidelines 2020
            </Badge>
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              Atualizado em 2020
            </Badge>
            <Badge variant="outline" className="border-blue-300 text-blue-700">
              <Users className="h-3 w-3 mr-1" />
              Para estudantes e residentes
            </Badge>
            <Badge variant="outline" className="border-green-300 text-green-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              Consulta rápida
            </Badge>
            <Badge variant="outline" className="border-purple-300 text-purple-700">
              <BookOpen className="h-3 w-3 mr-1" />
              Baseado em evidências
            </Badge>
          </div>
        </div>

        {/* Indicador de Etapa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Etapa Atual</div>
            <div className="text-4xl font-bold text-red-600">{state.etapaAtual}/8</div>
            <div className="text-xs text-gray-600 mt-1">
              {state.etapaAtual === 1 && 'Apresentação Clínica'}
              {state.etapaAtual === 2 && 'Scores Diagnósticos'}
              {state.etapaAtual === 3 && 'Exames de Imagem'}
              {state.etapaAtual === 4 && 'Classificação'}
              {state.etapaAtual === 5 && 'Avaliação Inicial'}
              {state.etapaAtual === 6 && 'Tratamento Específico'}
              {state.etapaAtual === 7 && 'Particularidades Clínicas'}
              {state.etapaAtual === 8 && 'Particularidades Cirúrgicas'}
            </div>
          </div>
        </div>
      </div>

      {/* Alertas de Validação Crítica */}
      {validationResult.criticalErrors.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>🚨 Erros Críticos Detectados</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {validationResult.criticalErrors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Barra de Progresso */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progresso</span>
          <span className="text-sm text-gray-500">{Math.round((state.etapaAtual / 8) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(state.etapaAtual / 8) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={state.etapaAtual >= 1 ? 'text-red-600 font-medium' : ''}>Clínica</span>
          <span className={state.etapaAtual >= 2 ? 'text-red-600 font-medium' : ''}>Scores</span>
          <span className={state.etapaAtual >= 3 ? 'text-red-600 font-medium' : ''}>Imagem</span>
          <span className={state.etapaAtual >= 4 ? 'text-red-600 font-medium' : ''}>Classif.</span>
          <span className={state.etapaAtual >= 5 ? 'text-red-600 font-medium' : ''}>Aval. Inic.</span>
          <span className={state.etapaAtual >= 6 ? 'text-red-600 font-medium' : ''}>Tratamento</span>
          <span className={state.etapaAtual >= 7 ? 'text-red-600 font-medium' : ''}>Part. Clín.</span>
          <span className={state.etapaAtual >= 8 ? 'text-red-600 font-medium' : ''}>Part. Cirúrg.</span>
        </div>
      </div>
    </div>
  )

  // ========================================
  // COMPONENTE: SELETOR DE POPULAÇÃO
  // ========================================
  const renderPopulationSelector = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-900">População</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => setState(prev => ({ ...prev, populacao: 'adulto' }))}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            state.populacao === 'adulto'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
          }`}
        >
          <PersonStanding className="h-5 w-5" />
          <span className="text-xs font-medium">Adulto</span>
        </button>

        <button
          onClick={() => setState(prev => ({ ...prev, populacao: 'pediatria' }))}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            state.populacao === 'pediatria'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
          }`}
        >
          <Baby className="h-5 w-5" />
          <span className="text-xs font-medium">Pediatria</span>
          <span className="text-[10px] text-gray-500">(1-16 anos)</span>
        </button>

        <button
          onClick={() => setState(prev => ({ ...prev, populacao: 'gestacao' }))}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            state.populacao === 'gestacao'
              ? 'border-pink-500 bg-pink-50 text-pink-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
          }`}
        >
          <Heart className="h-5 w-5" />
          <span className="text-xs font-medium">Gestação</span>
        </button>

        <button
          onClick={() => setState(prev => ({ ...prev, populacao: 'idoso' }))}
          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
            state.populacao === 'idoso'
              ? 'border-purple-500 bg-purple-50 text-purple-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-600'
          }`}
        >
          <Shield className="h-5 w-5" />
          <span className="text-xs font-medium">Idosos</span>
          <span className="text-[10px] text-gray-500">(&gt;65 anos)</span>
        </button>
      </div>

      {/* Alertas específicos por população */}
      {state.populacao === 'pediatria' && (
        <Alert className="mt-3 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-800">
            <strong>Pediatria:</strong> Usar PAS (Pediatric Appendicitis Score). US como 1ª linha. RNM preferível a TC se US inconclusivo.
          </AlertDescription>
        </Alert>
      )}

      {state.populacao === 'gestacao' && (
        <Alert className="mt-3 border-pink-200 bg-pink-50">
          <AlertCircle className="h-4 w-4 text-pink-600" />
          <AlertDescription className="text-xs text-pink-800">
            <strong>Gestação:</strong> Cirurgia segura em qualquer trimestre. US 1ª linha → RNM se inconclusivo. EVITAR TC!
          </AlertDescription>
        </Alert>
      )}

      {state.populacao === 'idoso' && (
        <Alert className="mt-3 border-purple-200 bg-purple-50">
          <AlertTriangle className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-xs text-purple-800">
            <strong>Idosos:</strong> Apresentação atípica comum. Taxa de perfuração 40-70%. Não retardar cirurgia!
          </AlertDescription>
        </Alert>
      )}
    </div>
  )

  // ========================================
  // COMPONENTE: ETAPA 1 - APRESENTAÇÃO CLÍNICA E EXAME FÍSICO
  // ========================================
  const renderEtapa1 = () => (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Stethoscope className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg text-blue-800">Apresentação Clínica e Exame Físico</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4">
            Esta etapa documenta a apresentação clínica inicial do paciente.
            Prossiga para a próxima etapa para calcular os scores diagnósticos.
          </p>

          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-xs text-blue-800">
              <strong>Nota:</strong> Os achados clínicos e de exame físico serão documentados nos scores diagnósticos na próxima etapa.
              Esta seção serve como introdução ao processo diagnóstico.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )

  // ========================================
  // COMPONENTE: ETAPA 2 - SCORES DIAGNÓSTICOS
  // ========================================
  const renderEtapa2 = () => (
    <div className="space-y-6">

      {/* SEÇÃO EXPLICATIVA SOBRE SCORES DIAGNÓSTICOS */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg text-blue-800">📊 Scores Diagnósticos Disponíveis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-blue-700">
              O WSES Guidelines 2020 sugere que <strong>QUALQUER</strong> dos scores abaixo pode ser utilizado. 
              A escolha depende de:
            </p>
            
            <ul className="text-sm text-blue-700 space-y-1 ml-4">
              <li>• Familiaridade do profissional</li>
              <li>• Disponibilidade de exames (PCR para AIR e AAS)</li>
              <li>• Prática local</li>
            </ul>

            <div className="bg-blue-100 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Nota:</strong> Estudos sugerem que AIR e AAS podem ter acurácia ligeiramente 
                superior ao Alvarado, mas as diferenças são pequenas e não clinicamente significativas.
              </p>
            </div>

            <p className="text-sm text-blue-700 font-medium">
              Escolha <strong>UM ou MAIS</strong> scores para calcular:
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SCORE DE ALVARADO - Apenas para Adultos */}
      {state.populacao !== 'pediatria' && (
        <Card>
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('alvarado')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Score de Alvarado</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      WSES: Weak/Low
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Pontuação: <span className="font-bold text-blue-600">{state.scoreAlvarado}/10</span>
                    {' - '}
                    <span className="text-gray-700">{state.alvaradoResultado}</span>
                  </p>
                </div>
              </div>
              {expandedSections.alvarado ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>

          {expandedSections.alvarado && (
            <CardContent className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800">
                  <strong>WSES Recomendação (Página 4):</strong> Weak recommendation, Low quality evidence.
                  O Score de Alvarado tem sensibilidade moderada e especificidade limitada.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                {/* Sintomas - 1 ponto cada */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">SINTOMAS (1 ponto cada)</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoDorMigratoria"
                        checked={state.alvaradoDorMigratoria}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoDorMigratoria: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoDorMigratoria" className="text-sm cursor-pointer">
                        Dor migratória para FID (1pt)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoAnorexia"
                        checked={state.alvaradoAnorexia}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoAnorexia: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoAnorexia" className="text-sm cursor-pointer">
                        Anorexia (1pt)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoNauseasVomitos"
                        checked={state.alvaradoNauseasVomitos}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoNauseasVomitos: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoNauseasVomitos" className="text-sm cursor-pointer">
                        Náuseas/Vômitos (1pt)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Sinais - 2 pontos cada */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">SINAIS (2 pontos cada)</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoDorFID"
                        checked={state.alvaradoDorFID}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoDorFID: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoDorFID" className="text-sm cursor-pointer">
                        Dor em FID (2pts)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoSinalBlumberg"
                        checked={state.alvaradoSinalBlumberg}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoSinalBlumberg: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoSinalBlumberg" className="text-sm cursor-pointer">
                        Sinal de Blumberg positivo (2pts)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoFebre"
                        checked={state.alvaradoFebre}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoFebre: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoFebre" className="text-sm cursor-pointer">
                        Febre ≥37.3°C (1pt)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Laboratório */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">LABORATÓRIO</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoLeucocitose"
                        checked={state.alvaradoLeucocitose}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoLeucocitose: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoLeucocitose" className="text-sm cursor-pointer">
                        Leucocitose &gt;10.000/mm³ (2pts)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alvaradoDesvioEsquerda"
                        checked={state.alvaradoDesvioEsquerda}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, alvaradoDesvioEsquerda: checked as boolean }))
                        }
                      />
                      <Label htmlFor="alvaradoDesvioEsquerda" className="text-sm cursor-pointer">
                        Desvio à esquerda (&gt;75% neutrófilos) (1pt)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Resultado */}
                <div className={`rounded-lg p-4 ${
                  state.scoreAlvarado >= 9 ? 'bg-red-100 border border-red-300' :
                  state.scoreAlvarado >= 7 ? 'bg-orange-100 border border-orange-300' :
                  state.scoreAlvarado >= 5 ? 'bg-yellow-100 border border-yellow-300' :
                  'bg-green-100 border border-green-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5" />
                    <span className="font-bold text-lg">
                      Score: {state.scoreAlvarado}/10
                    </span>
                  </div>
                  <p className="text-sm">
                    <strong>Interpretação:</strong> {state.alvaradoResultado}
                  </p>
                  <div className="mt-2 text-xs text-gray-700">
                    <p>≤4: Apendicite improvável</p>
                    <p>5-6: Apendicite possível (solicitar imagem)</p>
                    <p>7-8: Apendicite provável</p>
                    <p>9-10: Apendicite muito provável</p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* SCORE AIR - Apenas para Adultos */}
      {state.populacao !== 'pediatria' && (
        <Card>
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('air')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Score AIR (Appendicitis Inflammatory Response)</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      WSES: Weak/Low
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Pontuação: <span className="font-bold text-purple-600">{state.scoreAIR}/12</span>
                    {' - '}
                    <span className="text-gray-700">{state.airResultado}</span>
                  </p>
                </div>
              </div>
              {expandedSections.air ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>

          {expandedSections.air && (
            <CardContent className="space-y-4">

              <Alert className="border-purple-200 bg-purple-50">
                <Info className="h-4 w-4 text-purple-600" />
                <AlertDescription className="text-xs text-purple-800">
                  <strong>WSES Recomendação (Página 5):</strong> Weak recommendation, Low quality evidence.
                  O Score AIR incorpora marcadores inflamatórios (PCR) e pode ser mais acurado que Alvarado.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                {/* Sintomas */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">SINTOMAS E SINAIS</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airVomitos"
                        checked={state.airVomitos}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, airVomitos: checked as boolean }))
                        }
                      />
                      <Label htmlFor="airVomitos" className="text-sm cursor-pointer">
                        Vômitos (1pt)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airDorFID"
                        checked={state.airDorFID}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, airDorFID: checked as boolean }))
                        }
                      />
                      <Label htmlFor="airDorFID" className="text-sm cursor-pointer">
                        Dor em FID (1pt)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Descompressão - Radio buttons */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">
                    DOR À DESCOMPRESSÃO (escolha uma opção)
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airDescompressaoLeve"
                        checked={state.airDescompressaoLeve}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setState(prev => ({
                              ...prev,
                              airDescompressaoLeve: true,
                              airDescompressaoModerada: false,
                              airDescompressaoIntensa: false
                            }))
                          } else {
                            setState(prev => ({ ...prev, airDescompressaoLeve: false }))
                          }
                        }}
                      />
                      <Label htmlFor="airDescompressaoLeve" className="text-sm cursor-pointer">
                        Leve (1pt)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airDescompressaoModerada"
                        checked={state.airDescompressaoModerada}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setState(prev => ({
                              ...prev,
                              airDescompressaoLeve: false,
                              airDescompressaoModerada: true,
                              airDescompressaoIntensa: false
                            }))
                          } else {
                            setState(prev => ({ ...prev, airDescompressaoModerada: false }))
                          }
                        }}
                      />
                      <Label htmlFor="airDescompressaoModerada" className="text-sm cursor-pointer">
                        Moderada (2pts)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airDescompressaoIntensa"
                        checked={state.airDescompressaoIntensa}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setState(prev => ({
                              ...prev,
                              airDescompressaoLeve: false,
                              airDescompressaoModerada: false,
                              airDescompressaoIntensa: true
                            }))
                          } else {
                            setState(prev => ({ ...prev, airDescompressaoIntensa: false }))
                          }
                        }}
                      />
                      <Label htmlFor="airDescompressaoIntensa" className="text-sm cursor-pointer">
                        Intensa (3pts)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Temperatura */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-gray-600" />
                    TEMPERATURA (°C)
                  </h5>
                  <div className="space-y-2">
                    <Label htmlFor="airTemperatura" className="text-xs text-gray-600">
                      Informe a temperatura
                    </Label>
                    <Input
                      id="airTemperatura"
                      type="number"
                      step="0.1"
                      value={state.airTemperatura}
                      onChange={(e) =>
                        setState(prev => ({ ...prev, airTemperatura: parseFloat(e.target.value) || 0 }))
                      }
                      className="max-w-[150px]"
                    />
                    <p className="text-xs text-gray-600">
                      ≥38.5°C = 1 ponto
                    </p>
                  </div>
                </div>

                {/* Leucócitos */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">
                    LEUCÓCITOS (x10³/mm³)
                  </h5>
                  <div className="space-y-2">
                    <Label htmlFor="airLeucocitos" className="text-xs text-gray-600">
                      Informe a contagem de leucócitos
                    </Label>
                    <Input
                      id="airLeucocitos"
                      type="number"
                      step="0.1"
                      value={state.airLeucocitos}
                      onChange={(e) =>
                        setState(prev => ({ ...prev, airLeucocitos: parseFloat(e.target.value) || 0 }))
                      }
                      className="max-w-[150px]"
                    />
                    <p className="text-xs text-gray-600">
                      10-14.9 = 1pt | ≥15 = 2pts
                    </p>
                  </div>
                </div>

                {/* Neutrófilos */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Microscope className="h-4 w-4 text-gray-600" />
                    NEUTRÓFILOS (%)
                  </h5>
                  <div className="space-y-2">
                    <Label htmlFor="airNeutrofilos" className="text-xs text-gray-600">
                      Informe a porcentagem de neutrófilos
                    </Label>
                    <Input
                      id="airNeutrofilos"
                      type="number"
                      step="0.1"
                      value={state.airNeutrofilos}
                      onChange={(e) =>
                        setState(prev => ({ ...prev, airNeutrofilos: parseFloat(e.target.value) || 0 }))
                      }
                      className="max-w-[150px]"
                    />
                    <p className="text-xs text-gray-600">
                      70-84% = 1pt | ≥85% = 2pts
                    </p>
                  </div>
                </div>

                {/* PCR */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">
                    PROTEÍNA C REATIVA (mg/L)
                  </h5>
                  <div className="space-y-2">
                    <Label htmlFor="airPCR" className="text-xs text-gray-600">
                      Informe o valor da PCR
                    </Label>
                    <Input
                      id="airPCR"
                      type="number"
                      step="0.1"
                      value={state.airPCR}
                      onChange={(e) =>
                        setState(prev => ({ ...prev, airPCR: parseFloat(e.target.value) || 0 }))
                      }
                      className="max-w-[150px]"
                    />
                    <p className="text-xs text-gray-600">
                      10-49 mg/L = 1pt | ≥50 mg/L = 2pts
                    </p>
                  </div>
                </div>

                {/* Resultado */}
                <div className={`rounded-lg p-4 ${
                  state.scoreAIR >= 9 ? 'bg-red-100 border border-red-300' :
                  state.scoreAIR >= 5 ? 'bg-orange-100 border border-orange-300' :
                  'bg-green-100 border border-green-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5" />
                    <span className="font-bold text-lg">
                      Score AIR: {state.scoreAIR}/12
                    </span>
                  </div>
                  <p className="text-sm">
                    <strong>Interpretação:</strong> {state.airResultado}
                  </p>
                  <div className="mt-2 text-xs text-gray-700">
                    <p>0-4: Baixa probabilidade</p>
                    <p>5-8: Probabilidade intermediária (imagem recomendada)</p>
                    <p>9-12: Alta probabilidade</p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* SCORE AAS - Apenas para Adultos */}
      {state.populacao !== 'pediatria' && (
        <Card>
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('aas')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Score AAS (Adult Appendicitis Score)</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Pontuação: <span className="font-bold text-green-600">{state.scoreAAS}/16</span>
                    {' - '}
                    <span className="text-gray-700">{state.aasResultado}</span>
                  </p>
                </div>
              </div>
              {expandedSections.aas ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>

          {expandedSections.aas && (
            <CardContent className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <Info className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-xs text-green-800">
                  O Score AAS é validado para adultos conforme tabela oficial. Pontuação: 0-10 (baixa), 11-15 (média), 16+ (alta probabilidade).
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                {/* Sintomas e Achados Clínicos */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">SINTOMAS E ACHADOS CLÍNICOS</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aasDorFID"
                        checked={state.aasDorFID}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, aasDorFID: checked as boolean }))
                        }
                      />
                      <Label htmlFor="aasDorFID" className="text-sm cursor-pointer">
                        1. Dor em FID - 2 pontos
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aasMigracaoDor"
                        checked={state.aasMigracaoDor}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, aasMigracaoDor: checked as boolean }))
                        }
                      />
                      <Label htmlFor="aasMigracaoDor" className="text-sm cursor-pointer">
                        2. Migração da dor - 2 pontos
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Defesa Muscular */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">DEFESA MUSCULAR (GUARDING)</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aasDefesaLeve"
                        checked={state.aasDefesaLeve}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, aasDefesaLeve: checked as boolean }))
                        }
                      />
                      <Label htmlFor="aasDefesaLeve" className="text-sm cursor-pointer">
                        3. Defesa Leve - 2 pontos
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aasDefesaModeradaGrave"
                        checked={state.aasDefesaModeradaGrave}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, aasDefesaModeradaGrave: checked as boolean }))
                        }
                      />
                      <Label htmlFor="aasDefesaModeradaGrave" className="text-sm cursor-pointer">
                        3. Defesa Moderada ou Grave - 4 pontos
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Dados Demográficos */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">DADOS DEMOGRÁFICOS</h5>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="aasSexoMasculino"
                          checked={state.aasSexoMasculino}
                          onCheckedChange={(checked) =>
                            setState(prev => ({ ...prev, aasSexoMasculino: checked as boolean, aasSexoFeminino: checked ? false : prev.aasSexoFeminino }))
                          }
                        />
                        <Label htmlFor="aasSexoMasculino" className="text-sm cursor-pointer">
                          4. Sexo masculino - 3 pontos
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="aasSexoFeminino"
                          checked={state.aasSexoFeminino}
                          onCheckedChange={(checked) =>
                            setState(prev => ({ ...prev, aasSexoFeminino: checked as boolean, aasSexoMasculino: checked ? false : prev.aasSexoMasculino }))
                          }
                        />
                        <Label htmlFor="aasSexoFeminino" className="text-sm cursor-pointer">
                          4. Sexo feminino
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="aasIdade" className="text-xs text-gray-600">
                        Idade (anos)
                      </Label>
                      <Input
                        id="aasIdade"
                        type="number"
                        value={state.aasIdade}
                        onChange={(e) =>
                          setState(prev => ({ ...prev, aasIdade: parseInt(e.target.value) || 0 }))
                        }
                        className="max-w-[100px] mt-1"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Sexo feminino: 16-49 anos = 1 ponto | ≥50 anos = 3 pontos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exames Laboratoriais */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">EXAMES LABORATORIAIS</h5>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="aasLeucocitos" className="text-xs text-gray-600">
                        5. Contagem de Leucócitos (×10⁹/L)
                      </Label>
                      <Input
                        id="aasLeucocitos"
                        type="number"
                        step="0.1"
                        value={state.aasLeucocitos}
                        onChange={(e) =>
                          setState(prev => ({ ...prev, aasLeucocitos: parseFloat(e.target.value) || 0 }))
                        }
                        className="max-w-[150px] mt-1"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        ≥7,2 e &lt;10,9 → 1 ponto | ≥10,9 e &lt;14,0 → 2 pontos | ≥14,0 → 3 pontos
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="aasNeutrofilos" className="text-xs text-gray-600">
                        6. Proporção de Neutrófilos (%)
                      </Label>
                      <Input
                        id="aasNeutrofilos"
                        type="number"
                        step="0.1"
                        value={state.aasNeutrofilos}
                        onChange={(e) =>
                          setState(prev => ({ ...prev, aasNeutrofilos: parseFloat(e.target.value) || 0 }))
                        }
                        className="max-w-[150px] mt-1"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        ≥62% e &lt;75% → 2 pontos | ≥75% e &lt;83% → 3 pontos | ≥83% → 4 pontos
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="aasPCR" className="text-xs text-gray-600">
                        7/8. Proteína C-Reativa (PCR) - mg/L
                      </Label>
                      <Input
                        id="aasPCR"
                        type="number"
                        step="0.1"
                        value={state.aasPCR}
                        onChange={(e) =>
                          setState(prev => ({ ...prev, aasPCR: parseFloat(e.target.value) || 0 }))
                        }
                        className="max-w-[150px] mt-1"
                      />
                      
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="aasPCRMenos24h"
                            checked={state.aasPCRMenos24h}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, aasPCRMenos24h: checked as boolean }))
                            }
                          />
                          <Label htmlFor="aasPCRMenos24h" className="text-xs cursor-pointer">
                            7. PCR - Se sintomas &lt;24h
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="aasPCRMais24h"
                            checked={state.aasPCRMais24h}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, aasPCRMais24h: checked as boolean }))
                            }
                          />
                          <Label htmlFor="aasPCRMais24h" className="text-xs cursor-pointer">
                            8. PCR - Se sintomas ≥24h
                          </Label>
                        </div>
                      </div>
                      
                      {state.aasPCRMenos24h && (
                        <p className="text-xs text-gray-600 mt-1">
                          &lt;24h: ≥4 e &lt;11 → 2pts | ≥11 e &lt;25 → 3pts | ≥25 e &lt;83 → 5pts | ≥83 → 1pt
                        </p>
                      )}
                      {state.aasPCRMais24h && (
                        <p className="text-xs text-gray-600 mt-1">
                          ≥24h: ≥12 e &lt;53 → 2pts | ≥53 e &lt;152 → 2pts | ≥152 → 1pt
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Resultado */}
                <div className={`rounded-lg p-4 ${
                  state.scoreAAS >= 16 ? 'bg-red-100 border border-red-300' :
                  state.scoreAAS >= 11 ? 'bg-orange-100 border border-orange-300' :
                  'bg-green-100 border border-green-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5" />
                    <span className="font-bold text-lg">
                      Score AAS: {state.scoreAAS}
                    </span>
                  </div>
                  <p className="text-sm">
                    <strong>Interpretação:</strong> {state.aasResultado}
                  </p>
                  <div className="mt-2 text-xs text-gray-700">
                    <p><strong>0-10 pontos:</strong> Baixa probabilidade</p>
                    <p><strong>11-15 pontos:</strong> Probabilidade intermediária</p>
                    <p><strong>≥16 pontos:</strong> Alta probabilidade</p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* SCORE PAS - Apenas para Pediatria */}
      {state.populacao === 'pediatria' && (
        <Card>
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('pas')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Baby className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Score PAS (Pediatric Appendicitis Score)</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      WSES: Weak/Moderate
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Pontuação: <span className="font-bold text-blue-600">{state.scorePAS}/10</span>
                    {' - '}
                    <span className="text-gray-700">{state.pasResultado}</span>
                  </p>
                </div>
              </div>
              {expandedSections.pas ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>

          {expandedSections.pas && (
            <CardContent className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs text-blue-800">
                  <strong>WSES Pediatria:</strong> PAS é o score recomendado para crianças.
                  US como 1ª linha de imagem. RNM preferível a TC se US inconclusivo.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasFebre"
                      checked={state.pasFebre}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasFebre: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasFebre" className="text-sm cursor-pointer">
                      Febre ≥38°C (1pt)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasAnorexia"
                      checked={state.pasAnorexia}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasAnorexia: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasAnorexia" className="text-sm cursor-pointer">
                      Anorexia (1pt)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasNauseasVomitos"
                      checked={state.pasNauseasVomitos}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasNauseasVomitos: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasNauseasVomitos" className="text-sm cursor-pointer">
                      Náuseas/Vômitos (1pt)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasDorMigratoria"
                      checked={state.pasDorMigratoria}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasDorMigratoria: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasDorMigratoria" className="text-sm cursor-pointer">
                      Dor migratória para FID (1pt)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasSensibilidadeFID"
                      checked={state.pasSensibilidadeFID}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasSensibilidadeFID: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasSensibilidadeFID" className="text-sm cursor-pointer">
                      Sensibilidade em FID (2pts)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasDorTossePuloPercussao"
                      checked={state.pasDorTossePuloPercussao}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasDorTossePuloPercussao: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasDorTossePuloPercussao" className="text-sm cursor-pointer">
                      Dor com tosse/pulo/percussão (2pts)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasLeucocitose"
                      checked={state.pasLeucocitose}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasLeucocitose: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasLeucocitose" className="text-sm cursor-pointer">
                      Leucocitose (1pt)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pasNeutrofilia"
                      checked={state.pasNeutrofilia}
                      onCheckedChange={(checked) =>
                        setState(prev => ({ ...prev, pasNeutrofilia: checked as boolean }))
                      }
                    />
                    <Label htmlFor="pasNeutrofilia" className="text-sm cursor-pointer">
                      Neutrofilia (1pt)
                    </Label>
                  </div>
                </div>

                {/* Resultado */}
                <div className={`rounded-lg p-4 ${
                  state.scorePAS >= 7 ? 'bg-red-100 border border-red-300' :
                  state.scorePAS >= 4 ? 'bg-orange-100 border border-orange-300' :
                  'bg-green-100 border border-green-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5" />
                    <span className="font-bold text-lg">
                      Score PAS: {state.scorePAS}/10
                    </span>
                  </div>
                  <p className="text-sm">
                    <strong>Interpretação:</strong> {state.pasResultado}
                  </p>
                  <div className="mt-2 text-xs text-gray-700">
                    <p>0-3: Baixo risco</p>
                    <p>4-6: Risco intermediário (solicitar US)</p>
                    <p>7-10: Alto risco (indicação cirúrgica)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* NECESSIDADE DE EXAME DE IMAGEM */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('necessidadeImagem')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Scan className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Necessidade de Exame de Imagem</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Recomendação WSES baseada nos Scores Diagnósticos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {state.imagemRecomendada && (
                <Badge className="bg-orange-600 text-xs">Imagem Recomendada</Badge>
              )}
              {expandedSections.necessidadeImagem ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </CardHeader>
        
        {expandedSections.necessidadeImagem && (
          <CardContent className="space-y-4">
            {/* Recomendação baseada nos Scores Diagnósticos */}
            <div className="space-y-4">
              {/* Probabilidade Baixa */}
              {((state.scoreAlvarado > 0 && state.scoreAlvarado <= 4) ||
                (state.scoreAIR > 0 && state.scoreAIR <= 4) ||
                (state.scoreAAS > 0 && state.scoreAAS <= 10) ||
                (state.scorePAS > 0 && state.scorePAS <= 3)) && 
               !((state.scoreAlvarado >= 5) || (state.scoreAIR >= 5) || (state.scoreAAS >= 11) || (state.scorePAS >= 4)) && (
                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Baixa Probabilidade</AlertTitle>
                  <AlertDescription className="text-green-700">
                    <strong>Sugerimos que imagem pode ser omitida</strong> (Weak recommendation, Low quality of evidence)
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Scores que indicam baixa probabilidade:</p>
                      <ul className="mt-1 space-y-1">
                        {state.scoreAlvarado > 0 && state.scoreAlvarado <= 4 && <li>• Alvarado: {state.scoreAlvarado} ≤4 pontos</li>}
                        {state.scoreAIR > 0 && state.scoreAIR <= 4 && <li>• AIR: {state.scoreAIR} ≤4 pontos</li>}
                        {state.scoreAAS > 0 && state.scoreAAS <= 10 && <li>• AAS: {state.scoreAAS} ≤10 pontos</li>}
                        {state.scorePAS > 0 && state.scorePAS <= 3 && <li>• PAS: {state.scorePAS} ≤3 pontos</li>}
                      </ul>
                      <p className="mt-2 font-medium">Conduta:</p>
                      <ul className="mt-1 space-y-1">
                        <li>• Paciente pode ter alta</li>
                        <li>• Considerar diagnósticos alternativos</li>
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Probabilidade Intermediária */}
              {((state.scoreAlvarado >= 5 && state.scoreAlvarado <= 6) ||
                (state.scoreAIR >= 5 && state.scoreAIR <= 8) ||
                (state.scoreAAS >= 11 && state.scoreAAS <= 15) ||
                (state.scorePAS >= 4 && state.scorePAS <= 6)) && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertTitle className="text-orange-800">Probabilidade Intermediária</AlertTitle>
                  <AlertDescription className="text-orange-700">
                    <strong>Recomendamos exame de imagem para confirmar ou excluir diagnóstico</strong> (Strong recommendation, Moderate quality of evidence)
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Scores que indicam probabilidade intermediária:</p>
                      <ul className="mt-1 space-y-1">
                        {state.scoreAlvarado >= 5 && state.scoreAlvarado <= 6 && <li>• Alvarado: {state.scoreAlvarado} (5-6 pontos)</li>}
                        {state.scoreAIR >= 5 && state.scoreAIR <= 8 && <li>• AIR: {state.scoreAIR} (5-8 pontos)</li>}
                        {state.scoreAAS >= 11 && state.scoreAAS <= 15 && <li>• AAS: {state.scoreAAS} (11-15 pontos)</li>}
                        {state.scorePAS >= 4 && state.scorePAS <= 6 && <li>• PAS: {state.scorePAS} (4-6 pontos)</li>}
                      </ul>
                      <p className="mt-2 font-medium">Conduta:</p>
                      <ul className="mt-1 space-y-1">
                        <li>• Imagem é <strong>OBRIGATÓRIA</strong></li>
                        <li>• US como primeira linha</li>
                        <li>• TC se US inconclusivo</li>
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Probabilidade Alta */}
              {((state.scoreAlvarado >= 7) ||
                (state.scoreAIR >= 9) ||
                (state.scoreAAS >= 16) ||
                (state.scorePAS >= 7)) && 
               !((state.scoreAlvarado >= 5 && state.scoreAlvarado <= 6) ||
                 (state.scoreAIR >= 5 && state.scoreAIR <= 8) ||
                 (state.scoreAAS >= 11 && state.scoreAAS <= 15) ||
                 (state.scorePAS >= 4 && state.scorePAS <= 6)) && (
                <div className="space-y-4">
                  {/* Alerta especial para pediatria */}
                  {(state.scorePAS >= 7 || state.crianca) && (
                    <Alert className="border-purple-200 bg-purple-50">
                      <Baby className="h-4 w-4 text-purple-600" />
                      <AlertTitle className="text-purple-800">⚠️ ATENÇÃO - PEDIATRIA</AlertTitle>
                      <AlertDescription className="text-purple-700">
                        <strong>Em crianças, imagem (US) é RECOMENDADA mesmo com score alto</strong> devido a:
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Maior taxa de apresentações atípicas</li>
                          <li>• Necessidade de evitar apendicectomia negativa</li>
                          <li>• Possibilidade de diagnósticos alternativos (adenite mesentérica, ileíte)</li>
                        </ul>
                        <p className="mt-2 font-medium">Recomendação: Solicitar US em TODAS as crianças com suspeita de apendicite.</p>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Alta Probabilidade</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      <div className="text-sm">
                        <p className="font-medium">Scores que indicam alta probabilidade:</p>
                        <ul className="mt-1 space-y-1">
                          {state.scoreAlvarado >= 7 && <li>• Alvarado: {state.scoreAlvarado} ≥7 pontos</li>}
                          {state.scoreAIR >= 9 && <li>• AIR: {state.scoreAIR} ≥9 pontos</li>}
                          {state.scoreAAS >= 16 && <li>• AAS: {state.scoreAAS} ≥16 pontos</li>}
                          {state.scorePAS >= 7 && <li>• PAS: {state.scorePAS} ≥7 pontos</li>}
                        </ul>
                        <p className="mt-2">
                          {(state.scorePAS >= 7 || state.crianca) ? (
                            <strong>Em pediatria: Imagem é RECOMENDADA mesmo com score alto.</strong>
                          ) : (
                            <>
                              A imagem pode ser omitida apenas em poucos casos selecionados de pacientes com apresentação típica, mas é recomendada se:
                            </>
                          )}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {/* Checkboxes para situações especiais - apenas para adultos */}
                  {!(state.scorePAS >= 7 || state.crianca) && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Marque se PRESENTE (qualquer item marcado = imagem recomendada):
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="apresentacaoAtipica"
                            checked={state.apresentacaoAtipica}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, apresentacaoAtipica: checked as boolean }))
                            }
                          />
                          <Label htmlFor="apresentacaoAtipica" className="text-sm cursor-pointer">
                            Apresentação atípica
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="incertezaDiagnostica"
                            checked={state.incertezaDiagnostica}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, incertezaDiagnostica: checked as boolean }))
                            }
                          />
                          <Label htmlFor="incertezaDiagnostica" className="text-sm cursor-pointer">
                            Incerteza diagnóstica
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="suspeitaComplicacao"
                            checked={state.suspeitaComplicacao}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, suspeitaComplicacao: checked as boolean }))
                            }
                          />
                          <Label htmlFor="suspeitaComplicacao" className="text-sm cursor-pointer">
                            Suspeita de complicação (abscesso, perfuração)
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="pacienteIdoso"
                            checked={state.pacienteIdoso}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, pacienteIdoso: checked as boolean }))
                            }
                          />
                          <Label htmlFor="pacienteIdoso" className="text-sm cursor-pointer">
                            Paciente idoso (&gt;65 anos)
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="gestante"
                            checked={state.gestante}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, gestante: checked as boolean }))
                            }
                          />
                          <Label htmlFor="gestante" className="text-sm cursor-pointer">
                            Gestante
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="crianca"
                            checked={state.crianca}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, crianca: checked as boolean }))
                            }
                          />
                          <Label htmlFor="crianca" className="text-sm cursor-pointer">
                            Criança
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interpretação */}
                  <div className={`rounded-lg p-4 ${
                    state.imagemRecomendada ? 'bg-orange-100 border border-orange-300' : 'bg-green-100 border border-green-300'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {state.imagemRecomendada ? (
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      <span className="font-bold">
                        {state.imagemRecomendada ? 'Solicitar exame de imagem' : 'Pode prosseguir para cirurgia sem imagem'}
                      </span>
                    </div>
                    <p className="text-sm">
                      {state.imagemRecomendada 
                        ? ((state.scorePAS >= 7 || state.crianca) 
                           ? 'Paciente pediátrico: imagem sempre recomendada.'
                           : 'Pelo menos uma situação especial foi identificada. Exame de imagem é recomendado.')
                        : 'Nenhuma situação especial identificada. Cirurgia pode ser realizada sem imagem prévia.'
                      }
                    </p>
                  </div>

                  {/* Botão de Navegação */}
                  <div className="mt-6 flex justify-center">
                    {state.imagemRecomendada ? (
                      <Button 
                        onClick={() => {
                          console.log('Botão "Prosseguir para Exames de Imagem" clicado!')
                          console.log('Estado atual imagemRecomendada:', state.imagemRecomendada)
                          setState(prevState => ({ ...prevState, etapaAtual: 3 }))
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                      >
                        <Scan className="h-5 w-5 mr-2" />
                        Prosseguir para Exames de Imagem
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setState(prevState => ({ ...prevState, etapaAtual: 4 }))}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                      >
                        <ArrowRight className="h-5 w-5 mr-2" />
                        Prosseguir para Tratamento
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>


    </div>
  );

  // ========================================
  // COMPONENTE: ETAPA 3 - EXAMES DE IMAGEM
  // ========================================
  const renderEtapa3 = () => (
    <div className="space-y-6">

      {/* EXAMES DE IMAGEM - Ultrassonografia */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('imagemUS')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Scan className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Ultrassonografia (US)</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    WSES: Strong/High (1ª linha)
                  </Badge>
                  {state.usgRealizado && (
                    <Badge className="bg-green-600 text-xs">Realizado</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Exame de 1ª linha - sem radiação
                </p>
              </div>
            </div>
            {expandedSections.imagemUS ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>

        {expandedSections.imagemUS && (
          <CardContent className="space-y-4">
            <Alert className="border-indigo-200 bg-indigo-50">
              <Info className="h-4 w-4 text-indigo-600" />
              <AlertDescription className="text-xs text-indigo-800">
                <strong>WSES Recomendação (Página 6):</strong> Strong recommendation, High quality evidence.
                US é o exame de 1ª linha, especialmente em crianças e gestantes. Operador-dependente.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usgRealizado"
                  checked={state.usgRealizado}
                  onCheckedChange={(checked) =>
                    setState(prev => ({ ...prev, usgRealizado: checked as boolean }))
                  }
                />
                <Label htmlFor="usgRealizado" className="text-sm cursor-pointer font-semibold">
                  US realizado
                </Label>
              </div>

              {state.usgRealizado && (
                <div className="ml-6 space-y-2 bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">ACHADOS (selecione todos que se aplicam)</h5>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usgApendiceVisualizado"
                      checked={state.usgAchados.includes('apendiceVisualizado')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, usgAchados: [...prev.usgAchados, 'apendiceVisualizado'] }))
                        } else {
                          setState(prev => ({ ...prev, usgAchados: prev.usgAchados.filter(a => a !== 'apendiceVisualizado') }))
                        }
                      }}
                    />
                    <Label htmlFor="usgApendiceVisualizado" className="text-sm cursor-pointer">
                      Apêndice visualizado
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usgDiametroAumentado"
                      checked={state.usgAchados.includes('diametroAumentado')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, usgAchados: [...prev.usgAchados, 'diametroAumentado'] }))
                        } else {
                          setState(prev => ({ ...prev, usgAchados: prev.usgAchados.filter(a => a !== 'diametroAumentado') }))
                        }
                      }}
                    />
                    <Label htmlFor="usgDiametroAumentado" className="text-sm cursor-pointer">
                      Diâmetro &gt;6mm
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usgParedeEspessada"
                      checked={state.usgAchados.includes('paredeEspessada')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, usgAchados: [...prev.usgAchados, 'paredeEspessada'] }))
                        } else {
                          setState(prev => ({ ...prev, usgAchados: prev.usgAchados.filter(a => a !== 'paredeEspessada') }))
                        }
                      }}
                    />
                    <Label htmlFor="usgParedeEspessada" className="text-sm cursor-pointer">
                      Parede espessada
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usgLiquidoPeriapendicular"
                      checked={state.usgAchados.includes('liquidoPeriapendicular')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, usgAchados: [...prev.usgAchados, 'liquidoPeriapendicular'] }))
                        } else {
                          setState(prev => ({ ...prev, usgAchados: prev.usgAchados.filter(a => a !== 'liquidoPeriapendicular') }))
                        }
                      }}
                    />
                    <Label htmlFor="usgLiquidoPeriapendicular" className="text-sm cursor-pointer">
                      Líquido periapendicular
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usgFecalito"
                      checked={state.usgAchados.includes('fecalito')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, usgAchados: [...prev.usgAchados, 'fecalito'] }))
                        } else {
                          setState(prev => ({ ...prev, usgAchados: prev.usgAchados.filter(a => a !== 'fecalito') }))
                        }
                      }}
                    />
                    <Label htmlFor="usgFecalito" className="text-sm cursor-pointer">
                      Fecalito/Apendicolito
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usgAbscesso"
                      checked={state.usgAchados.includes('abscesso')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, usgAchados: [...prev.usgAchados, 'abscesso'] }))
                        } else {
                          setState(prev => ({ ...prev, usgAchados: prev.usgAchados.filter(a => a !== 'abscesso') }))
                        }
                      }}
                    />
                    <Label htmlFor="usgAbscesso" className="text-sm cursor-pointer">
                      Abscesso periapendicular
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usgNormal"
                      checked={state.usgAchados.includes('normal')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, usgAchados: ['normal'] }))
                        } else {
                          setState(prev => ({ ...prev, usgAchados: [] }))
                        }
                      }}
                    />
                    <Label htmlFor="usgNormal" className="text-sm cursor-pointer">
                      Normal/Sem alterações
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* EXAMES DE IMAGEM - Tomografia */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('imagemTC')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Scan className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Tomografia Computadorizada (TC)</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    WSES: Strong/High
                  </Badge>
                  {state.tcRealizado && (
                    <Badge className="bg-green-600 text-xs">Realizado</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Alta acurácia - considerar radiação
                </p>
              </div>
            </div>
            {expandedSections.imagemTC ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>

        {expandedSections.imagemTC && (
          <CardContent className="space-y-4">
            {state.populacao === 'gestacao' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>⚠️ GESTAÇÃO:</strong> EVITAR TC! Preferir US → RNM se inconclusivo.
                </AlertDescription>
              </Alert>
            )}

            {state.populacao === 'pediatria' && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-xs text-yellow-800">
                  <strong>PEDIATRIA:</strong> Considerar radiação. Preferir US → RNM se inconclusivo.
                </AlertDescription>
              </Alert>
            )}

            <Alert className="border-orange-200 bg-orange-50">
              <Info className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-xs text-orange-800">
                <strong>WSES Recomendação (Página 7):</strong> Strong recommendation, High quality evidence.
                TC tem alta sensibilidade (94%) e especificidade (95%). Considerar dose de radiação.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tcRealizado"
                  checked={state.tcRealizado}
                  onCheckedChange={(checked) =>
                    setState(prev => ({ ...prev, tcRealizado: checked as boolean }))
                  }
                />
                <Label htmlFor="tcRealizado" className="text-sm cursor-pointer font-semibold">
                  TC realizado
                </Label>
              </div>

              {state.tcRealizado && (
                <div className="ml-6 space-y-2 bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">ACHADOS (selecione todos que se aplicam)</h5>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcApendiceVisualizado"
                      checked={state.tcAchados.includes('apendiceVisualizado')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: [...prev.tcAchados, 'apendiceVisualizado'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: prev.tcAchados.filter(a => a !== 'apendiceVisualizado') }))
                        }
                      }}
                    />
                    <Label htmlFor="tcApendiceVisualizado" className="text-sm cursor-pointer">
                      Apêndice visualizado
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcDilatacao"
                      checked={state.tcAchados.includes('dilatacao')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: [...prev.tcAchados, 'dilatacao'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: prev.tcAchados.filter(a => a !== 'dilatacao') }))
                        }
                      }}
                    />
                    <Label htmlFor="tcDilatacao" className="text-sm cursor-pointer">
                      Dilatação &gt;6mm
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcEspessamentoParietal"
                      checked={state.tcAchados.includes('espessamentoParietal')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: [...prev.tcAchados, 'espessamentoParietal'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: prev.tcAchados.filter(a => a !== 'espessamentoParietal') }))
                        }
                      }}
                    />
                    <Label htmlFor="tcEspessamentoParietal" className="text-sm cursor-pointer">
                      Espessamento parietal
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcFlegmao"
                      checked={state.tcAchados.includes('flegmao')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: [...prev.tcAchados, 'flegmao'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: prev.tcAchados.filter(a => a !== 'flegmao') }))
                        }
                      }}
                    />
                    <Label htmlFor="tcFlegmao" className="text-sm cursor-pointer">
                      Flegmão
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcAbscesso"
                      checked={state.tcAchados.includes('abscesso')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: [...prev.tcAchados, 'abscesso'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: prev.tcAchados.filter(a => a !== 'abscesso') }))
                        }
                      }}
                    />
                    <Label htmlFor="tcAbscesso" className="text-sm cursor-pointer">
                      Abscesso
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcPerfuracao"
                      checked={state.tcAchados.includes('perfuracao')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: [...prev.tcAchados, 'perfuracao'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: prev.tcAchados.filter(a => a !== 'perfuracao') }))
                        }
                      }}
                    />
                    <Label htmlFor="tcPerfuracao" className="text-sm cursor-pointer">
                      Perfuração
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcPneumoperitonio"
                      checked={state.tcAchados.includes('pneumoperitonio')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: [...prev.tcAchados, 'pneumoperitonio'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: prev.tcAchados.filter(a => a !== 'pneumoperitonio') }))
                        }
                      }}
                    />
                    <Label htmlFor="tcPneumoperitonio" className="text-sm cursor-pointer">
                      Pneumoperitônio
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tcNormal"
                      checked={state.tcAchados.includes('normal')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, tcAchados: ['normal'] }))
                        } else {
                          setState(prev => ({ ...prev, tcAchados: [] }))
                        }
                      }}
                    />
                    <Label htmlFor="tcNormal" className="text-sm cursor-pointer">
                      Normal/Sem alterações
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* EXAMES DE IMAGEM - Ressonância Magnética */}
      <Card>
        <CardHeader
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('imagemRM')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Scan className="h-5 w-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Ressonância Magnética (RM)</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    WSES: Weak/Moderate
                  </Badge>
                  {state.rmRealizado && (
                    <Badge className="bg-green-600 text-xs">Realizado</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Sem radiação - ideal para gestantes e crianças
                </p>
              </div>
            </div>
            {expandedSections.imagemRM ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>

        {expandedSections.imagemRM && (
          <CardContent className="space-y-4">
            {(state.populacao === 'gestacao' || state.populacao === 'pediatria') && (
              <Alert className="border-pink-200 bg-pink-50">
                <Heart className="h-4 w-4 text-pink-600" />
                <AlertDescription className="text-xs text-pink-800">
                  <strong>
                    {state.populacao === 'gestacao' ? 'GESTAÇÃO' : 'PEDIATRIA'}:
                  </strong> RM é preferível quando US inconclusivo. Sem radiação ionizante.
                </AlertDescription>
              </Alert>
            )}

            <Alert className="border-pink-200 bg-pink-50">
              <Info className="h-4 w-4 text-pink-600" />
              <AlertDescription className="text-xs text-pink-800">
                <strong>WSES Recomendação (Página 7-8):</strong> Weak recommendation, Moderate quality evidence.
                RM tem alta acurácia sem radiação. Limitação: disponibilidade e custo.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rmRealizado"
                  checked={state.rmRealizado}
                  onCheckedChange={(checked) =>
                    setState(prev => ({ ...prev, rmRealizado: checked as boolean }))
                  }
                />
                <Label htmlFor="rmRealizado" className="text-sm cursor-pointer font-semibold">
                  RM realizado
                </Label>
              </div>

              {state.rmRealizado && (
                <div className="ml-6 space-y-2 bg-gray-50 rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">ACHADOS (selecione todos que se aplicam)</h5>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rmApendiceVisualizado"
                      checked={state.rmAchados.includes('apendiceVisualizado')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, rmAchados: [...prev.rmAchados, 'apendiceVisualizado'] }))
                        } else {
                          setState(prev => ({ ...prev, rmAchados: prev.rmAchados.filter(a => a !== 'apendiceVisualizado') }))
                        }
                      }}
                    />
                    <Label htmlFor="rmApendiceVisualizado" className="text-sm cursor-pointer">
                      Apêndice visualizado
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rmDilatacao"
                      checked={state.rmAchados.includes('dilatacao')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, rmAchados: [...prev.rmAchados, 'dilatacao'] }))
                        } else {
                          setState(prev => ({ ...prev, rmAchados: prev.rmAchados.filter(a => a !== 'dilatacao') }))
                        }
                      }}
                    />
                    <Label htmlFor="rmDilatacao" className="text-sm cursor-pointer">
                      Dilatação &gt;7mm
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rmEdemaParede"
                      checked={state.rmAchados.includes('edemaParede')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, rmAchados: [...prev.rmAchados, 'edemaParede'] }))
                        } else {
                          setState(prev => ({ ...prev, rmAchados: prev.rmAchados.filter(a => a !== 'edemaParede') }))
                        }
                      }}
                    />
                    <Label htmlFor="rmEdemaParede" className="text-sm cursor-pointer">
                      Edema de parede
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rmLiquidoPeriapendicular"
                      checked={state.rmAchados.includes('liquidoPeriapendicular')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, rmAchados: [...prev.rmAchados, 'liquidoPeriapendicular'] }))
                        } else {
                          setState(prev => ({ ...prev, rmAchados: prev.rmAchados.filter(a => a !== 'liquidoPeriapendicular') }))
                        }
                      }}
                    />
                    <Label htmlFor="rmLiquidoPeriapendicular" className="text-sm cursor-pointer">
                      Líquido periapendicular
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rmAbscesso"
                      checked={state.rmAchados.includes('abscesso')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, rmAchados: [...prev.rmAchados, 'abscesso'] }))
                        } else {
                          setState(prev => ({ ...prev, rmAchados: prev.rmAchados.filter(a => a !== 'abscesso') }))
                        }
                      }}
                    />
                    <Label htmlFor="rmAbscesso" className="text-sm cursor-pointer">
                      Abscesso
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rmNormal"
                      checked={state.rmAchados.includes('normal')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setState(prev => ({ ...prev, rmAchados: ['normal'] }))
                        } else {
                          setState(prev => ({ ...prev, rmAchados: [] }))
                        }
                      }}
                    />
                    <Label htmlFor="rmNormal" className="text-sm cursor-pointer">
                      Normal/Sem alterações
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )

  // ========================================
  // COMPONENTE: ETAPA 4 - CLASSIFICAÇÃO
  // ========================================
  const renderEtapa4 = () => (
    <div className="space-y-6">
      {/* CLASSIFICAÇÃO DA APENDICITE */}
      <Card className="border-orange-200">
        <CardHeader className="bg-orange-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-orange-800">Classificação da Apendicite</CardTitle>
              <p className="text-sm text-orange-600 mt-1">
                Baseado nos achados clínicos e de imagem
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <Info className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-xs text-orange-800">
              <strong>WSES Guidelines:</strong> A classificação determina a estratégia terapêutica.
              Apendicite complicada requer abordagem mais agressiva.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="naoComplicada"
                name="classificacao"
                checked={state.classificacao === 'naoComplicada'}
                onChange={() => setState(prev => ({ ...prev, classificacao: 'naoComplicada' }))}
                className="h-4 w-4 text-green-600"
              />
              <Label htmlFor="naoComplicada" className="text-sm cursor-pointer font-semibold text-green-700">
                Apendicite Não Complicada
              </Label>
            </div>
            <div className="ml-6 text-xs text-gray-600">
              • Inflamação limitada ao apêndice<br/>
              • Sem perfuração, abscesso ou peritonite<br/>
              • Sinais vitais estáveis
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="complicada"
                name="classificacao"
                checked={state.classificacao === 'complicada'}
                onChange={() => setState(prev => ({ ...prev, classificacao: 'complicada' }))}
                className="h-4 w-4 text-red-600"
              />
              <Label htmlFor="complicada" className="text-sm cursor-pointer font-semibold text-red-700">
                Apendicite Complicada
              </Label>
            </div>
            <div className="ml-6 text-xs text-gray-600">
              • Perfuração apendicular<br/>
              • Abscesso intra-abdominal<br/>
              • Peritonite generalizada<br/>
              • Instabilidade hemodinâmica
            </div>
          </div>

          {state.classificacao && (
            <div className={`mt-4 p-3 rounded-lg border ${
              state.classificacao === 'naoComplicada'
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {state.classificacao === 'naoComplicada' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-semibold ${
                  state.classificacao === 'naoComplicada' ? 'text-green-800' : 'text-red-800'
                }`}>
                  Classificação: {state.classificacao === 'naoComplicada' ? 'Não Complicada' : 'Complicada'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  // ========================================
  // COMPONENTE: ETAPA 5 - AVALIAÇÃO INICIAL DA COMPLICAÇÃO (only if complicada)
  // ========================================
  const renderEtapa5 = () => (
    <div className="space-y-6">
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-red-800">Avaliação Inicial da Complicação</CardTitle>
              <p className="text-sm text-red-600 mt-1">
                Avaliar estabilidade hemodinâmica e caracterizar a complicação
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <Info className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-xs text-red-800">
              <strong>Importante:</strong> A avaliação de estabilidade hemodinâmica é o primeiro passo.
              Pacientes instáveis requerem cirurgia de urgência independente do tipo de complicação.
            </AlertDescription>
          </Alert>

          {/* AVALIAÇÃO DE ESTABILIDADE HEMODINÂMICA */}
          <Card className="border-gray-300">
            <CardHeader className="bg-gray-100">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-gray-700" />
                <CardTitle className="text-sm text-gray-800">1. Avaliar Estabilidade Hemodinâmica</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-300">
                  <Checkbox
                    id="pacienteEstavel"
                    checked={!state.sepse}
                    onCheckedChange={(checked) =>
                      setState(prev => ({ ...prev, sepse: !(checked as boolean) }))
                    }
                  />
                  <Label htmlFor="pacienteEstavel" className="text-sm cursor-pointer">
                    <strong>Paciente ESTÁVEL</strong> (sem sepse, sem peritonite difusa, hemodinamicamente estável)
                  </Label>
                </div>

                {state.sepse && (
                  <Alert variant="destructive" className="border-2">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="text-sm">🚨 PACIENTE INSTÁVEL</AlertTitle>
                    <AlertDescription className="text-xs mt-2">
                      <strong>Sinais de instabilidade:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Sepse ou choque séptico</li>
                        <li>Peritonite difusa</li>
                        <li>Hipotensão (PA sistólica &lt;90mmHg)</li>
                        <li>Taquicardia persistente (&gt;120bpm)</li>
                        <li>Confusão mental / alteração do nível de consciência</li>
                      </ul>
                      <p className="mt-2 font-bold text-red-700">
                        → CONDUTA: CIRURGIA DE URGÊNCIA independente do tamanho do abscesso!
                      </p>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* CARACTERIZAÇÃO DA COMPLICAÇÃO - APENAS SE ESTÁVEL */}
          {!state.sepse && (
            <Card className="border-purple-300">
              <CardHeader className="bg-purple-50">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-purple-700" />
                  <CardTitle className="text-sm text-purple-800">2. Caracterizar o Tipo de Complicação</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <Alert className="border-purple-200 bg-purple-50">
                    <Info className="h-4 w-4 text-purple-600" />
                    <AlertDescription className="text-xs text-purple-800">
                      Baseado nos achados de imagem (TC ou US), marque a(s) complicação(ões) presente(s):
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg border border-purple-300">
                      <Checkbox
                        id="abscessoPeriapendicular"
                        checked={state.abscessoPeriapendicular}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, abscessoPeriapendicular: checked as boolean }))
                        }
                      />
                      <Label htmlFor="abscessoPeriapendicular" className="text-sm cursor-pointer">
                        <strong>Abscesso periapendicular</strong> (coleção líquida drenável na TC/US)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-teal-50 rounded-lg border border-teal-300">
                      <Checkbox
                        id="fleimaoPeriapendicular"
                        checked={state.fleimaoPeriapendicular}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, fleimaoPeriapendicular: checked as boolean }))
                        }
                      />
                      <Label htmlFor="fleimaoPeriapendicular" className="text-sm cursor-pointer">
                        <strong>Fleimão periapendicular</strong> (massa inflamatória sólida, sem coleção drenável)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-300">
                      <Checkbox
                        id="apendicePerfurada"
                        checked={state.apendicePerfurada}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, apendicePerfurada: checked as boolean }))
                        }
                      />
                      <Label htmlFor="apendicePerfurada" className="text-sm cursor-pointer">
                        <strong>Apêndice perfurada</strong> (sem abscesso ou fleimão identificável)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-300">
                      <Checkbox
                        id="peritoniteDifusa"
                        checked={state.peritoniteDifusa}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, peritoniteDifusa: checked as boolean }))
                        }
                      />
                      <Label htmlFor="peritoniteDifusa" className="text-sm cursor-pointer">
                        <strong>Peritonite difusa</strong> (líquido livre difuso, sinais de irritação peritoneal generalizada)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-300">
                      <Checkbox
                        id="apendiceGangrenosa"
                        checked={state.apendiceGangrenosa}
                        onCheckedChange={(checked) =>
                          setState(prev => ({ ...prev, apendiceGangrenosa: checked as boolean }))
                        }
                      />
                      <Label htmlFor="apendiceGangrenosa" className="text-sm cursor-pointer">
                        <strong>Apêndice gangrenosa</strong> (sem perfuração visível)
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )

  // ========================================
  // COMPONENTE: ETAPA 6 - TRATAMENTO (UNIFICADO)
  // ========================================
  const renderEtapa6 = () => (
    <div className="space-y-6">
      {/* TRATAMENTO NÃO COMPLICADA */}
      {state.classificacao === 'naoComplicada' && (
        <>
          {/* TRATAMENTO NÃO COMPLICADA - CIRÚRGICO */}
          <Card className="border-green-200">
            <CardHeader
              className="cursor-pointer hover:bg-gray-50 transition-colors bg-green-50"
              onClick={() => toggleSection('cirurgico')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Syringe className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-md text-green-800">Tratamento Cirúrgico (1ª Linha)</CardTitle>
                      <Badge className="bg-green-600 text-xs">WSES: Strong/High</Badge>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Apendicectomia é o tratamento padrão-ouro</p>
                  </div>
                </div>
                {expandedSections.cirurgico ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </CardHeader>

            {expandedSections.cirurgico && (
              <CardContent className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-xs text-green-800">
                    <strong>WSES Recomendação (Página 9-10):</strong> Strong recommendation, High quality evidence.
                    Apendicectomia é o tratamento de escolha para apendicite não complicada.
                    Laparoscopia preferível quando disponível (menor dor pós-operatória, menor tempo de internação).
                  </AlertDescription>
                </Alert>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h5 className="text-sm font-semibold text-green-800 mb-3">VIA DE ACESSO</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="viaLaparoscopica"
                        checked={state.viaLaparoscopica}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setState(prev => ({ ...prev, viaLaparoscopica: true, viaAberta: false }))
                          } else {
                            setState(prev => ({ ...prev, viaLaparoscopica: false }))
                          }
                        }}
                      />
                      <Label htmlFor="viaLaparoscopica" className="text-sm cursor-pointer">
                        <strong>Laparoscópica</strong> (preferível - menor morbidade)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="viaAberta"
                        checked={state.viaAberta}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setState(prev => ({ ...prev, viaAberta: true, viaLaparoscopica: false }))
                          } else {
                            setState(prev => ({ ...prev, viaAberta: false }))
                          }
                        }}
                      />
                      <Label htmlFor="viaAberta" className="text-sm cursor-pointer">
                        Aberta (quando laparoscopia indisponível ou contraindicada)
                      </Label>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50 mt-3">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800">
                    <strong>Nota:</strong> Detalhes sobre antibioticoterapia perioperatória (dose única) estão na Etapa 8 - Particularidades Cirúrgicas.
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}
          </Card>

          {/* TRATAMENTO NÃO COMPLICADA - CONSERVADOR */}
          <Card className="border-blue-200">
            <CardHeader
              className="cursor-pointer hover:bg-gray-50 transition-colors bg-blue-50"
              onClick={() => toggleSection('conservador')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-md text-blue-800">Tratamento Conservador (Antibióticos)</CardTitle>
                      <Badge variant="outline" className="text-xs">WSES: Weak/Moderate</Badge>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Alternativa em casos selecionados</p>
                  </div>
                </div>
                {expandedSections.conservador ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </CardHeader>

            {expandedSections.conservador && (
              <CardContent className="space-y-4">
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800">
                    <strong>WSES Recomendação (Página 12-13):</strong> Weak recommendation, Moderate quality evidence.
                    Antibioticoterapia isolada pode ser considerada em pacientes selecionados com apendicite
                    não complicada que recusam cirurgia ou têm contraindicação cirúrgica.
                    Taxa de recorrência: 20-30% em 1 ano.
                  </AlertDescription>
                </Alert>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-xs text-yellow-800">
                    <strong>Critérios para considerar tratamento conservador:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Apendicite NÃO complicada confirmada por imagem</li>
                      <li>Sem sinais de perfuração ou abscesso</li>
                      <li>Sem apendicolito visível (maior risco de falha)</li>
                      <li>Paciente informado sobre risco de recorrência (20-30%)</li>
                      <li>Possibilidade de follow-up rigoroso</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h5 className="text-sm font-semibold text-blue-800 mb-3">ESQUEMA ANTIBIÓTICO</h5>
                  <div className="space-y-2 text-xs text-gray-700">
                    <p><strong>Primeira escolha (IV → VO):</strong></p>
                    <p className="ml-4">• Ceftriaxona 1-2g IV 24/24h + Metronidazol 500mg IV 8/8h</p>
                    <p className="ml-4">• Após melhora clínica (48-72h): Ciprofloxacino 500mg VO 12/12h + Metronidazol 500mg VO 8/8h</p>
                    <p className="ml-4">• Duração total: 7-10 dias</p>

                    <p className="mt-3"><strong>Alternativa:</strong></p>
                    <p className="ml-4">• Ertapenem 1g IV 24/24h por 3-5 dias</p>
                    <p className="ml-4">• Seguido por Amoxicilina-Clavulanato 875mg VO 12/12h até completar 7-10 dias</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-300">
                  <Checkbox
                    id="tratamentoConservador"
                    checked={state.tratamentoConservador}
                    onCheckedChange={(checked) =>
                      setState(prev => ({ ...prev, tratamentoConservador: checked as boolean }))
                    }
                  />
                  <Label htmlFor="tratamentoConservador" className="text-sm cursor-pointer font-semibold text-blue-800">
                    Optado por tratamento conservador (antibióticos)
                  </Label>
                </div>
              </CardContent>
            )}
          </Card>
        </>
      )}

      {/* TRATAMENTO COMPLICADA */}
      {state.classificacao === 'complicada' && (
        <>
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <CardTitle className="text-lg text-red-800">Tratamento Específico por Tipo de Complicação</CardTitle>
                  <p className="text-sm text-red-600 mt-1">Estratégias terapêuticas baseadas nos achados da etapa anterior</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <Alert className="border-red-200 bg-red-50">
                <Info className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-xs text-red-800">
                  <strong>WSES Recomendação (Página 15-18):</strong> O tratamento da apendicite complicada
                  depende da presença de abscesso, seu tamanho, e estabilidade hemodinâmica do paciente (avaliados na etapa anterior).
                </AlertDescription>
              </Alert>

              {/* FLUXO: SEM ABSCESSO - Cirurgia urgente */}
              {!state.abscessoPeriapendicular && !state.fleimaoPeriapendicular && (state.apendicePerfurada || state.peritoniteDifusa || state.apendiceGangrenosa) && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Syringe className="h-5 w-5 text-orange-600" />
                      <h5 className="font-semibold text-orange-800">PERFURAÇÃO SEM ABSCESSO → CIRURGIA URGENTE</h5>
                      <Badge className="bg-orange-600">WSES: Strong/Moderate</Badge>
                    </div>
                    <Alert className="border-orange-300 bg-orange-100">
                      <Info className="h-4 w-4 text-orange-700" />
                      <AlertDescription className="text-xs text-orange-800">
                        <strong>WSES Recomendação (Página 15):</strong> "In adults with perforated appendicitis
                        without abscess, we recommend emergency appendectomy."
                      </AlertDescription>
                    </Alert>
                    <div className="text-xs text-orange-800 space-y-2">
                      <p><strong>Conduta:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Ressuscitação volêmica e estabilização hemodinâmica</li>
                        <li>Antibióticos de amplo espectro IV <strong>IMEDIATAMENTE</strong></li>
                        <li>Apendicectomia URGENTE (não aguardar)</li>
                        <li>Via preferencial: <strong>Laparoscópica</strong> (se expertise disponível)</li>
                        <li>Lavagem peritoneal copiosa</li>
                        <li>Drenagem de rotina: <strong>CONTRAINDICADA</strong> (apenas em casos muito excepcionais)</li>
                        <li>Antibióticos pós-operatórios: 4-7 dias (até resolução de febre e leucocitose)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* COM ABSCESSO */}
              {state.abscessoPeriapendicular && (
                <>
                  {/* PACIENTE INSTÁVEL COM ABSCESSO → CIRURGIA URGENTE */}
                  {state.sepse && (
                    <Card className="border-red-300 bg-red-50">
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-6 w-6 text-red-700" />
                          <h5 className="font-semibold text-red-800">PACIENTE INSTÁVEL COM ABSCESSO → CIRURGIA DE URGÊNCIA</h5>
                          <Badge variant="destructive">EMERGÊNCIA</Badge>
                        </div>
                        <Alert variant="destructive" className="border-2">
                          <AlertCircle className="h-5 w-5" />
                          <AlertDescription className="text-xs">
                            <strong>WSES Recomendação (Página 17):</strong> Pacientes instáveis (sepse, choque séptico, peritonite difusa)
                            requerem cirurgia de urgência <strong>INDEPENDENTEMENTE</strong> do tamanho do abscesso.
                            <p className="mt-2 font-bold">Conduta:</p>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              <li>Ressuscitação agressiva (fluidos, vasopressores se necessário)</li>
                              <li>Antibióticos de amplo espectro IV IMEDIATAMENTE</li>
                              <li>CIRURGIA URGENTE: Apendicectomia + drenagem de abscesso</li>
                              <li>Considerar UTI pós-operatória</li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  )}

                  {/* PACIENTE ESTÁVEL COM ABSCESSO → FLUXO POR TAMANHO */}
                  {!state.sepse && (
                    <Card className="border-purple-200">
                      <CardHeader
                        className="cursor-pointer hover:bg-gray-50 transition-colors bg-purple-50"
                        onClick={() => toggleSection('abscesso')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Droplets className="h-5 w-5 text-purple-600" />
                            <div>
                              <CardTitle className="text-md text-purple-800">
                                2. Tratamento com Abscesso (Paciente ESTÁVEL)
                              </CardTitle>
                              <p className="text-xs text-purple-600 mt-1">
                                Tamanho do abscesso: {state.tamanhoAbscesso > 0 ? `${state.tamanhoAbscesso}cm` : 'não informado'}
                              </p>
                            </div>
                          </div>
                          {expandedSections.abscesso ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>

                      {expandedSections.abscesso && (
                        <CardContent className="space-y-4">
                          <Alert className="border-purple-200 bg-purple-50">
                            <Info className="h-4 w-4 text-purple-600" />
                            <AlertDescription className="text-xs text-purple-800">
                              <strong>WSES Recomendação (Página 17):</strong> "In hemodynamically stable patients
                              with appendiceal abscess or phlegmon, we suggest initial non-operative management
                              with intravenous antibiotics with or without percutaneous drainage." (Weak/Low)
                            </AlertDescription>
                          </Alert>

                          {/* INPUT: Tamanho do Abscesso */}
                          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <Label className="text-sm font-semibold text-purple-800 mb-2 block">
                              Informe o tamanho do abscesso (em cm):
                            </Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              value={state.tamanhoAbscesso || ''}
                              onChange={(e) =>
                                setState(prev => ({ ...prev, tamanhoAbscesso: parseFloat(e.target.value) || 0 }))
                              }
                              className="w-40"
                              placeholder="Ex: 3.5"
                            />
                            <p className="text-xs text-purple-600 mt-2">
                              O tamanho do abscesso determina a estratégia de tratamento (ponto de corte: 3-4cm)
                            </p>
                          </div>

                          {/* ABSCESSO PEQUENO (<3-4cm) */}
                          {state.tamanhoAbscesso > 0 && state.tamanhoAbscesso < 3.5 && (
                            <Alert className="border-blue-300 bg-blue-50 border-2">
                              <Info className="h-5 w-5 text-blue-700" />
                              <AlertTitle className="text-sm text-blue-900">
                                📋 ABSCESSO PEQUENO (&lt;3-4cm) → ANTIBIOTICOTERAPIA
                              </AlertTitle>
                              <AlertDescription className="text-xs text-blue-800 mt-2">
                                <strong>WSES Recomendação (Página 17-18):</strong> Weak recommendation, Low quality evidence.
                                <p className="mt-2"><strong>Estratégia inicial:</strong></p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li><strong>Antibióticos IV de amplo espectro</strong> (sem drenagem inicialmente)</li>
                                  <li>Internação hospitalar para monitorização rigorosa</li>
                                  <li>Reavaliação clínica a cada 12-24h</li>
                                  <li>Reavaliação com imagem (TC) em 48-72h</li>
                                </ul>
                                <p className="mt-2"><strong>Critérios de SUCESSO (manter conservador):</strong></p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li>Melhora clínica (redução da dor e febre)</li>
                                  <li>Leucócitos e PCR em queda</li>
                                  <li>Tolerância à dieta oral</li>
                                </ul>
                                <p className="mt-2 font-bold text-blue-900">
                                  ⚠️ Critérios de FALHA (indicação de drenagem ou cirurgia):
                                </p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li>Sem melhora em 24-48h</li>
                                  <li>Piora clínica (aumento da dor, febre persistente)</li>
                                  <li>Aumento do tamanho do abscesso na imagem</li>
                                  <li>Desenvolvimento de sinais de sepse</li>
                                </ul>
                              </AlertDescription>
                            </Alert>
                          )}

                          {/* ABSCESSO MODERADO/GRANDE (≥3-4cm) */}
                          {state.tamanhoAbscesso >= 3.5 && (
                            <Alert className="border-purple-300 bg-purple-50 border-2">
                              <Droplets className="h-5 w-5 text-purple-700" />
                              <AlertTitle className="text-sm text-purple-900">
                                💧 ABSCESSO MODERADO/GRANDE (≥3-4cm) → DRENAGEM PERCUTÂNEA + ANTIBIÓTICOS
                              </AlertTitle>
                              <AlertDescription className="text-xs text-purple-800 mt-2">
                                <strong>WSES Recomendação (Página 17):</strong> Weak recommendation, Low quality evidence.
                                <p className="mt-2"><strong>Estratégia 1ª LINHA:</strong></p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li><strong>Drenagem percutânea</strong> guiada por TC ou Ultrassom</li>
                                  <li>+ Antibióticos IV de amplo espectro</li>
                                  <li>Manter dreno até débito &lt;10-20 mL/dia</li>
                                  <li>Duração antibióticos: 7-14 dias total (IV → VO conforme melhora)</li>
                                </ul>

                                <div className="mt-3 p-3 bg-purple-100 rounded border border-purple-300">
                                  <p className="font-bold text-purple-900 mb-2">📊 MONITORAMENTO PÓS-DRENAGEM:</p>
                                  <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Débito do dreno:</strong> Registrar volume a cada 24h</li>
                                    <li><strong>Clínica:</strong> Avaliar dor, febre, sinais de sepse diariamente</li>
                                    <li><strong>Laboratório:</strong> Leucócitos e PCR a cada 48-72h</li>
                                    <li><strong>Imagem de controle:</strong> TC em 5-7 dias se sem melhora clínica</li>
                                  </ul>

                                  <p className="font-bold text-purple-900 mt-3 mb-2">✅ CRITÉRIOS para RETIRAR o DRENO:</p>
                                  <ul className="list-disc list-inside space-y-1">
                                    <li>Débito &lt;10-20 mL/24h por 24-48h consecutivas</li>
                                    <li>Drenagem clara/serosa (não purulenta)</li>
                                    <li>Melhora clínica (afebril, sem dor)</li>
                                    <li>Leucócitos e PCR normalizando</li>
                                  </ul>

                                  <p className="font-bold text-purple-900 mt-3 mb-2">⚠️ FALHA da DRENAGEM PERCUTÂNEA:</p>
                                  <ul className="list-disc list-inside space-y-1">
                                    <li>Persistência de febre após 48-72h</li>
                                    <li>Débito purulento persistente ou crescente</li>
                                    <li>Abscesso não reduzindo na TC de controle</li>
                                    <li>Desenvolvimento de sepse ou peritonite</li>
                                    <li><strong>→ Considerar CIRURGIA</strong></li>
                                  </ul>
                                </div>

                                <p className="mt-2"><strong>Contraindicações à drenagem percutânea:</strong></p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  <li>Abscesso multiloculado (múltiplas cavidades)</li>
                                  <li>Abscesso de difícil acesso (risco de lesão de estruturas)</li>
                                  <li>Falha de drenagem prévia</li>
                                  <li>Desenvolvimento de peritonite</li>
                                </ul>
                                <p className="mt-2 font-bold text-purple-900">
                                  → Nestes casos: considerar CIRURGIA (apendicectomia + drenagem cirúrgica)
                                </p>
                              </AlertDescription>
                            </Alert>
                          )}

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg border border-purple-300">
                          <Checkbox
                            id="drenagemPercutanea"
                            checked={state.drenagemPercutanea}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, drenagemPercutanea: checked as boolean }))
                            }
                          />
                          <Label htmlFor="drenagemPercutanea" className="text-sm cursor-pointer font-semibold text-purple-800">
                            Drenagem percutânea guiada por imagem realizada
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-300">
                          <Checkbox
                            id="apendicectomiaImediata"
                            checked={state.apendicectomiaImediata}
                            onCheckedChange={(checked) =>
                              setState(prev => ({ ...prev, apendicectomiaImediata: checked as boolean }))
                            }
                          />
                          <Label htmlFor="apendicectomiaImediata" className="text-sm cursor-pointer font-semibold text-orange-800">
                            Apendicectomia imediata (cirurgia de urgência)
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )}
                </>
              )}

              {/* COM FLEIMÃO */}
              {state.fleimaoPeriapendicular && (
                <Card className="border-teal-200 bg-teal-50">
                  <CardContent className="pt-4 space-y-3">
                    {/* FLEIMÃO PERIAPENDICULAR (PHLEGMON) */}
                    <Alert className="border-teal-300 bg-teal-50 border-2">
                      <Info className="h-5 w-5 text-teal-700" />
                      <AlertTitle className="text-sm text-teal-900">🔬 FLEIMÃO PERIAPENDICULAR (Phlegmon)</AlertTitle>
                      <AlertDescription className="text-xs text-teal-800 mt-2">
                        <p className="font-bold mb-2">Definição:</p>
                        <p className="mb-2">
                          Processo inflamatório/infeccioso SÓLIDO periapendicular (sem coleção líquida drenável).
                          Corresponde a uma massa inflamatória envolvendo apêndice, omento, e alças intestinais.
                        </p>

                        <div className="bg-teal-100 p-3 rounded border border-teal-300 mt-3">
                          <p className="font-bold mb-2">🔍 DIFERENÇA: Fleimão vs Abscesso</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Fleimão:</strong> Massa inflamatória SÓLIDA (sem líquido drenável)
                              <ul className="ml-4 list-circle list-inside mt-1">
                                <li>TC: Espessamento/densificação da gordura mesentérica</li>
                                <li>Sem coleção líquida identificável</li>
                              </ul>
                            </li>
                            <li><strong>Abscesso:</strong> Coleção LÍQUIDA purulenta (drenável)
                              <ul className="ml-4 list-circle list-inside mt-1">
                                <li>TC: Coleção líquida com realce periférico</li>
                                <li>Passível de drenagem percutânea</li>
                              </ul>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-teal-100 p-3 rounded border border-teal-300 mt-3">
                          <p className="font-bold mb-2 text-teal-900">✅ TRATAMENTO DO FLEIMÃO:</p>
                          <p className="mb-2"><strong>WSES (Página 17):</strong> Weak recommendation, Low evidence</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>1ª LINHA:</strong> Tratamento conservador (sem cirurgia)
                              <ul className="ml-4 list-circle list-inside mt-1">
                                <li>Antibióticos IV de amplo espectro (mesmos esquemas do abscesso)</li>
                                <li>Internação para monitorização</li>
                                <li>Jejum inicial, progredindo conforme tolerância</li>
                                <li>Analgesia</li>
                              </ul>
                            </li>
                            <li><strong>Duração ATB:</strong> 7-14 dias (IV → VO conforme melhora)</li>
                            <li><strong>Reavaliação:</strong> Clínica diária + TC em 5-7 dias se sem melhora</li>
                          </ul>

                          <p className="font-bold mt-3 mb-2 text-red-800">⚠️ INDICAÇÕES de CIRURGIA no fleimão:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Falha do tratamento conservador (sem melhora em 48-72h)</li>
                            <li>Piora clínica (sepse, peritonite)</li>
                            <li>Desenvolvimento de obstrução intestinal</li>
                            <li>Formação de abscesso (evolução do fleimão para coleção)</li>
                          </ul>

                          <p className="font-bold mt-3 mb-2">📊 PROGNÓSTICO:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Taxa de sucesso do tratamento conservador: <strong>85-95%</strong></li>
                            <li>Risco de recorrência: similar ao abscesso (<strong>7-12%</strong>)</li>
                            <li>Interval appendectomy: mesmas recomendações do abscesso (NÃO de rotina)</li>
                          </ul>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

            </CardContent>
          </Card>
        </>
      )}

      {/* AVISO SE NÃO CLASSIFICADO */}
      {!state.classificacao && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-sm text-yellow-800">
            <strong>⚠️ Classificação Pendente:</strong> Retorne à Etapa 4 para classificar a apendicite
            (complicada vs não complicada) antes de definir o tratamento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )

  // ========================================
  // COMPONENTE: ETAPA 7 - PARTICULARIDADES CLÍNICAS
  // ========================================
  const renderEtapa7 = () => (
    <div className="space-y-6">
      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50">
          <div className="flex items-center gap-3">
            <Pill className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg text-purple-800">Particularidades Clínicas do Manejo</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* CARD 1: ANTIBIOTICOTERAPIA PARA APENDICITE COMPLICADA */}
      <Card className="border-indigo-200">
        <CardHeader className="bg-indigo-50">
          <div className="flex items-center gap-3">
            <Pill className="h-5 w-5 text-indigo-600" />
            <div>
              <CardTitle className="text-md text-indigo-800">1. Antibioticoterapia para Apendicite Complicada</CardTitle>
              <Badge className="bg-indigo-600 text-xs mt-1">WSES: Strong/High</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert className="border-indigo-200 bg-indigo-50">
            <Info className="h-4 w-4 text-indigo-600" />
            <AlertDescription className="text-xs text-indigo-800">
              <strong>WSES Recomendação (Página 19-20):</strong> "In adults with complicated appendicitis,
              we recommend postoperative antibiotic therapy." Strong/High
            </AlertDescription>
          </Alert>

          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200 space-y-3">
            <div className="text-xs text-gray-800">
              <p className="font-semibold mb-2">Regimes antibióticos de amplo espectro apropriados para apendicite complicada incluem:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Piperacilina-Tazobactam 4,5g IV 6/6h ou 8/8h</li>
                <li>Carbapenêmicos (meropenem 1g IV 8/8h, imipenem 500mg IV 6/6h, ertapenem 1g IV 24/24h)</li>
                <li>Cefalosporinas + Metronidazol (ex: Ceftriaxona 2g IV 24/24h + Metronidazol 500mg IV 8/8h)</li>
                <li>Fluoroquinolonas + Metronidazol (em áreas com baixa resistência: Ciprofloxacino 400mg IV 12/12h + Metronidazol 500mg IV 8/8h)</li>
              </ul>

              <p className="font-semibold mt-3 mb-2">Duração do tratamento (WSES Página 20 - Weak/Moderate):</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Pós-cirúrgico:</strong> 4-7 dias OU até resolução de sinais clínicos
                  <ul className="list-circle list-inside ml-4 mt-1 text-gray-600">
                    <li>Afebril por 24-48h</li>
                    <li>Leucócitos normalizando</li>
                    <li>Ausência de dor abdominal significativa</li>
                    <li>Tolerando dieta oral</li>
                  </ul>
                </li>
                <li><strong>Tratamento conservador:</strong> 7-14 dias (IV → VO conforme melhora clínica)</li>
              </ul>

              <p className="font-semibold mt-3 mb-2">Transição para via oral:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Amoxicilina-Clavulanato 875/125mg VO 12/12h</li>
                <li>OU Ciprofloxacino 500mg VO 12/12h + Metronidazol 500mg VO 8/8h</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg border border-indigo-300 mt-3">
            <Checkbox
              id="antibioticoComplicada"
              checked={state.antibioticoAmploEspectro}
              onCheckedChange={(checked) =>
                setState(prev => ({ ...prev, antibioticoAmploEspectro: checked as boolean }))
              }
            />
            <Label htmlFor="antibioticoComplicada" className="text-sm cursor-pointer font-semibold text-indigo-800">
              Antibiótico de amplo espectro IV iniciado
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* CARD 2: ACOMPANHAMENTO AMBULATORIAL */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <CardTitle className="text-md text-green-800">2. Acompanhamento Ambulatorial Após Alta</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">Pós-tratamento conservador</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert className="border-green-200 bg-green-50">
            <Info className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-xs text-green-800">
              Após tratamento conservador bem-sucedido (antibióticos ± drenagem) para apendicite complicada
            </AlertDescription>
          </Alert>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h5 className="text-sm font-semibold text-green-800 mb-3">Cronograma de Seguimento:</h5>
            <div className="space-y-3 text-xs text-gray-800">
              <div className="p-3 bg-green-100 rounded border border-green-300">
                <p className="font-bold mb-2">1ª consulta: 7-10 dias após alta</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Avaliar sintomas residuais (dor, febre)</li>
                  <li>Solicitar leucograma e PCR</li>
                  <li>Se sintomático: considerar TC de controle</li>
                </ul>
              </div>

              <div className="p-3 bg-green-100 rounded border border-green-300">
                <p className="font-bold mb-2">2ª consulta: 4-6 semanas</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Avaliar resolução completa</li>
                  <li>Se &gt;40 anos: solicitar colonoscopia</li>
                  <li>Orientar sobre sinais de recorrência</li>
                </ul>
              </div>

              <div className="p-3 bg-green-100 rounded border border-green-300">
                <p className="font-bold mb-2">Colonoscopia: 6-8 semanas após alta (se &gt;40 anos)</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Excluir neoplasia colônica (risco 10-30%)</li>
                  <li>WSES: Strong recommendation / Moderate evidence</li>
                </ul>
              </div>
            </div>
          </div>

          <Alert className="border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-sm text-yellow-900">Sinais de alerta para retorno URGENTE:</AlertTitle>
            <AlertDescription className="text-xs text-yellow-800 mt-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Febre &gt;38°C persistente ou recorrente</li>
                <li>Dor abdominal intensa ou crescente</li>
                <li>Distensão abdominal</li>
                <li>Náuseas e vômitos persistentes</li>
                <li className="font-bold">→ Retornar à emergência imediatamente</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* CARD 3: INTERVAL APPENDECTOMY */}
      <Card className="border-yellow-200">
        <CardHeader className="bg-yellow-50">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <div>
              <CardTitle className="text-md text-yellow-800">3. Interval Appendectomy - Mudança de Paradigma</CardTitle>
              <Badge variant="outline" className="text-xs mt-1 border-yellow-600">WSES: Weak CONTRA</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert className="border-yellow-200 bg-yellow-50">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-xs text-yellow-800">
              <strong>WSES Recomendação (Página 18) - Weak CONTRA / Low Evidence:</strong>
              <p className="mt-2">
                "We suggest <strong>AGAINST routine interval appendectomy</strong> after successful
                conservative treatment of appendiceal abscess."
              </p>
              <p className="mt-2 font-bold">
                Consenso Delphi: 94.7% dos experts concordam
              </p>
            </AlertDescription>
          </Alert>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 space-y-3">
            <div className="p-3 bg-yellow-100 rounded border border-yellow-300">
              <p className="font-bold text-yellow-900 mb-2">Conduta ATUAL (Paradigma 2020):</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-800">
                <li><strong>NÃO</strong> fazer apendicectomia de rotina ("interval appendectomy")</li>
                <li>Follow-up clínico ambulatorial</li>
                <li>Colonoscopia em pacientes &gt;40 anos</li>
                <li>Expectante ("watchful waiting")</li>
              </ul>
            </div>

            <div className="p-3 bg-orange-100 rounded border border-orange-300">
              <p className="font-bold text-orange-900 mb-2">EXCEÇÕES - Quando indicar Interval Appendectomy:</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-800">
                <li><strong>Recorrência de apendicite</strong> (mesmo após tratamento conservador bem-sucedido)</li>
                <li><strong>Presença de apendicolito</strong> na imagem (risco aumentado de recorrência: 25-40%)</li>
                <li><strong>Sintomas persistentes</strong> (dor em FID que não resolve)</li>
                <li><strong>Achados suspeitos na TC:</strong>
                  <ul className="ml-4 list-circle list-inside mt-1">
                    <li>Espessamento irregular da parede apendicular</li>
                    <li>Massa sólida no ceco/apêndice</li>
                    <li>Suspeita de mucocele ou neoplasia</li>
                  </ul>
                </li>
                <li><strong>Colonoscopia alterada:</strong> Lesão neoplásica identificada</li>
                <li><strong>Preferência do paciente</strong> (após discussão dos riscos e benefícios)</li>
                <li><strong>Idade &gt;40 anos + achados suspeitos</strong> (risco de neoplasia 10-30%)</li>
              </ul>
              <p className="mt-2 font-bold text-orange-900 text-xs">
                → Timing ideal: 6-12 semanas após resolução completa do quadro agudo
              </p>
            </div>

            <div className="p-3 bg-blue-100 rounded border border-blue-300">
              <p className="font-bold text-blue-900 mb-2">Evidência:</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-blue-800">
                <li>Taxa de recorrência sem interval appendectomy: <strong>7-12%</strong></li>
                <li>Com apendicolito: <strong>25-40%</strong> de recorrência</li>
                <li>Morbimortalidade de interval appendectomy: similar à apendicectomia de urgência</li>
                <li>Maioria dos pacientes NÃO apresenta recorrência (88-93%)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CARD 4: INVESTIGAÇÃO DE NEOPLASIA >40 ANOS */}
      <Card className="border-pink-200">
        <CardHeader className="bg-pink-50">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-pink-600" />
            <div>
              <CardTitle className="text-md text-pink-800">4. Investigação de Neoplasia em Pacientes &gt;40 Anos</CardTitle>
              <Badge className="bg-pink-600 text-xs mt-1">WSES: Strong/Moderate</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert className="border-pink-200 bg-pink-50">
            <AlertTriangle className="h-4 w-4 text-pink-600" />
            <AlertDescription className="text-xs text-pink-800">
              <strong>WSES Recomendação (Página 18) - Strong/Moderate:</strong>
              <p className="mt-2">
                "In patients over 40 years of age with appendiceal abscess or phlegmon, we recommend
                <strong> colonoscopy or CT colonography</strong> after resolution of the acute episode to rule
                out underlying colorectal malignancy."
              </p>
            </AlertDescription>
          </Alert>

          <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
            <h5 className="text-sm font-semibold text-pink-800 mb-3">Justificativa:</h5>
            <ul className="list-disc list-inside space-y-2 text-xs text-gray-800">
              <li>Risco de neoplasia colorretal em &gt;40 anos: <strong>10-30%</strong></li>
              <li>Apendicite complicada pode ser manifestação inicial de câncer de ceco</li>
              <li>Abscesso periapendicular aumenta suspeita de tumor subjacente</li>
            </ul>
          </div>

          <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
            <h5 className="text-sm font-semibold text-pink-800 mb-3">Timing:</h5>
            <p className="text-xs text-gray-800">
              Realizar colonoscopia <strong>após resolução do episódio agudo</strong> (geralmente 6-8 semanas)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // ========================================
  // COMPONENTE: ETAPA 8 - PARTICULARIDADES CIRÚRGICAS
  // ========================================
  const renderEtapa8 = () => (
    <div className="space-y-6">
      <Card className="border-teal-200">
        <CardHeader className="bg-teal-50">
          <div className="flex items-center gap-3">
            <Syringe className="h-5 w-5 text-teal-600" />
            <CardTitle className="text-lg text-teal-800">Particularidades Cirúrgicas - Detalhes Técnicos</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* CARD 1: MANEJO DO COTO APENDICULAR */}
      <Card className="border-indigo-200">
        <CardHeader className="bg-indigo-50">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-5 w-5 text-indigo-600" />
            <div>
              <CardTitle className="text-md text-indigo-800">1. Manejo do Coto Apendicular</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">WSES: Weak/Low</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert className="border-indigo-200 bg-indigo-50">
            <Info className="h-4 w-4 text-indigo-600" />
            <AlertDescription className="text-xs text-indigo-800">
              <strong>Recomendação WSES (Página 14) - Weak/Low:</strong>
              <p className="mt-2">
                "In patients undergoing appendectomy, we suggest that the appendiceal stump can be
                managed by either ligation or stapling."
              </p>
            </AlertDescription>
          </Alert>

          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <h5 className="text-sm font-semibold text-indigo-800 mb-3">Opções disponíveis (sem diferença significativa em complicações):</h5>
            <ul className="list-disc list-inside space-y-2 text-xs text-gray-700">
              <li><strong>Ligadura simples</strong></li>
              <li><strong>Endoloop</strong></li>
              <li><strong>Grampeamento (stapler)</strong></li>
              <li><strong>Clips</strong></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* CARD 2: NÃO FAZER SUTURA EM BOLSA */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <CardTitle className="text-md text-red-800">2. IMPORTANTE: NÃO FAZER SUTURA EM BOLSA (Purse-String)</CardTitle>
              <Badge className="bg-red-600 text-xs mt-1">Strong CONTRA</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert variant="destructive" className="border-2">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-xs">
              <strong>Recomendação WSES (Página 15):</strong>
              <p className="mt-2">
                "Routine inversion of the appendiceal stump (purse-string suture) is NOT recommended
                as it does not reduce complications and may increase operative time."
              </p>
            </AlertDescription>
          </Alert>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="space-y-2 text-xs text-gray-800">
              <p className="font-bold text-red-800">❌ NÃO fazer sutura em bolsa de rotina</p>
              <p className="font-bold text-red-800">❌ NÃO inverter o coto para dentro do ceco</p>
              <p className="font-bold text-green-800 mt-3">✅ Ligadura simples ou grampeamento é SUFICIENTE</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CARD 3: LAVAGEM PERITONEAL */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <div className="flex items-center gap-3">
            <Droplets className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-md text-blue-800">3. Lavagem Peritoneal</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">Sem recomendação graduada</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-xs text-blue-800">
              <strong>Guideline (Página 16):</strong>
              <p className="mt-2">
                "Copious peritoneal lavage should be performed in cases of perforated appendicitis."
              </p>
            </AlertDescription>
          </Alert>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h5 className="text-sm font-semibold text-yellow-800 mb-2">NOTA TÉCNICA:</h5>
            <p className="text-xs text-gray-700">
              O guideline menciona "lavagem peritoneal copiosa" em casos de perfuração, mas NÃO
              fornece recomendação formal graduada. Não especifica tipo de solução ou volume. A decisão
              sobre realizar lavagem peritoneal e a técnica utilizada fica a critério do cirurgião.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CARD 4: DRENAGEM ABDOMINAL - CONTRAINDICADA */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <CardTitle className="text-md text-red-800">4. Drenagem Abdominal - CONTRAINDICADA</CardTitle>
              <Badge className="bg-red-600 text-xs mt-1">Strong CONTRA / High</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert variant="destructive" className="border-2">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-base font-bold">Recomendação WSES (Página 16) - Strong CONTRA / High:</AlertTitle>
            <AlertDescription className="text-xs mt-2">
              <p className="font-semibold">
                "In adults with perforated appendicitis, we recommend AGAINST routine abdominal drainage."
              </p>
            </AlertDescription>
          </Alert>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h5 className="text-sm font-semibold text-red-800 mb-3">Por que drenagem é CONTRAINDICADA:</h5>
            <ul className="list-none space-y-2 text-xs text-gray-800">
              <li><span className="text-red-600 font-bold">❌</span> Drenagem NÃO reduz taxa de abscesso intra-abdominal</li>
              <li><span className="text-red-600 font-bold">❌</span> Drenagem NÃO reduz taxa de infecção de ferida</li>
              <li><span className="text-red-600 font-bold">❌</span> Drenagem NÃO reduz tempo de internação</li>
              <li><span className="text-red-600 font-bold">❌</span> Drenagem AUMENTA desconforto do paciente</li>
              <li><span className="text-red-600 font-bold">❌</span> Drenagem pode AUMENTAR risco de infecção</li>
            </ul>
          </div>

          <Alert className="border-yellow-300 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-sm text-yellow-900">Exceções RARÍSSIMAS (considerar drenagem apenas se):</AlertTitle>
            <AlertDescription className="text-xs text-yellow-800 mt-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Abscesso residual que não pode ser completamente removido</li>
                <li>Hemostasia inadequada</li>
                <li>Contaminação fecal extensa com dúvida de limpeza adequada</li>
                <li>Necrose de alça intestinal com anastomose realizada</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* CARD 5: ANTIBIOTICOTERAPIA PERIOPERATÓRIA */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <div className="flex items-center gap-3">
            <Pill className="h-5 w-5 text-green-600" />
            <div>
              <CardTitle className="text-md text-green-800">5. Antibioticoterapia PERIOPERATÓRIA (Dose Única)</CardTitle>
              <Badge className="bg-green-600 text-xs mt-1">WSES: Strong/High</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <Alert className="border-green-200 bg-green-50">
            <Info className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-xs text-green-800">
              <strong>Recomendação WSES (Página 19) - Strong/High:</strong>
              <p className="mt-2">
                "In patients with uncomplicated appendicitis undergoing appendectomy, we recommend
                single-dose preoperative antibiotic prophylaxis WITHOUT postoperative continuation."
              </p>
            </AlertDescription>
          </Alert>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h5 className="text-sm font-semibold text-green-800 mb-3">Esquema para Apendicite NÃO COMPLICADA:</h5>
            <ul className="list-disc list-inside space-y-2 text-xs text-gray-700">
              <li><strong>Dose única 30-60 minutos ANTES da incisão cirúrgica</strong></li>
              <li>Cefazolina 2g IV + Metronidazol 500mg IV</li>
              <li>OU Cefoxitina 2g IV (monoterapia)</li>
              <li>OU Ampicilina-Sulbactam 3g IV</li>
            </ul>
          </div>

          <Alert variant="destructive" className="border-2 border-red-300">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-sm">⚠️ IMPORTANTE para apendicite NÃO COMPLICADA:</AlertTitle>
            <AlertDescription className="text-xs mt-2">
              <div className="space-y-1">
                <p className="font-bold text-red-800">❌ NÃO continuar antibiótico no pós-operatório</p>
                <p className="font-bold text-red-800">❌ NÃO prolongar além de 24h</p>
              </div>
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-300 bg-blue-50 mt-3">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-sm text-blue-900">Para apendicite COMPLICADA:</AlertTitle>
            <AlertDescription className="text-xs text-blue-800 mt-2">
              <p>Antibioticoterapia prolongada está indicada (ver Etapa 7 - Particularidades Clínicas)</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* CARD 6: CLASSIFICAÇÃO DE GOMES */}
      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50">
          <div className="flex items-center gap-3">
            <Microscope className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-md text-blue-800">6. Classificação de Gomes - Achados Intraoperatórios</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">Classificação cirúrgica</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Alert className="border-blue-200 bg-blue-50 mb-3">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-xs text-blue-800">
              <p className="font-bold">Importante: Esta classificação é determinada DURANTE a cirurgia</p>
              <p className="mt-1">Os achados intraoperatórios ajudam a definir a antibioticoterapia pós-operatória e prognóstico</p>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <div className="bg-blue-100 p-3 rounded border border-blue-300">
              <p className="font-bold text-blue-900 text-sm">Grau 0: Apêndice Normal</p>
              <p className="text-xs text-gray-700 mt-1">Apêndice macroscopicamente normal, sem sinais inflamatórios</p>
            </div>

            <div className="bg-blue-100 p-3 rounded border border-blue-300">
              <p className="font-bold text-blue-900 text-sm">Grau 1: Apendicite Catarral (Inflamação Simples)</p>
              <p className="text-xs text-gray-700 mt-1">Hiperemia, edema, apêndice intacto sem necrose</p>
            </div>

            <div className="bg-blue-100 p-3 rounded border border-blue-300">
              <p className="font-bold text-blue-900 text-sm">Grau 2: Apendicite Flegmonosa (Supurativa)</p>
              <p className="text-xs text-gray-700 mt-1">Exsudato fibrinopurulento na superfície, sem necrose transmural</p>
            </div>

            <div className="bg-orange-100 p-3 rounded border border-orange-300">
              <p className="font-bold text-orange-900 text-sm">Grau 3: Apendicite Gangrenosa</p>
              <p className="text-xs text-gray-700 mt-1">Necrose transmural, áreas de gangrena, sem perfuração</p>
            </div>

            <div className="bg-red-100 p-3 rounded border border-red-300">
              <p className="font-bold text-red-900 text-sm">Grau 4: Apendicite Perfurada</p>
              <p className="text-xs text-gray-700 mt-1">Perfuração visível do apêndice</p>
            </div>

            <div className="bg-red-100 p-3 rounded border border-red-300">
              <p className="font-bold text-red-900 text-sm">Grau 5: Abscesso Periapendicular</p>
              <p className="text-xs text-gray-700 mt-1">Coleção purulenta organizada ao redor do apêndice</p>
            </div>
          </div>

          <Alert className="border-purple-300 bg-purple-50 mt-4">
            <Info className="h-4 w-4 text-purple-600" />
            <AlertTitle className="text-sm text-purple-900">Implicações Clínicas:</AlertTitle>
            <AlertDescription className="text-xs text-purple-800 mt-2">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Graus 0-2:</strong> Apendicite não complicada → Antibiótico de dose única</li>
                <li><strong>Graus 3-5:</strong> Apendicite complicada → Antibióticos prolongados (4-7 dias)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {renderHeroSection()}
      {renderPopulationSelector()}

      {/* Renderização condicional por etapa */}
      {state.etapaAtual === 1 && renderEtapa1()}
      {state.etapaAtual === 2 && renderEtapa2()}
      {state.etapaAtual === 3 && renderEtapa3()}
      {state.etapaAtual === 4 && renderEtapa4()}
      {state.etapaAtual === 5 && renderEtapa5()}
      {state.etapaAtual === 6 && renderEtapa6()}
      {state.etapaAtual === 7 && renderEtapa7()}
      {state.etapaAtual === 8 && renderEtapa8()}

      {/* Botões de Navegação */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          variant="outline"
          onClick={etapaAnterior}
          disabled={state.etapaAtual === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Etapa Anterior
        </Button>

        <div className="text-sm text-gray-600">
          Etapa {state.etapaAtual} de 8
        </div>

        <Button
          onClick={proximaEtapa}
          disabled={!podeAvancar() || state.etapaAtual === 8}
          className="bg-red-600 hover:bg-red-700"
        >
          Próxima Etapa
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default GuideFlowApendicite
