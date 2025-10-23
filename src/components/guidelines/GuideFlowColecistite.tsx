'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
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
  Brain,
  Zap,
  Calculator,
  FileText,
  Clock,
  Target,
  AlertCircle,
  Info,
  User,
  ClipboardList,
  TrendingUp,
  Circle,
  Settings,
  Syringe,
  Shield,
  Calendar,
  Pill
} from 'lucide-react'
import { GuideFlowState } from '@/types/guideflow';

interface GuideFlowColecistiteProps {
  state: GuideFlowState;
  setState: (state: GuideFlowState | ((prevState: GuideFlowState) => GuideFlowState)) => void;
}

const GuideFlowColecistite: React.FC<GuideFlowColecistiteProps> = ({ state, setState }) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    criterioA: true,
    criterioB: false,
    criterioC: false,
    disfuncaoOrganica: true,
    criteriosGrauII: false,
    riscoCircurgico: false,
    antibioticos: false
  });

  // useEffect para atualizar a conduta quando gravidade ou risco cirúrgico mudarem
  useEffect(() => {
    if (state.gravidade && state.riscoCircurgico && state.etapaAtual === 5) {
      const conduta = determinarConduta();
      if (conduta !== state.condutaRecomendada) {
        setState(prevState => ({ ...prevState, condutaRecomendada: conduta }));
      }
    }
  }, [state.gravidade, state.riscoCircurgico, state.etapaAtual]);

  // Função para calcular diagnóstico baseado nos critérios de Tokyo 2018
  const calcularDiagnostico = () => {
    const criterioA_positivo = state.murphyPositivo || state.dorQSD || state.sensibilidadeQSD;
    
    const criterioB_positivo = (
      (state.febre && state.temperaturaValue >= 37.5) ||
      (state.pcrElevada && state.pcrValue > 3.0) ||
      (state.leucocitose && (state.leucocitosValue > 10000 || state.leucocitosValue < 4000))
    );
    
    const criterioC_positivo = state.usgPositivo || state.tcPositivo || state.rmPositivo || state.cprm;

    let diagnosticoResult = "";
    
    if ((criterioA_positivo && criterioB_positivo && criterioC_positivo) || 
        (criterioA_positivo && criterioC_positivo)) {
      diagnosticoResult = "DEFINITIVA";
    } else if (criterioA_positivo && criterioB_positivo) {
      diagnosticoResult = "SUSPEITA";
    } else {
      diagnosticoResult = "INSUFICIENTE";
    }
    
    setState(prevState => ({ ...prevState, diagnostico: diagnosticoResult }));
    return diagnosticoResult;
  };

  // Função para calcular gravidade baseada nos critérios de Tokyo 2018
  const calcularGravidade = () => {
    // Verificar disfunção orgânica (Grau III)
    const disfuncaoCardio = state.disfuncaoCardiovascular && (
      (state.hipotensao && state.pressaoSistolica < 90) || state.necessidadeDrogas
    );
    
    const disfuncaoNeuro = state.disfuncaoNeurologica && (
      state.alteracaoConsciencia || state.glasgowValue < 13
    );
    
    const disfuncaoResp = state.disfuncaoRespiratoria && (
      state.pao2fio2 < 300 || state.necessidadeVentilacao
    );
    
    const disfuncaoRen = state.disfuncaoRenal && (
      state.creatininaValue > 2.0 || (state.oliguria && state.diurese24h < 400)
    );
    
    const disfuncaoHep = state.disfuncaoHepatica && state.bilirrubinaTotal > 2.0;
    
    const disfuncaoHemat = state.disfuncaoHematologica && state.plaquetas < 100000;
    
    const temDisfuncaoOrganica = disfuncaoCardio || disfuncaoNeuro || disfuncaoResp || 
                               disfuncaoRen || disfuncaoHep || disfuncaoHemat;
    
    if (temDisfuncaoOrganica) {
      setState(prevState => ({ ...prevState, gravidade: "GRAU III" }));
      return "GRAU III";
    }

    // Verificar critérios Grau II
    const criteriosGrauII = (
      (state.leucocitoseMaior18000 && state.leucocitosValue > 18000) ||
      state.massaPalpavel ||
      state.sintomas72h ||
      (state.inflamacaoLocalGrave && state.inflamacaoAchados.length > 0)
    );
    
    if (criteriosGrauII) {
      setState(prevState => ({ ...prevState, gravidade: "GRAU II" }));
      return "GRAU II";
    }

    setState(prevState => ({ ...prevState, gravidade: "GRAU I" }));
    return "GRAU I";
  };

  // Função para calcular risco cirúrgico
  const calcularRiscoCircurgico = () => {
    // Primeiro calcular o CCI
    const cciCalculado = calcularCCI();
    
    let risco = "BAIXO";
    
    // Critérios baseados nas Tokyo Guidelines 2018
    // Risco MUITO ALTO: CCI ≥ 6 + ASA ≥ III + Grau III
    if (cciCalculado >= 6 && state.asaScore >= 3 && state.gravidade === "GRAU III") {
      risco = "MUITO ALTO";
    }
    // Risco ALTO: CCI ≥ 6 OU ASA ≥ III + idade > 75 OU icterícia
    else if (cciCalculado >= 6 || (state.asaScore >= 3 && state.idade > 75) || state.ictericia) {
      risco = "ALTO";
    }
    // Risco MODERADO: ASA ≥ III OU idade > 70 OU CCI ≥ 4
    else if (state.asaScore >= 3 || state.idade > 70 || cciCalculado >= 4) {
      risco = "MODERADO";
    }
    // Caso contrário, risco BAIXO
    
    // Atualizar o estado com o CCI calculado e o risco
    setState(prevState => ({ 
      ...prevState, 
      cci: cciCalculado,
      riscoCircurgico: risco 
    }));
    
    return risco;
  };

  // Função para calcular CCI (Charlson Comorbidity Index)
  const calcularCCI = () => {
    let pontuacao = 0;
    
    // Baseado no estado das comorbidades selecionadas - 1 ponto cada
    if (state.iamPrevio) pontuacao += 1;
    if (state.iccCongestiva) pontuacao += 1;
    if (state.doencaVascularPeriferica) pontuacao += 1;
    if (state.doencaCerebrovascular) pontuacao += 1;
    if (state.demencia) pontuacao += 1;
    if (state.dpocCronico) pontuacao += 1;
    if (state.doencaTecidoConectivo) pontuacao += 1;
    if (state.ulceraPeptica) pontuacao += 1;
    if (state.hepatopatiaLeve) pontuacao += 1;
    if (state.diabetesSemComplicacao) pontuacao += 1;
    
    // 2 pontos cada
    if (state.diabetesComComplicacao) pontuacao += 2;
    if (state.hemiplegiaParaplegia) pontuacao += 2;
    if (state.doencaRenalGrave) pontuacao += 2;
    if (state.neoplasiaSemMetastase) pontuacao += 2;
    if (state.leucemia) pontuacao += 2;
    if (state.linfoma) pontuacao += 2;
    
    // 3 pontos cada
    if (state.hepatopatiaGrave) pontuacao += 3;
    
    // 6 pontos cada
    if (state.neoplasiaMetastatica) pontuacao += 6;
    if (state.aids) pontuacao += 6;
    
    // Ajuste por idade
    if (state.idade >= 50 && state.idade < 60) pontuacao += 1;
    else if (state.idade >= 60 && state.idade < 70) pontuacao += 2;
    else if (state.idade >= 70 && state.idade < 80) pontuacao += 3;
    else if (state.idade >= 80) pontuacao += 4;
    
    return pontuacao;
  };

  // Função para determinar conduta terapêutica (sem setState)
  const determinarConduta = () => {
    const gravidade = state.gravidade;
    const risco = state.riscoCircurgico;
    
    let conduta = "";
    
    if (gravidade === "GRAU III") {
      // Para Grau III, sempre considerar drenagem percutânea como primeira opção
      // especialmente se há disfunção orgânica
      const temDisfuncaoOrganica = state.disfuncaoCardiovascular || 
                                   state.disfuncaoNeurologica || 
                                   state.disfuncaoRespiratoria || 
                                   state.disfuncaoRenal || 
                                   state.disfuncaoHepatica || 
                                   state.disfuncaoHematologica;
      
      if (temDisfuncaoOrganica || risco === "MUITO ALTO" || risco === "ALTO") {
        conduta = "DRENAGEM_PERCUTANEA_URGENTE";
      } else {
        conduta = "TRATAMENTO_INTENSIVO_CIRURGIA_APOS_ESTABILIZACAO";
      }
    } else if (gravidade === "GRAU II") {
      if (risco === "ALTO" || risco === "MUITO ALTO") {
        conduta = "ANTIBIOTICOTERAPIA_DRENAGEM_SE_NECESSARIO";
      } else {
        conduta = "COLECISTECTOMIA_PRECOCE_72H";
      }
    } else { // GRAU I
      if (risco === "BAIXO" || risco === "MODERADO") {
        conduta = "COLECISTECTOMIA_LAPAROSCOPICA_PRECOCE";
      } else {
        conduta = "TRATAMENTO_CONSERVADOR_INICIAL";
      }
    }
    
    return conduta;
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const proximaEtapa = () => {
    if (state.etapaAtual < 5) {
      setState(prevState => ({ ...prevState, etapaAtual: prevState.etapaAtual + 1 }));
    }
  };

  const etapaAnterior = () => {
    if (state.etapaAtual > 1) {
      setState(prevState => ({ ...prevState, etapaAtual: prevState.etapaAtual - 1 }));
    }
  };

  const podeAvancar = () => {
    switch (state.etapaAtual) {
      case 1:
        return state.murphyPositivo || state.dorQSD || state.sensibilidadeQSD || 
               state.febre || state.pcrElevada || state.leucocitose || 
               state.usgPositivo || state.tcPositivo || state.rmPositivo;
      case 2:
        return state.diagnostico !== "";
      case 3:
        return state.gravidade !== "";
      case 4:
        return state.idade > 0 && state.cci >= 0 && state.asaScore > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  // Renderização da Etapa 1 - Critérios Diagnósticos
  const renderEtapa1 = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Stethoscope className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Critérios Diagnósticos - Tokyo Guidelines 2018</h3>
        </div>
        
        <div className="space-y-4">
          {/* Critério A - Sinais Locais de Inflamação */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('criterioA')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 rounded">
                  <span className="text-sm font-semibold text-blue-600">A</span>
                </div>
                <span className="font-medium text-gray-900">Critério A - Sinais Locais de Inflamação</span>
              </div>
              {expandedSections.criterioA ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSections.criterioA && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Definição:</strong> Presença de sinais clínicos de inflamação na vesícula biliar
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="murphy"
                      checked={state.murphyPositivo}
                      onCheckedChange={(checked) => setState(prev => ({ ...prev, murphyPositivo: checked as boolean }))}
                    />
                    <label htmlFor="murphy" className="text-sm text-gray-700">
                      <strong>Sinal de Murphy positivo</strong> - Dor à palpação profunda do QSD com parada inspiratória
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dorQSD"
                      checked={state.dorQSD}
                      onCheckedChange={(checked) => setState(prev => ({ ...prev, dorQSD: checked as boolean }))}
                    />
                    <label htmlFor="dorQSD" className="text-sm text-gray-700">
                      <strong>Dor em quadrante superior direito (QSD)</strong> - Dor espontânea ou à palpação
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sensibilidade"
                      checked={state.sensibilidadeQSD}
                      onCheckedChange={(checked) => setState(prev => ({ ...prev, sensibilidadeQSD: checked as boolean }))}
                    />
                    <label htmlFor="sensibilidade" className="text-sm text-gray-700">
                      <strong>Sensibilidade em QSD</strong> - Sensibilidade à palpação do hipocôndrio direito
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Critério B - Sinais Sistêmicos de Inflamação */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('criterioB')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-green-100 rounded">
                  <span className="text-sm font-semibold text-green-600">B</span>
                </div>
                <span className="font-medium text-gray-900">Critério B - Sinais Sistêmicos de Inflamação</span>
              </div>
              {expandedSections.criterioB ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSections.criterioB && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Definição:</strong> Evidência laboratorial ou clínica de resposta inflamatória sistêmica
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="febre"
                        checked={state.febre}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, febre: checked as boolean }))}
                      />
                      <label htmlFor="febre" className="text-sm font-semibold text-gray-700">Febre</label>
                    </div>
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="temperatura" className="text-xs text-gray-600">Temperatura (°C)</Label>
                      <Input
                        id="temperatura"
                        type="number"
                        step="0.1"
                        value={state.temperaturaValue || ''}
                        onChange={(e) => setState(prev => ({ ...prev, temperaturaValue: parseFloat(e.target.value) || 0 }))}
                        placeholder="Ex: 38.5"
                        className="w-32"
                      />
                      <p className="text-xs text-gray-500">Critério: ≥ 37.5°C</p>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="pcr"
                        checked={state.pcrElevada}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, pcrElevada: checked as boolean }))}
                      />
                      <label htmlFor="pcr" className="text-sm font-semibold text-gray-700">PCR elevada</label>
                    </div>
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="pcrValue" className="text-xs text-gray-600">PCR (mg/dL)</Label>
                      <Input
                        id="pcrValue"
                        type="number"
                        step="0.1"
                        value={state.pcrValue || ''}
                        onChange={(e) => setState(prev => ({ ...prev, pcrValue: parseFloat(e.target.value) || 0 }))}
                        placeholder="Ex: 5.2"
                        className="w-32"
                      />
                      <p className="text-xs text-gray-500">Critério: &gt; 3.0 mg/dL</p>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="leucocitose"
                        checked={state.leucocitose}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, leucocitose: checked as boolean }))}
                      />
                      <label htmlFor="leucocitose" className="text-sm font-semibold text-gray-700">Leucocitose ou Leucopenia</label>
                    </div>
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="leucocitos" className="text-xs text-gray-600">Leucócitos (/μL)</Label>
                      <Input
                        id="leucocitos"
                        type="number"
                        value={state.leucocitosValue || ''}
                        onChange={(e) => setState(prev => ({ ...prev, leucocitosValue: parseInt(e.target.value) || 0 }))}
                        placeholder="Ex: 12000"
                        className="w-32"
                      />
                      <p className="text-xs text-gray-500">Critério: &gt; 10.000/μL ou &lt; 4.000/μL</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Critério C - Achados de Imagem */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection('criterioC')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-orange-100 rounded">
                  <span className="text-sm font-semibold text-orange-600">C</span>
                </div>
                <span className="font-medium text-gray-900">Critério C - Achados de Imagem</span>
              </div>
              {expandedSections.criterioC ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSections.criterioC && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm text-orange-800 mb-2">
                    <strong>Definição:</strong> Achados de imagem característicos de colecistite aguda
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="usg"
                        checked={state.usgPositivo}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, usgPositivo: checked as boolean }))}
                      />
                      <label htmlFor="usg" className="text-sm font-semibold text-gray-700">Ultrassonografia</label>
                    </div>
                    <div className="ml-6">
                      <p className="text-xs text-gray-600 mb-2">Achados característicos:</p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <p>• Espessamento da parede vesicular (&gt; 4mm)</p>
                        <p>• Líquido perivesicular</p>
                        <p>• Sinal de Murphy ultrassonográfico</p>
                        <p>• Distensão vesicular</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="tc"
                        checked={state.tcPositivo}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, tcPositivo: checked as boolean }))}
                      />
                      <label htmlFor="tc" className="text-sm font-semibold text-gray-700">Tomografia Computadorizada</label>
                    </div>
                    <div className="ml-6">
                      <p className="text-xs text-gray-600 mb-2">Achados característicos:</p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <p>• Espessamento e realce da parede vesicular</p>
                        <p>• Líquido perivesicular</p>
                        <p>• Densificação da gordura perivesicular</p>
                        <p>• Distensão vesicular</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="rm"
                        checked={state.rmPositivo}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, rmPositivo: checked as boolean }))}
                      />
                      <label htmlFor="rm" className="text-sm font-semibold text-gray-700">Ressonância Magnética</label>
                    </div>
                    <div className="ml-6">
                      <p className="text-xs text-gray-600 mb-2">Achados característicos:</p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <p>• Espessamento da parede vesicular</p>
                        <p>• Edema da parede (alta intensidade em T2)</p>
                        <p>• Líquido perivesicular</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="cprm"
                        checked={state.cprm}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, cprm: checked as boolean }))}
                      />
                      <label htmlFor="cprm" className="text-sm font-semibold text-gray-700">CPRM (Colangiopancreatografia por RM)</label>
                    </div>
                    <div className="ml-6">
                      <p className="text-xs text-gray-500">Útil para avaliar via biliar e descartar coledocolitíase</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderização da Etapa 2 - Diagnóstico
  const renderEtapa2 = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Activity className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Diagnóstico de Colecistite Aguda</h3>
        </div>
        
        <div className="space-y-6">
          {/* Resumo dos Critérios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 ${
              (state.murphyPositivo || state.dorQSD || state.sensibilidadeQSD) 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-blue-100 rounded">
                  <span className="text-xs font-semibold text-blue-600">A</span>
                </div>
                <span className="text-sm font-semibold">Sinais Locais</span>
              </div>
              <p className="text-xs text-gray-600">
                {(state.murphyPositivo || state.dorQSD || state.sensibilidadeQSD) ? 'POSITIVO' : 'NEGATIVO'}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${
              ((state.febre && state.temperaturaValue >= 37.5) || 
               (state.pcrElevada && state.pcrValue > 3.0) || 
               (state.leucocitose && (state.leucocitosValue > 10000 || state.leucocitosValue < 4000)))
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-green-100 rounded">
                  <span className="text-xs font-semibold text-green-600">B</span>
                </div>
                <span className="text-sm font-semibold">Sinais Sistêmicos</span>
              </div>
              <p className="text-xs text-gray-600">
                {((state.febre && state.temperaturaValue >= 37.5) || 
                  (state.pcrElevada && state.pcrValue > 3.0) || 
                  (state.leucocitose && (state.leucocitosValue > 10000 || state.leucocitosValue < 4000)))
                  ? 'POSITIVO' : 'NEGATIVO'}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${
              (state.usgPositivo || state.tcPositivo || state.rmPositivo || state.cprm)
                ? 'border-orange-200 bg-orange-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-orange-100 rounded">
                  <span className="text-xs font-semibold text-orange-600">C</span>
                </div>
                <span className="text-sm font-semibold">Achados de Imagem</span>
              </div>
              <p className="text-xs text-gray-600">
                {(state.usgPositivo || state.tcPositivo || state.rmPositivo || state.cprm) ? 'POSITIVO' : 'NEGATIVO'}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-center">
            <Button
              onClick={calcularDiagnostico}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calcular Diagnóstico
            </Button>
          </div>
          
          {state.diagnostico && (
            <div className={`p-6 rounded-lg border-l-4 ${
              state.diagnostico === 'DEFINITIVA' ? 'bg-green-50 border-green-400' :
              state.diagnostico === 'SUSPEITA' ? 'bg-yellow-50 border-yellow-400' :
              'bg-red-50 border-red-400'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {state.diagnostico === 'DEFINITIVA' ? <CheckCircle className="h-6 w-6 text-green-600" /> :
                 state.diagnostico === 'SUSPEITA' ? <AlertTriangle className="h-6 w-6 text-yellow-600" /> :
                 <XCircle className="h-6 w-6 text-red-600" />}
                <span className="text-lg font-semibold">
                  Colecistite Aguda {state.diagnostico}
                </span>
              </div>
              
              <div className="text-sm space-y-2">
                {state.diagnostico === 'DEFINITIVA' && (
                  <div>
                    <p className="font-semibold text-green-800">Critérios para Diagnóstico Definitivo:</p>
                    <p className="text-green-700">• (A + B + C) ou (A + C)</p>
                    <p className="text-green-700">• Diagnóstico confirmado de colecistite aguda</p>
                  </div>
                )}
                
                {state.diagnostico === 'SUSPEITA' && (
                  <div>
                    <p className="font-semibold text-yellow-800">Critérios para Diagnóstico de Suspeita:</p>
                    <p className="text-yellow-700">• (A + B) apenas</p>
                    <p className="text-yellow-700">• Recomenda-se investigação adicional com imagem</p>
                  </div>
                )}
                
                {state.diagnostico === 'INSUFICIENTE' && (
                  <div>
                    <p className="font-semibold text-red-800">Critérios Insuficientes:</p>
                    <p className="text-red-700">• Não atende aos critérios mínimos</p>
                    <p className="text-red-700">• Considerar outros diagnósticos diferenciais</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Renderização da Etapa 3 - Classificação de Gravidade
  const renderEtapa3 = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Heart className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Classificação de Gravidade - Tokyo Guidelines 2018</h3>
        </div>
        
        <div className="space-y-6">
          {/* Disfunção Orgânica - Grau III */}
          <div className="border border-red-200 rounded-lg">
            <button
              onClick={() => toggleSection('disfuncaoOrganica')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-red-100 rounded">
                  <span className="text-sm font-semibold text-red-600">III</span>
                </div>
                <span className="font-medium text-gray-900">Grau III - Disfunção Orgânica (Colecistite Grave)</span>
              </div>
              {expandedSections.disfuncaoOrganica ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSections.disfuncaoOrganica && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800 mb-2">
                    <strong>Definição:</strong> Presença de qualquer disfunção orgânica associada à colecistite aguda
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* Disfunção Cardiovascular */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        id="cardiovascular"
                        checked={state.disfuncaoCardiovascular}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, disfuncaoCardiovascular: checked as boolean }))}
                      />
                      <label htmlFor="cardiovascular" className="text-sm font-semibold text-gray-700">
                        <Heart className="h-4 w-4 inline mr-1" />
                        Disfunção Cardiovascular
                      </label>
                    </div>
                    
                    {state.disfuncaoCardiovascular && (
                      <div className="ml-6 space-y-3 border-l-2 border-red-200 pl-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hipotensao"
                            checked={state.hipotensao}
                            onCheckedChange={(checked) => setState(prev => ({ ...prev, hipotensao: checked as boolean }))}
                          />
                          <label htmlFor="hipotensao" className="text-xs text-gray-600">Hipotensão</label>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pressaoSist" className="text-xs text-gray-600">Pressão Sistólica (mmHg)</Label>
                          <Input
                            id="pressaoSist"
                            type="number"
                            value={state.pressaoSistolica || ''}
                            onChange={(e) => setState(prev => ({ ...prev, pressaoSistolica: parseInt(e.target.value) || 0 }))}
                            placeholder="Ex: 85"
                            className="w-32"
                          />
                          <p className="text-xs text-gray-500">Critério: &lt; 90 mmHg</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="drogas"
                            checked={state.necessidadeDrogas}
                            onCheckedChange={(checked) => setState(prev => ({ ...prev, necessidadeDrogas: checked as boolean }))}
                          />
                          <label htmlFor="drogas" className="text-xs text-gray-600">
                            Necessidade de drogas vasoativas (dopamina &gt; 5 μg/kg/min ou noradrenalina)
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Disfunção Neurológica */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        id="neurologica"
                        checked={state.disfuncaoNeurologica}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, disfuncaoNeurologica: checked as boolean }))}
                      />
                      <label htmlFor="neurologica" className="text-sm font-semibold text-gray-700">
                        <Brain className="h-4 w-4 inline mr-1" />
                        Disfunção Neurológica
                      </label>
                    </div>
                    
                    {state.disfuncaoNeurologica && (
                      <div className="ml-6 space-y-3 border-l-2 border-red-200 pl-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="consciencia"
                            checked={state.alteracaoConsciencia}
                            onCheckedChange={(checked) => setState(prev => ({ ...prev, alteracaoConsciencia: checked as boolean }))}
                          />
                          <label htmlFor="consciencia" className="text-xs text-gray-600">Alteração do nível de consciência</label>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="glasgow" className="text-xs text-gray-600">Escala de Glasgow</Label>
                          <Input
                            id="glasgow"
                            type="number"
                            min="3"
                            max="15"
                            value={state.glasgowValue || 15}
                            onChange={(e) => setState(prev => ({ ...prev, glasgowValue: parseInt(e.target.value) || 15 }))}
                            placeholder="15"
                            className="w-32"
                          />
                          <p className="text-xs text-gray-500">Critério: &lt; 13</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Disfunção Respiratória */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        id="respiratoria"
                        checked={state.disfuncaoRespiratoria}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, disfuncaoRespiratoria: checked as boolean }))}
                      />
                      <label htmlFor="respiratoria" className="text-sm font-semibold text-gray-700">
                        <Activity className="h-4 w-4 inline mr-1" />
                        Disfunção Respiratória
                      </label>
                    </div>
                    
                    {state.disfuncaoRespiratoria && (
                      <div className="ml-6 space-y-3 border-l-2 border-red-200 pl-4">
                        <div className="space-y-2">
                          <Label htmlFor="pao2fio2" className="text-xs text-gray-600">Relação PaO2/FiO2</Label>
                          <Input
                            id="pao2fio2"
                            type="number"
                            value={state.pao2fio2 || ''}
                            onChange={(e) => setState(prev => ({ ...prev, pao2fio2: parseInt(e.target.value) || 0 }))}
                            placeholder="Ex: 250"
                            className="w-32"
                          />
                          <p className="text-xs text-gray-500">Critério: &lt; 300</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="ventilacao"
                            checked={state.necessidadeVentilacao}
                            onCheckedChange={(checked) => setState(prev => ({ ...prev, necessidadeVentilacao: checked as boolean }))}
                          />
                          <label htmlFor="ventilacao" className="text-xs text-gray-600">
                            Necessidade de ventilação mecânica
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Disfunção Renal */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        id="renal"
                        checked={state.disfuncaoRenal}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, disfuncaoRenal: checked as boolean }))}
                      />
                      <label htmlFor="renal" className="text-sm font-semibold text-gray-700">
                        <Droplets className="h-4 w-4 inline mr-1" />
                        Disfunção Renal
                      </label>
                    </div>
                    
                    {state.disfuncaoRenal && (
                      <div className="ml-6 space-y-3 border-l-2 border-red-200 pl-4">
                        <div className="space-y-2">
                          <Label htmlFor="creatinina" className="text-xs text-gray-600">Creatinina sérica (mg/dL)</Label>
                          <Input
                            id="creatinina"
                            type="number"
                            step="0.1"
                            value={state.creatininaValue || ''}
                            onChange={(e) => setState(prev => ({ ...prev, creatininaValue: parseFloat(e.target.value) || 0 }))}
                            placeholder="Ex: 2.5"
                            className="w-32"
                          />
                          <p className="text-xs text-gray-500">Critério: &gt; 2.0 mg/dL</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="oliguria"
                            checked={state.oliguria}
                            onCheckedChange={(checked) => setState(prev => ({ ...prev, oliguria: checked as boolean }))}
                          />
                          <label htmlFor="oliguria" className="text-xs text-gray-600">Oligúria</label>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="diurese" className="text-xs text-gray-600">Diurese 24h (mL)</Label>
                          <Input
                            id="diurese"
                            type="number"
                            value={state.diurese24h || ''}
                            onChange={(e) => setState(prev => ({ ...prev, diurese24h: parseInt(e.target.value) || 0 }))}
                            placeholder="Ex: 300"
                            className="w-32"
                          />
                          <p className="text-xs text-gray-500">Critério: &lt; 400 mL/24h</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Disfunção Hepática */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        id="hepatica"
                        checked={state.disfuncaoHepatica}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, disfuncaoHepatica: checked as boolean }))}
                      />
                      <label htmlFor="hepatica" className="text-sm font-semibold text-gray-700">
                        <Zap className="h-4 w-4 inline mr-1" />
                        Disfunção Hepática
                      </label>
                    </div>
                    
                    {state.disfuncaoHepatica && (
                      <div className="ml-6 space-y-3 border-l-2 border-red-200 pl-4">
                        <div className="space-y-2">
                          <Label htmlFor="bilirrubina" className="text-xs text-gray-600">Bilirrubina Total (mg/dL)</Label>
                          <Input
                            id="bilirrubina"
                            type="number"
                            step="0.1"
                            value={state.bilirrubinaTotal || ''}
                            onChange={(e) => setState(prev => ({ ...prev, bilirrubinaTotal: parseFloat(e.target.value) || 0 }))}
                            placeholder="Ex: 3.5"
                            className="w-32"
                          />
                          <p className="text-xs text-gray-500">Critério: &gt; 2.0 mg/dL</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Disfunção Hematológica */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Checkbox
                        id="hematologica"
                        checked={state.disfuncaoHematologica}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, disfuncaoHematologica: checked as boolean }))}
                      />
                      <label htmlFor="hematologica" className="text-sm font-semibold text-gray-700">
                        <Droplets className="h-4 w-4 inline mr-1" />
                        Disfunção Hematológica
                      </label>
                    </div>
                    
                    {state.disfuncaoHematologica && (
                      <div className="ml-6 space-y-3 border-l-2 border-red-200 pl-4">
                        <div className="space-y-2">
                          <Label htmlFor="plaquetas" className="text-xs text-gray-600">Plaquetas (/μL)</Label>
                          <Input
                            id="plaquetas"
                            type="number"
                            value={state.plaquetas || ''}
                            onChange={(e) => setState(prev => ({ ...prev, plaquetas: parseInt(e.target.value) || 0 }))}
                            placeholder="Ex: 80000"
                            className="w-32"
                          />
                          <p className="text-xs text-gray-500">Critério: &lt; 100.000/μL</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Critérios Grau II */}
          <div className="border border-yellow-200 rounded-lg">
            <button
              onClick={() => toggleSection('criteriosGrauII')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-yellow-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-yellow-100 rounded">
                  <span className="text-sm font-semibold text-yellow-600">II</span>
                </div>
                <span className="font-medium text-gray-900">Grau II - Colecistite Moderada</span>
              </div>
              {expandedSections.criteriosGrauII ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSections.criteriosGrauII && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>Definição:</strong> Presença de qualquer um dos critérios abaixo, sem disfunção orgânica
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="leucocitose18000"
                        checked={state.leucocitoseMaior18000}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, leucocitoseMaior18000: checked as boolean }))}
                      />
                      <label htmlFor="leucocitose18000" className="text-sm font-semibold text-gray-700">
                        Leucocitose marcante
                      </label>
                    </div>
                    <div className="ml-6">
                      <p className="text-xs text-gray-500">Critério: &gt; 18.000/μL</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Valor atual: {state.leucocitosValue > 0 ? `${state.leucocitosValue.toLocaleString()}/μL` : 'Não informado'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="massa"
                      checked={state.massaPalpavel}
                      onCheckedChange={(checked) => setState(prev => ({ ...prev, massaPalpavel: checked as boolean }))}
                    />
                    <label htmlFor="massa" className="text-sm text-gray-700">
                      <strong>Massa palpável em quadrante superior direito</strong>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sintomas72h"
                      checked={state.sintomas72h}
                      onCheckedChange={(checked) => setState(prev => ({ ...prev, sintomas72h: checked as boolean }))}
                    />
                    <label htmlFor="sintomas72h" className="text-sm text-gray-700">
                      <strong>Duração dos sintomas &gt; 72 horas</strong>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="inflamacao"
                        checked={state.inflamacaoLocalGrave}
                        onCheckedChange={(checked) => setState(prev => ({ ...prev, inflamacaoLocalGrave: checked as boolean }))}
                      />
                      <label htmlFor="inflamacao" className="text-sm font-semibold text-gray-700">
                        Inflamação local grave
                      </label>
                    </div>
                    <div className="ml-6">
                      <p className="text-xs text-gray-600 mb-2">Achados característicos:</p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <p>• Colecistite gangrenosa</p>
                        <p>• Abscesso perivesicular</p>
                        <p>• Perfuração hepática</p>
                        <p>• Colecistite enfisematosa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Grau I */}
          <div className="border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-green-100 rounded">
                <span className="text-sm font-semibold text-green-600">I</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Grau I - Colecistite Leve</span>
                <p className="text-sm text-gray-600 mt-1">
                  Não atende aos critérios para Grau II ou III. Colecistite aguda em paciente saudável, 
                  sem disfunção orgânica e sem sinais de inflamação local grave.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-center">
            <Button
              onClick={calcularGravidade}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calcular Gravidade
            </Button>
          </div>
          
          {state.gravidade && (
            <div className={`p-6 rounded-lg border-l-4 ${
              state.gravidade === 'GRAU III' ? 'bg-red-50 border-red-400' :
              state.gravidade === 'GRAU II' ? 'bg-yellow-50 border-yellow-400' :
              'bg-green-50 border-green-400'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {state.gravidade === 'GRAU III' ? <XCircle className="h-6 w-6 text-red-600" /> :
                 state.gravidade === 'GRAU II' ? <AlertTriangle className="h-6 w-6 text-yellow-600" /> :
                 <CheckCircle className="h-6 w-6 text-green-600" />}
                <span className="text-lg font-semibold">
                  Colecistite Aguda {state.gravidade}
                </span>
              </div>
              
              <div className="text-sm space-y-2">
                {state.gravidade === 'GRAU III' && (
                  <div>
                    <p className="font-semibold text-red-800">Colecistite Grave:</p>
                    <p className="text-red-700">• Presença de disfunção orgânica</p>
                    <p className="text-red-700">• Requer tratamento intensivo imediato</p>
                    <p className="text-red-700">• Considerar drenagem percutânea ou cirurgia de urgência</p>
                  </div>
                )}
                
                {state.gravidade === 'GRAU II' && (
                  <div>
                    <p className="font-semibold text-yellow-800">Colecistite Moderada:</p>
                    <p className="text-yellow-700">• Inflamação local significativa sem disfunção orgânica</p>
                    <p className="text-yellow-700">• Colecistectomia precoce (dentro de 72h) ou tratamento conservador</p>
                    <p className="text-yellow-700">• Monitorização clínica rigorosa</p>
                  </div>
                )}
                
                {state.gravidade === 'GRAU I' && (
                  <div>
                    <p className="font-semibold text-green-800">Colecistite Leve:</p>
                    <p className="text-green-700">• Inflamação local leve em paciente saudável</p>
                    <p className="text-green-700">• Colecistectomia laparoscópica precoce é o tratamento de escolha</p>
                    <p className="text-green-700">• Excelente prognóstico</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Renderização da Etapa 4 - Avaliação de Risco Cirúrgico
  const renderEtapa4 = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Target className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Avaliação de Risco Cirúrgico</h3>
        </div>
        
        <div className="space-y-6">
          {/* Dados Demográficos */}
          <div className="border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              Dados Demográficos
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idade" className="text-sm text-gray-700">Idade (anos)</Label>
                <Input
                  id="idade"
                  type="number"
                  value={state.idade || ''}
                  onChange={(e) => setState(prev => ({ ...prev, idade: parseInt(e.target.value) || 0 }))}
                  placeholder="Ex: 65"
                  className="w-32"
                />
                <p className="text-xs text-gray-500">Fator de risco: &gt; 70 anos</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">Sexo</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="masculino"
                      checked={state.sexoMasculino}
                      onCheckedChange={(checked) => setState(prev => ({ 
                        ...prev, 
                        sexoMasculino: checked as boolean,
                        sexoFeminino: checked ? false : prev.sexoFeminino
                      }))}
                    />
                    <label htmlFor="masculino" className="text-sm text-gray-600">Masculino</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="feminino"
                      checked={state.sexoFeminino}
                      onCheckedChange={(checked) => setState(prev => ({ 
                        ...prev, 
                        sexoFeminino: checked as boolean,
                        sexoMasculino: checked ? false : prev.sexoMasculino
                      }))}
                    />
                    <label htmlFor="feminino" className="text-sm text-gray-600">Feminino</label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Sexo masculino é fator de risco adicional</p>
              </div>
            </div>
          </div>

          {/* Classificação ASA */}
          <div className="border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Classificação ASA (American Society of Anesthesiologists)
            </h4>
            
            <div className="space-y-3">
              {[
                { value: 1, label: 'ASA I', desc: 'Paciente saudável normal' },
                { value: 2, label: 'ASA II', desc: 'Paciente com doença sistêmica leve' },
                { value: 3, label: 'ASA III', desc: 'Paciente com doença sistêmica grave' },
                { value: 4, label: 'ASA IV', desc: 'Paciente com doença sistêmica grave que é ameaça constante à vida' },
                { value: 5, label: 'ASA V', desc: 'Paciente moribundo que não se espera que sobreviva sem a operação' }
              ].map((asa) => (
                <div key={asa.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`asa${asa.value}`}
                    checked={state.asaScore === asa.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setState(prev => ({ ...prev, asaScore: asa.value }));
                      }
                    }}
                  />
                  <div className="flex-1">
                    <label htmlFor={`asa${asa.value}`} className="text-sm font-medium text-gray-700">
                      {asa.label}
                    </label>
                    <p className="text-xs text-gray-500">{asa.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Critério de Alto Risco:</strong> ASA ≥ III (ASA III, IV ou V)
              </p>
            </div>
          </div>

          {/* Índice de Comorbidade de Charlson (CCI) */}
          <div className="border border-purple-200 rounded-lg">
            <button
              onClick={() => toggleSection('charlsonIndex')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-50 transition-colors"
            >
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Índice de Comorbidade de Charlson (CCI)
              </h4>
              {expandedSections.charlsonIndex ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSections.charlsonIndex && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-800 mb-2">
                    <strong>Critério de Alto Risco:</strong> CCI ≥ 6 pontos
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* Comorbidades - 1 ponto */}
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-medium text-gray-800 mb-3">Comorbidades - 1 ponto cada</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        { key: 'iamPrevio', label: 'Infarto do miocárdio prévio' },
                        { key: 'iccCongestiva', label: 'Insuficiência cardíaca congestiva' },
                        { key: 'doencaVascularPeriferica', label: 'Doença vascular periférica' },
                        { key: 'doencaCerebrovascular', label: 'Doença cerebrovascular' },
                        { key: 'demencia', label: 'Demência' },
                        { key: 'dpocCronico', label: 'DPOC crônico' },
                        { key: 'doencaTecidoConectivo', label: 'Doença do tecido conectivo' },
                        { key: 'ulceraPeptica', label: 'Úlcera péptica' },
                        { key: 'hepatopatiaLeve', label: 'Hepatopatia leve' },
                        { key: 'diabetesSemComplicacao', label: 'Diabetes sem complicação' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={item.key}
                            checked={state[item.key as keyof GuideFlowState] as boolean || false}
                            onCheckedChange={(checked) => setState(prev => ({ 
                              ...prev, 
                              [item.key]: checked as boolean 
                            }))}
                          />
                          <label htmlFor={item.key} className="text-xs text-gray-600">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comorbidades - 2 pontos */}
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-medium text-gray-800 mb-3">Comorbidades - 2 pontos cada</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        { key: 'diabetesComComplicacao', label: 'Diabetes com complicação' },
                        { key: 'hemiplegiaParaplegia', label: 'Hemiplegia ou paraplegia' },
                        { key: 'doencaRenalGrave', label: 'Doença renal grave' },
                        { key: 'neoplasiaSemMetastase', label: 'Neoplasia sem metástase' },
                        { key: 'leucemia', label: 'Leucemia' },
                        { key: 'linfoma', label: 'Linfoma' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={item.key}
                            checked={state[item.key as keyof GuideFlowState] as boolean || false}
                            onCheckedChange={(checked) => setState(prev => ({ 
                              ...prev, 
                              [item.key]: checked as boolean 
                            }))}
                          />
                          <label htmlFor={item.key} className="text-xs text-gray-600">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comorbidades - 3 pontos */}
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-medium text-gray-800 mb-3">Comorbidades - 3 pontos cada</h5>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hepatopatiaGrave"
                          checked={state.hepatopatiaGrave}
                          onCheckedChange={(checked) => setState(prev => ({ ...prev, hepatopatiaGrave: checked as boolean }))}
                        />
                        <label htmlFor="hepatopatiaGrave" className="text-xs text-gray-600">
                          Hepatopatia moderada a grave
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Comorbidades - 6 pontos */}
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h5 className="font-medium text-gray-800 mb-3">Comorbidades - 6 pontos cada</h5>
                    <div className="space-y-2">
                      {[
                        { key: 'neoplasiaMetastatica', label: 'Neoplasia metastática' },
                        { key: 'aids', label: 'AIDS' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={item.key}
                            checked={state[item.key as keyof GuideFlowState] as boolean || false}
                            onCheckedChange={(checked) => setState(prev => ({ 
                              ...prev, 
                              [item.key]: checked as boolean 
                            }))}
                          />
                          <label htmlFor={item.key} className="text-xs text-gray-600">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>CCI Calculado:</strong> {calcularCCI()} pontos
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {calcularCCI() >= 6 ? 'Alto risco cirúrgico (CCI ≥ 6)' : 'Risco cirúrgico aceitável (CCI &lt; 6)'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Comorbidades Específicas Adicionais */}
          <div className="border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Comorbidades Específicas de Alto Risco
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cirroseBiliar"
                  checked={state.cirroseBiliar}
                  onCheckedChange={(checked) => setState(prev => ({ ...prev, cirroseBiliar: checked as boolean }))}
                />
                <label htmlFor="cirroseBiliar" className="text-sm text-gray-700">
                  <strong>Cirrose biliar primária</strong>
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="colangiteEsclerosante"
                  checked={state.colangiteEsclerosante}
                  onCheckedChange={(checked) => setState(prev => ({ ...prev, colangiteEsclerosante: checked as boolean }))}
                />
                <label htmlFor="colangiteEsclerosante" className="text-sm text-gray-700">
                  <strong>Colangite esclerosante primária</strong>
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ictericia"
                  checked={state.ictericia}
                  onCheckedChange={(checked) => setState(prev => ({ ...prev, ictericia: checked as boolean }))}
                />
                <label htmlFor="ictericia" className="text-sm text-gray-700">
                  <strong>Icterícia</strong>
                </label>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-center">
            <Button
              onClick={calcularRiscoCircurgico}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calcular Risco Cirúrgico
            </Button>
          </div>
          
          {state.riscoCircurgico && (
            <div className={`p-6 rounded-lg border-l-4 ${
              state.riscoCircurgico === 'ALTO' ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {state.riscoCircurgico === 'ALTO' ? 
                  <XCircle className="h-6 w-6 text-red-600" /> : 
                  <CheckCircle className="h-6 w-6 text-green-600" />
                }
                <span className="text-lg font-semibold">
                  Risco Cirúrgico: {state.riscoCircurgico}
                </span>
              </div>
              
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-semibold text-blue-800">Score CCI: {state.cci} pontos</p>
                  <p className="font-semibold text-blue-800">ASA Score: {state.asaScore}</p>
                </div>
                
                {state.riscoCircurgico === 'ALTO' && (
                  <div>
                    <p className="font-semibold text-red-800">Critérios de Alto Risco identificados:</p>
                    <div className="text-red-700 space-y-1">
                      {state.idade && state.idade > 70 && <p>• Idade &gt; 70 anos</p>}
                      {state.asaScore && state.asaScore >= 3 && <p>• ASA ≥ III</p>}
                      {state.cci >= 6 && <p>• CCI ≥ 6 pontos</p>}
                      {state.ictericia && <p>• Icterícia</p>}
                    </div>
                    <p className="text-red-700 mt-2">• Considerar tratamento conservador ou drenagem percutânea</p>
                  </div>
                )}
                
                {state.riscoCircurgico === 'BAIXO' && (
                  <div>
                    <p className="font-semibold text-green-800">Risco Cirúrgico Baixo:</p>
                    <p className="text-green-700">• Paciente candidato à colecistectomia</p>
                    <p className="text-green-700">• Avaliar timing baseado na gravidade da colecistite</p>
                  </div>
                )}
                
                {state.riscoCircurgico === 'MODERADO' && (
                  <div>
                    <p className="font-semibold text-yellow-800">Risco Cirúrgico Moderado:</p>
                    <p className="text-yellow-700">• Avaliar cuidadosamente benefícios vs riscos</p>
                    <p className="text-yellow-700">• Considerar otimização clínica pré-operatória</p>
                  </div>
                )}
                
                {state.riscoCircurgico === 'MUITO ALTO' && (
                  <div>
                    <p className="font-semibold text-red-800">Risco Cirúrgico Muito Alto:</p>
                    <p className="text-red-700">• Considerar fortemente tratamento conservador</p>
                    <p className="text-red-700">• Drenagem percutânea pode ser preferível</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Renderização da Etapa 5 - Condutas Terapêuticas e Seguimento
  const renderEtapa5 = () => {
    const conduta = determinarConduta();
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Etapa 5 - Condutas Terapêuticas e Seguimento</h3>
          </div>
          
          <div className="space-y-6">
            {/* Resumo do Caso */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Resumo da Avaliação
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    state.diagnostico === 'DEFINITIVA' ? 'bg-green-100 text-green-800' :
                    state.diagnostico === 'SUSPEITA' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {state.diagnostico || 'NÃO AVALIADO'}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Diagnóstico</p>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    state.gravidade === 'GRAU III' ? 'bg-red-100 text-red-800' :
                    state.gravidade === 'GRAU II' ? 'bg-yellow-100 text-yellow-800' :
                    state.gravidade === 'GRAU I' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {state.gravidade || 'NÃO AVALIADO'}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Gravidade</p>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    state.riscoCircurgico === 'ALTO' || state.riscoCircurgico === 'MUITO ALTO' ? 'bg-red-100 text-red-800' :
                    state.riscoCircurgico === 'MODERADO' ? 'bg-yellow-100 text-yellow-800' :
                    state.riscoCircurgico === 'BAIXO' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {state.riscoCircurgico || 'NÃO AVALIADO'}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Risco Cirúrgico</p>
                </div>
              </div>
            </div>
            
            {/* Conduta Recomendada */}
            <div className="border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                Conduta Terapêutica Recomendada
              </h4>
              
              {conduta === 'COLECISTECTOMIA_URGENTE' && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      COLECISTECTOMIA DE URGÊNCIA
                    </h5>
                    <div className="text-sm text-red-700 space-y-3">
                      <p><strong>Indicação:</strong> Colecistite Grau III com risco cirúrgico aceitável</p>
                      <div>
                        <p><strong>Procedimento:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Colecistectomia laparoscópica de urgência (preferencial)</li>
                          <li>Conversão para cirurgia aberta se necessário</li>
                          <li>Antibioticoterapia pré-operatória</li>
                          <li>Suporte hemodinâmico e correção de disfunções orgânicas</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Timing:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Cirurgia dentro de 6-12 horas</li>
                          <li>Estabilização clínica prévia se necessário</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {conduta === 'DRENAGEM_PERCUTANEA_URGENTE' && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <Syringe className="h-4 w-4" />
                      DRENAGEM PERCUTÂNEA URGENTE
                    </h5>
                    <div className="text-sm text-red-700 space-y-3">
                      <p><strong>Indicação:</strong> Colecistite Grau III com alto risco cirúrgico</p>
                      <div>
                        <p><strong>Procedimento:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Drenagem percutânea guiada por ultrassom ou TC</li>
                          <li>Cateter de drenagem 8-12 Fr</li>
                          <li>Antibioticoterapia de amplo espectro</li>
                          <li>Suporte intensivo das disfunções orgânicas</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Seguimento:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Reavaliação cirúrgica após estabilização</li>
                          <li>Colecistectomia eletiva posterior se indicada</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {conduta === 'COLECISTECTOMIA_PRECOCE' && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      COLECISTECTOMIA PRECOCE
                    </h5>
                    <div className="text-sm text-yellow-700 space-y-3">
                      <p><strong>Indicação:</strong> Colecistite Grau II com risco cirúrgico aceitável</p>
                      <div>
                        <p><strong>Procedimento:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Colecistectomia laparoscópica precoce (preferencial)</li>
                          <li>Antibioticoterapia pré-operatória</li>
                          <li>Preparo pré-operatório adequado</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Timing:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Cirurgia dentro de 72 horas do início dos sintomas</li>
                          <li>Preferencialmente nas primeiras 24-48 horas</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {conduta === 'TRATAMENTO_CONSERVADOR' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      TRATAMENTO CONSERVADOR
                    </h5>
                    <div className="text-sm text-blue-700 space-y-3">
                      <p><strong>Indicação:</strong> Colecistite Grau II com alto risco cirúrgico</p>
                      <div>
                        <p><strong>Medidas:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Antibioticoterapia endovenosa</li>
                          <li>Jejum e hidratação adequada</li>
                          <li>Analgesia e antiespasmódicos</li>
                          <li>Monitorização clínica rigorosa</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Reavaliação:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Colecistectomia eletiva após 6-8 semanas</li>
                          <li>Drenagem percutânea se deterioração</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {conduta === 'COLECISTECTOMIA_ELETIVA' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      COLECISTECTOMIA ELETIVA
                    </h5>
                    <div className="text-sm text-green-700 space-y-3">
                      <p><strong>Indicação:</strong> Colecistite Grau I</p>
                      <div>
                        <p><strong>Procedimento:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Colecistectomia laparoscópica eletiva</li>
                          <li>Antibioticoterapia se indicada</li>
                          <li>Preparo pré-operatório de rotina</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Timing:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                          <li>Cirurgia dentro de 72 horas (preferencial)</li>
                          <li>Ou após tratamento conservador (6-8 semanas)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!conduta && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-center">
                    Complete as etapas anteriores para determinar a conduta terapêutica
                  </p>
                </div>
              )}
              
              {conduta === 'TRATAMENTO_INTENSIVO_CIRURGIA_APOS_ESTABILIZACAO' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h5 className="font-semibold text-orange-800 mb-2">TRATAMENTO INTENSIVO + CIRURGIA APÓS ESTABILIZAÇÃO</h5>
                    <div className="text-sm text-orange-700 space-y-2">
                      <p><strong>Indicação:</strong> Colecistite Grau III com risco cirúrgico moderado/alto</p>
                      <p><strong>Tratamento inicial:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Antibioticoterapia IV de amplo espectro</li>
                        <li>Suporte hemodinâmico e correção de disfunções orgânicas</li>
                        <li>Jejum e descompressão gástrica</li>
                        <li>Controle da dor</li>
                      </ul>
                      <p><strong>Cirurgia:</strong> Colecistectomia após estabilização (24-72h)</p>
                    </div>
                  </div>
                </div>
              )}
              
              {conduta === 'ANTIBIOTICOTERAPIA_DRENAGEM_SE_NECESSARIO' && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">ANTIBIOTICOTERAPIA + DRENAGEM SE NECESSÁRIO</h5>
                    <div className="text-sm text-yellow-700 space-y-2">
                      <p><strong>Indicação:</strong> Colecistite Grau II com risco cirúrgico alto</p>
                      <p><strong>Tratamento:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Antibioticoterapia IV por 7-10 dias</li>
                        <li>Drenagem percutânea se não houver melhora em 24-48h</li>
                        <li>Colecistectomia eletiva após 6-8 semanas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {conduta === 'COLECISTECTOMIA_PRECOCE_72H' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">COLECISTECTOMIA PRECOCE (≤ 72H)</h5>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p><strong>Indicação:</strong> Colecistite Grau II com risco cirúrgico baixo/moderado</p>
                      <p><strong>Procedimento:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Colecistectomia laparoscópica preferencialmente</li>
                        <li>Conversão para cirurgia aberta se necessário</li>
                        <li>Antibioticoterapia perioperatória</li>
                      </ul>
                      <p><strong>Vantagens:</strong> Menor tempo de internação, resolução definitiva</p>
                    </div>
                  </div>
                </div>
              )}
              
              {conduta === 'COLECISTECTOMIA_LAPAROSCOPICA_PRECOCE' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">COLECISTECTOMIA LAPAROSCÓPICA PRECOCE</h5>
                    <div className="text-sm text-green-700 space-y-2">
                      <p><strong>Indicação:</strong> Colecistite Grau I com risco cirúrgico baixo</p>
                      <p><strong>Procedimento:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Colecistectomia laparoscópica dentro de 24-72h</li>
                        <li>Técnica padrão de 4 portais</li>
                        <li>Antibioticoterapia profilática</li>
                      </ul>
                      <p><strong>Prognóstico:</strong> Excelente, com baixa morbidade</p>
                    </div>
                  </div>
                </div>
              )}
              
              {conduta === 'TRATAMENTO_CONSERVADOR_INICIAL' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-2">TRATAMENTO CONSERVADOR INICIAL</h5>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><strong>Indicação:</strong> Colecistite Grau I com risco cirúrgico alto</p>
                      <p><strong>Tratamento:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Antibioticoterapia oral ou IV conforme gravidade</li>
                        <li>Analgesia adequada</li>
                        <li>Dieta progressiva</li>
                        <li>Colecistectomia eletiva após 6-8 semanas</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Protocolo de Antibioticoterapia */}
            <div className="border border-blue-200 rounded-lg">
              <button
                onClick={() => toggleSection('antibioticos')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  Protocolo de Antibioticoterapia
                </h4>
                {expandedSections.antibioticos ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {expandedSections.antibioticos && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Grau I - Colecistite Leve */}
                  <div className="border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Circle className="h-3 w-3 fill-green-600" />
                      Grau I - Colecistite Leve
                    </h5>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800 mb-2">Primeira Escolha:</p>
                        <div className="text-sm text-green-700 space-y-1">
                          <p><strong>Ampicilina/Sulbactam:</strong> 3g IV 6/6h</p>
                          <p><strong>Ou Amoxicilina/Clavulanato:</strong> 1g VO 8/8h (casos leves)</p>
                          <p><strong>Duração:</strong> 3-5 dias ou até melhora clínica</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800 mb-2">Alternativas:</p>
                        <div className="text-sm text-green-700 space-y-1">
                          <p><strong>Cefazolina:</strong> 1-2g IV 8/8h + Metronidazol 500mg IV 8/8h</p>
                          <p><strong>Ciprofloxacino:</strong> 400mg IV 12/12h + Metronidazol 500mg IV 8/8h</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grau II - Colecistite Moderada */}
                  <div className="border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 fill-yellow-600" />
                      Grau II - Colecistite Moderada
                    </h5>
                    <div className="space-y-3">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800 mb-2">Primeira Escolha:</p>
                        <div className="text-sm text-yellow-700 space-y-1">
                          <p><strong>Piperacilina/Tazobactam:</strong> 4,5g IV 8/8h</p>
                          <p><strong>Ou Ampicilina/Sulbactam:</strong> 3g IV 6/6h</p>
                          <p><strong>Duração:</strong> 5-7 dias</p>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800 mb-2">Alternativas:</p>
                        <div className="text-sm text-yellow-700 space-y-1">
                          <p><strong>Ceftriaxona:</strong> 2g IV 24/24h + Metronidazol 500mg IV 8/8h</p>
                          <p><strong>Ciprofloxacino:</strong> 400mg IV 12/12h + Metronidazol 500mg IV 8/8h</p>
                          <p><strong>Ertapenem:</strong> 1g IV 24/24h (casos complicados)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grau III - Colecistite Grave */}
                  <div className="border border-red-200 rounded-lg p-4">
                    <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <XCircle className="h-3 w-3 fill-red-600" />
                      Grau III - Colecistite Grave
                    </h5>
                    <div className="space-y-3">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-red-800 mb-2">Primeira Escolha:</p>
                        <div className="text-sm text-red-700 space-y-1">
                          <p><strong>Piperacilina/Tazobactam:</strong> 4,5g IV 6/6h</p>
                          <p><strong>Ou Meropenem:</strong> 1g IV 8/8h</p>
                          <p><strong>Duração:</strong> 7-14 dias (conforme evolução)</p>
                        </div>
                      </div>
                      
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-red-800 mb-2">Alternativas:</p>
                        <div className="text-sm text-red-700 space-y-1">
                          <p><strong>Imipenem/Cilastatina:</strong> 500mg IV 6/6h</p>
                          <p><strong>Cefepime:</strong> 2g IV 12/12h + Metronidazol 500mg IV 8/8h</p>
                          <p><strong>Vancomicina:</strong> 15-20mg/kg IV 12/12h (se suspeita de MRSA)</p>
                        </div>
                      </div>
                      
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-red-800 mb-2">Casos Especiais:</p>
                        <div className="text-sm text-red-700 space-y-1">
                          <p><strong>Sepse/Choque:</strong> Considerar associação com Vancomicina ou Linezolida</p>
                          <p><strong>Imunossuprimidos:</strong> Cobertura antifúngica (Fluconazol ou Caspofungina)</p>
                          <p><strong>Falha terapêutica:</strong> Ajustar conforme cultura e antibiograma</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ajustes Especiais */}
                  <div className="border border-purple-200 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Settings className="h-3 w-3" />
                      Ajustes Especiais
                    </h5>
                    <div className="space-y-3">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 mb-2">Insuficiência Renal:</p>
                        <div className="text-sm text-purple-700 space-y-1">
                          <p>• ClCr 30-50 ml/min: Reduzir dose em 25-50%</p>
                          <p>• ClCr &lt; 30 ml/min: Reduzir dose em 50% ou aumentar intervalo</p>
                          <p>• Hemodiálise: Dose após cada sessão</p>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 mb-2">Insuficiência Hepática:</p>
                        <div className="text-sm text-purple-700 space-y-1">
                          <p>• Evitar: Cloranfenicol, Tetraciclinas</p>
                          <p>• Preferir: Beta-lactâmicos, Aminoglicosídeos</p>
                          <p>• Monitorizar função hepática</p>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 mb-2">Alergia à Penicilina:</p>
                        <div className="text-sm text-purple-700 space-y-1">
                          <p>• Ciprofloxacino + Metronidazol</p>
                          <p>• Aztreonam + Clindamicina</p>
                          <p>• Vancomicina + Aztreonam</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Critérios de Seguimento e Alta */}
            <div className="border border-green-200 rounded-lg">
              <button
                onClick={() => toggleSection('seguimento')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-green-50 transition-colors"
              >
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Critérios de Seguimento e Alta
                </h4>
                {expandedSections.seguimento ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {expandedSections.seguimento && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Critérios de Melhora Clínica */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-3">Critérios de Melhora Clínica</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-green-700 mb-2">Sinais Clínicos:</p>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>• Ausência de febre por 24-48h</li>
                          <li>• Redução significativa da dor abdominal</li>
                          <li>• Melhora do estado geral</li>
                          <li>• Tolerância à dieta oral</li>
                          <li>• Ausência de sinais de irritação peritoneal</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-green-700 mb-2">Parâmetros Laboratoriais:</p>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>• Leucócitos &lt; 12.000/mm³</li>
                          <li>• PCR em queda (redução &gt; 50%)</li>
                          <li>• Normalização de bilirrubinas</li>
                          <li>• Estabilização de enzimas hepáticas</li>
                          <li>• Função renal estável</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Critérios de Alta Hospitalar */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-3">Critérios de Alta Hospitalar</h5>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-blue-700 mb-2">Clínicos:</p>
                          <ul className="text-sm text-blue-600 space-y-1">
                            <li>• Afebril por 48h</li>
                            <li>• Dor controlada com analgésicos orais</li>
                            <li>• Dieta oral bem tolerada</li>
                            <li>• Deambulação sem limitações</li>
                            <li>• Ausência de complicações</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-blue-700 mb-2">Laboratoriais:</p>
                          <ul className="text-sm text-blue-600 space-y-1">
                            <li>• Leucócitos normalizando</li>
                            <li>• PCR &lt; 50 mg/L</li>
                            <li>• Função hepática estável</li>
                            <li>• Função renal normal</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">Orientações de Alta:</p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Antibioticoterapia oral se necessário (completar 7-10 dias)</li>
                          <li>• Retorno ambulatorial em 7-14 dias</li>
                          <li>• Orientações sobre sinais de alarme</li>
                          <li>• Agendamento para colecistectomia eletiva (se indicada)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sinais de Alarme */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Sinais de Alarme - Retorno Imediato
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-red-700 mb-2">Sintomas:</p>
                        <ul className="text-sm text-red-600 space-y-1">
                          <li>• Febre persistente ou recorrente</li>
                          <li>• Dor abdominal intensa</li>
                          <li>• Vômitos persistentes</li>
                          <li>• Icterícia progressiva</li>
                          <li>• Alteração do nível de consciência</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-red-700 mb-2">Sinais:</p>
                        <ul className="text-sm text-red-600 space-y-1">
                          <li>• Instabilidade hemodinâmica</li>
                          <li>• Sinais de irritação peritoneal</li>
                          <li>• Oligúria ou anúria</li>
                          <li>• Dispneia ou taquipneia</li>
                          <li>• Sangramento digestivo</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Seguimento Ambulatorial */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-3">Seguimento Ambulatorial</h5>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Primeira Consulta (7-14 dias):</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Avaliação clínica completa</li>
                          <li>• Hemograma e PCR de controle</li>
                          <li>• Ultrassom abdominal se indicado</li>
                          <li>• Discussão sobre colecistectomia eletiva</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Colecistectomia Eletiva:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Timing ideal: 6-8 semanas após episódio agudo</li>
                          <li>• Avaliação pré-operatória completa</li>
                          <li>• Discussão de riscos e benefícios</li>
                          <li>• Preferência por via laparoscópica</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderização principal do componente
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Renderização das Etapas */}
      {state.etapaAtual === 1 && renderEtapa1()}
      {state.etapaAtual === 2 && renderEtapa2()}
      {state.etapaAtual === 3 && renderEtapa3()}
      {state.etapaAtual === 4 && renderEtapa4()}
      {state.etapaAtual === 5 && renderEtapa5()}

      {/* Navegação */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <Button
          onClick={etapaAnterior}
          disabled={state.etapaAtual === 1}
          variant="outline"
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Etapa Anterior
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Info className="h-4 w-4" />
          <span>
            {!podeAvancar() && state.etapaAtual < 5 && "Complete os campos obrigatórios para continuar"}
          </span>
        </div>
        
        <Button
          onClick={proximaEtapa}
          disabled={state.etapaAtual === 5 || !podeAvancar()}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          Próxima Etapa
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GuideFlowColecistite;