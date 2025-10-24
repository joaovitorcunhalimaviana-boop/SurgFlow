/**
 * Sistema de Validação Automática de Guidelines
 *
 * Este sistema valida os cálculos e recomendações dos GuideFlows
 * contra os valores corretos dos guidelines médicos oficiais.
 *
 * CRÍTICO: Este validador garante fidelidade científica e segurança do paciente.
 */

import { GuideFlowAppendicitisState } from '@/types/guideflow-appendicitis';

// ========================================
// VALIDAÇÕES DOS SCORES DIAGNÓSTICOS
// ========================================

export interface ScoreValidationResult {
  isValid: boolean;
  calculatedScore: number;
  errors: string[];
  warnings: string[];
}

/**
 * Valida e calcula o Score de Alvarado (0-10 pontos)
 * Referência: WSES Jerusalem Guidelines 2020, Página 4
 * Recomendação: "We suggest using Alvarado score to rule out acute appendicitis" (Weak/Low)
 */
export function validateAlvaradoScore(state: GuideFlowAppendicitisState): ScoreValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  // Sintomas
  if (state.alvaradoDorMigratoria) score += 1;
  if (state.alvaradoAnorexia) score += 1;
  if (state.alvaradoNauseasVomitos) score += 1;

  // Sinais
  if (state.alvaradoDorFID) score += 2;
  if (state.alvaradoSinalBlumberg) score += 1;
  if (state.alvaradoFebre) score += 1;

  // Laboratório
  if (state.alvaradoLeucocitose) score += 2;
  if (state.alvaradoDesvioEsquerda) score += 1;

  // Validações
  if (score > 10) {
    errors.push('Score de Alvarado excede o máximo de 10 pontos');
  }

  if (score !== state.scoreAlvarado) {
    errors.push(`Score calculado (${score}) difere do armazenado (${state.scoreAlvarado})`);
  }

  // Interpretação correta
  const expectedInterpretation = getAlvaradoInterpretation(score);
  if (state.alvaradoResultado && state.alvaradoResultado !== expectedInterpretation) {
    errors.push(`Interpretação incorreta. Esperado: "${expectedInterpretation}", Encontrado: "${state.alvaradoResultado}"`);
  }

  return {
    isValid: errors.length === 0,
    calculatedScore: score,
    errors,
    warnings
  };
}

function getAlvaradoInterpretation(score: number): string {
  if (score <= 4) return 'Apendicite improvável (considerar diagnósticos alternativos)';
  if (score <= 6) return 'Apendicite possível (solicitar exame de imagem)';
  if (score <= 8) return 'Apendicite provável (considerar cirurgia)';
  return 'Apendicite muito provável (indicação cirúrgica)';
}

/**
 * Valida e calcula o Score AIR (0-12 pontos)
 * Referência: WSES Jerusalem Guidelines 2020, Página 5
 * Recomendação: "We suggest using AIR score to rule out acute appendicitis" (Weak/Low)
 */
export function validateAIRScore(state: GuideFlowAppendicitisState): ScoreValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  // Vômitos e Dor
  if (state.airVomitos) score += 1;
  if (state.airDorFID) score += 1;

  // Descompressão (0-3 pontos)
  let descompressaoPoints = 0;
  if (state.airDescompressaoLeve) descompressaoPoints = 1;
  if (state.airDescompressaoModerada) descompressaoPoints = 2;
  if (state.airDescompressaoIntensa) descompressaoPoints = 3;
  score += descompressaoPoints;

  // Múltiplas descompressões selecionadas - ERRO
  const descompressaoCount = [
    state.airDescompressaoLeve,
    state.airDescompressaoModerada,
    state.airDescompressaoIntensa
  ].filter(Boolean).length;

  if (descompressaoCount > 1) {
    errors.push('⚠️ ERRO CRÍTICO: Apenas UMA intensidade de descompressão deve ser selecionada');
  }

  // Temperatura (0-1 ponto)
  if (state.airTemperatura >= 38.5) score += 1;

  // Leucócitos (0-2 pontos)
  if (state.airLeucocitos >= 15) {
    score += 2;
  } else if (state.airLeucocitos >= 10 && state.airLeucocitos < 15) {
    score += 1;
  }

  // Neutrófilos % (0-2 pontos)
  if (state.airNeutrofilos >= 85) score += 2;
  else if (state.airNeutrofilos >= 70) score += 1;

  // PCR mg/L (0-2 pontos)
  if (state.airPCR >= 50) {
    score += 2;
  } else if (state.airPCR >= 10 && state.airPCR < 50) {
    score += 1;
  }

  // Validações
  if (score > 12) {
    errors.push('⚠️ ERRO CRÍTICO: Score AIR excede o máximo de 12 pontos');
  }

  if (score !== state.scoreAIR) {
    errors.push(`⚠️ ERRO: Score AIR calculado (${score}) difere do armazenado (${state.scoreAIR})`);
  }

  // Interpretação correta
  const expectedInterpretation = getAIRInterpretation(score);
  if (state.airResultado && state.airResultado !== expectedInterpretation) {
    errors.push(`Interpretação incorreta. Esperado: "${expectedInterpretation}", Encontrado: "${state.airResultado}"`);
  }

  return {
    isValid: errors.length === 0,
    calculatedScore: score,
    errors,
    warnings
  };
}

function getAIRInterpretation(score: number): string {
  if (score <= 4) return 'Baixa probabilidade';
  if (score <= 8) return 'Probabilidade intermediária (imagem recomendada)';
  return 'Alta probabilidade';
}

/**
 * Valida e calcula o Score AAS (Adult Appendicitis Score)
 * Referência: WSES Jerusalem Guidelines 2020, Página 5
 * Recomendação: "We suggest using AAS to rule out acute appendicitis" (Weak/Low)
 */
export function validateAASScore(state: GuideFlowAppendicitisState): ScoreValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  // Sintomas e achados clínicos (0-6 pontos)
  if (state.aasDorFID) score += 2;
  if (state.aasMigracaoDor) score += 2;
  if (state.aasSensibilidadeFIDMulher) score += 1;
  if (state.aasSensibilidadeFIDOutros) score += 3;

  // Validações
  if (score !== state.scoreAAS) {
    errors.push(`Score AAS calculado (${score}) difere do armazenado (${state.scoreAAS})`);
  }

  // Interpretação correta
  const expectedInterpretation = getAASInterpretation(score);
  if (state.aasResultado && state.aasResultado !== expectedInterpretation) {
    errors.push(`Interpretação incorreta. Esperado: "${expectedInterpretation}", Encontrado: "${state.aasResultado}"`);
  }

  return {
    isValid: errors.length === 0,
    calculatedScore: score,
    errors,
    warnings
  };
}

function getAASInterpretation(score: number): string {
  if (score <= 10) return 'Baixa probabilidade';
  if (score <= 15) return 'Probabilidade intermediária';
  return 'Alta probabilidade';
}

/**
 * Valida e calcula o PAS (Pediatric Appendicitis Score) (0-10 pontos)
 * Referência: WSES Jerusalem Guidelines 2020, Página 9
 * Recomendação: "We suggest using PAS to aid in diagnosis" (Weak/Moderate)
 */
export function validatePASScore(state: GuideFlowAppendicitisState): ScoreValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  // Febre ≥38°C
  if (state.pasFebre) score += 1;

  // Anorexia
  if (state.pasAnorexia) score += 1;

  // Náuseas/vômitos
  if (state.pasNauseasVomitos) score += 1;

  // Dor migratória para FID
  if (state.pasDorMigratoria) score += 1;

  // Sensibilidade em FID
  if (state.pasSensibilidadeFID) score += 2;

  // Dor à tosse/percussão/pulo
  if (state.pasDorTossePuloPercussao) score += 2;

  // Leucocitose >10.000/mm³
  if (state.pasLeucocitose) score += 1;

  // Neutrofilia >75%
  if (state.pasNeutrofilia) score += 1;

  // Validações
  if (score > 10) {
    errors.push('Score PAS excede o máximo de 10 pontos');
  }

  if (score !== state.scorePAS) {
    errors.push(`Score PAS calculado (${score}) difere do armazenado (${state.scorePAS})`);
  }

  // Interpretação correta
  const expectedInterpretation = getPASInterpretation(score);
  if (state.pasResultado && state.pasResultado !== expectedInterpretation) {
    errors.push(`Interpretação incorreta. Esperado: "${expectedInterpretation}", Encontrado: "${state.pasResultado}"`);
  }

  return {
    isValid: errors.length === 0,
    calculatedScore: score,
    errors,
    warnings
  };
}

function getPASInterpretation(score: number): string {
  if (score <= 3) return 'Baixo risco';
  if (score <= 6) return 'Risco intermediário (imagem recomendada)';
  return 'Alto risco (indicação cirúrgica)';
}

// ========================================
// VALIDAÇÕES DAS RECOMENDAÇÕES WSES
// ========================================

export interface RecommendationValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Valida se a drenagem de rotina NÃO está sendo usada
 * ⚠️ CRÍTICO: Recomendação WSES Página 16
 * "We recommend AGAINST routine abdominal drainage" (Strong CONTRA/High)
 */
export function validateNoDrainage(state: GuideFlowAppendicitisState): RecommendationValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (state.drenagemRotina === true) {
    errors.push(
      '🚨 ERRO CRÍTICO: Drenagem de rotina está CONTRAINDICADA!\n' +
      'Recomendação WSES (Strong CONTRA/High): "We recommend AGAINST routine abdominal drainage"\n' +
      'Drenagem NÃO reduz taxa de abscesso, NÃO reduz infecção, AUMENTA desconforto e pode AUMENTAR risco de infecção.'
    );
  }

  if (state.drenagemExcecao === true && !state.motivoDrenagemExcecao) {
    warnings.push(
      '⚠️ ATENÇÃO: Drenagem por exceção selecionada sem motivo especificado.\n' +
      'Considerar drenagem APENAS se: abscesso residual não removível, hemostasia inadequada, contaminação fecal extensa, necrose de alça com anastomose.'
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Valida antibioticoterapia em apendicite não complicada
 * ⚠️ CRÍTICO: Recomendação WSES Página 19
 * "Single-dose preoperative WITHOUT postoperative continuation" (Strong/High)
 */
export function validateAntibioticNonComplicated(state: GuideFlowAppendicitisState): RecommendationValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (state.classificacao === 'naoComplicada' && state.tratamentoCirurgico) {
    if (!state.antibioticoDoseUnica) {
      warnings.push(
        '⚠️ Recomendação WSES: Dose única pré-operatória (Strong/High)\n' +
        'Esquema: Cefazolina 2g IV + Metronidazol 500mg IV (30-60min antes da incisão)\n' +
        'NÃO continuar antibiótico no pós-operatório'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Valida interval appendectomy
 * ⚠️ MUDANÇA DE PARADIGMA: Recomendação WSES Página 12 e 18
 * "We suggest AGAINST routine interval appendectomy" (Weak CONTRA/Moderate e Weak CONTRA/Low)
 */
export function validateIntervalAppendectomy(state: GuideFlowAppendicitisState): RecommendationValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (state.intervalAppendectomy || state.intervalAppendectomyAposAbscesso) {
    const hasException =
      state.presencaApendicolito ||
      state.suspeitaNeoplasia ||
      state.recorrenciaAposTratamentoConservador ||
      state.preferenciaDoPaciente ||
      state.idadeMaior40 ||
      state.suspeitaNeoplasiaNaImagem;

    if (!hasException) {
      warnings.push(
        '⚠️ MUDANÇA DE PARADIGMA - Interval Appendectomy\n' +
        'Recomendação WSES: NÃO fazer interval appendectomy de ROTINA (Weak CONTRA)\n' +
        'Taxa de recorrência: 7-38%\n' +
        '62-93% dos pacientes NUNCA mais terão problema\n' +
        'Cirurgia eletiva tem riscos próprios\n\n' +
        'Considerar APENAS se:\n' +
        '• Idade >40 anos (risco de neoplasia 10-30%)\n' +
        '• Suspeita de neoplasia na imagem\n' +
        '• Presença de apendicolito\n' +
        '• Recorrência após tratamento conservador\n' +
        '• Preferência do paciente após discussão'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Valida colonoscopia em pacientes >40 anos
 * Recomendação WSES Página 18
 * "We recommend colonoscopy or CT colonography in >40 years" (Strong/Moderate)
 */
export function validateColonoscopy(state: GuideFlowAppendicitisState): RecommendationValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (state.idadeMaior40 && (state.abscessoPeriapendicular || state.fleimaoPeriapendicular)) {
    if (!state.colonoscopiaRecomendada) {
      warnings.push(
        '⚠️ Recomendação WSES (Strong/Moderate): Colonoscopia em >40 anos\n' +
        'Risco de neoplasia colorretal: 10-30%\n' +
        'Realizar após resolução do episódio agudo (6-8 semanas)'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// ========================================
// VALIDAÇÃO COMPLETA DO GUIDEFLOW
// ========================================

export interface CompleteValidationResult {
  isValid: boolean;
  scores: {
    alvarado: ScoreValidationResult;
    air: ScoreValidationResult;
    aas: ScoreValidationResult;
    pas: ScoreValidationResult;
  };
  recommendations: {
    drainage: RecommendationValidation;
    antibiotic: RecommendationValidation;
    intervalAppendectomy: RecommendationValidation;
    colonoscopy: RecommendationValidation;
  };
  criticalErrors: string[];
  allErrors: string[];
  allWarnings: string[];
}

/**
 * Executa validação completa do GuideFlow de Apendicite
 * Retorna todos os erros e avisos encontrados
 */
export function validateCompleteGuideFlow(state: GuideFlowAppendicitisState): CompleteValidationResult {
  // Validar scores
  const alvarado = validateAlvaradoScore(state);
  const air = validateAIRScore(state);
  const aas = validateAASScore(state);
  const pas = validatePASScore(state);

  // Validar recomendações
  const drainage = validateNoDrainage(state);
  const antibiotic = validateAntibioticNonComplicated(state);
  const intervalAppendectomy = validateIntervalAppendectomy(state);
  const colonoscopy = validateColonoscopy(state);

  // Coletar todos os erros
  const allErrors = [
    ...alvarado.errors,
    ...air.errors,
    ...aas.errors,
    ...pas.errors,
    ...drainage.errors,
    ...antibiotic.errors,
    ...intervalAppendectomy.errors,
    ...colonoscopy.errors,
  ];

  // Coletar todos os avisos
  const allWarnings = [
    ...alvarado.warnings,
    ...air.warnings,
    ...aas.warnings,
    ...pas.warnings,
    ...drainage.warnings,
    ...antibiotic.warnings,
    ...intervalAppendectomy.warnings,
    ...colonoscopy.warnings,
  ];

  // Identificar erros críticos (que afetam segurança do paciente)
  const criticalErrors = allErrors.filter(error =>
    error.includes('CRÍTICO') || error.includes('🚨')
  );

  return {
    isValid: allErrors.length === 0,
    scores: {
      alvarado,
      air,
      aas,
      pas,
    },
    recommendations: {
      drainage,
      antibiotic,
      intervalAppendectomy,
      colonoscopy,
    },
    criticalErrors,
    allErrors,
    allWarnings,
  };
}

// ========================================
// FUNÇÕES DE CÁLCULO CORRETAS
// ========================================

/**
 * Calcula o Score de Alvarado com valores corretos
 * USO: Componente deve usar esta função para garantir cálculo correto
 */
export function calculateAlvaradoScore(state: GuideFlowAppendicitisState): number {
  let score = 0;
  if (state.alvaradoDorMigratoria) score += 1;
  if (state.alvaradoAnorexia) score += 1;
  if (state.alvaradoNauseasVomitos) score += 1;
  if (state.alvaradoDorFID) score += 2;
  if (state.alvaradoSinalBlumberg) score += 1;
  if (state.alvaradoFebre) score += 1;
  if (state.alvaradoLeucocitose) score += 2;
  if (state.alvaradoDesvioEsquerda) score += 1;
  return score;
}

/**
 * Calcula o Score AIR
 */
export function calculateAIRScore(state: GuideFlowAppendicitisState): number {
  let score = 0;
  if (state.airVomitos) score += 1;
  if (state.airDorFID) score += 1;
  if (state.airDescompressaoLeve) score += 1;
  if (state.airDescompressaoModerada) score += 2;
  if (state.airDescompressaoIntensa) score += 3;
  if (state.airTemperatura >= 38.5) score += 1;
  if (state.airLeucocitos >= 15) score += 2;
  else if (state.airLeucocitos >= 10) score += 1;
  if (state.airNeutrofilos >= 85) score += 2;
  else if (state.airNeutrofilos >= 70) score += 1;
  if (state.airPCR >= 50) score += 2;
  else if (state.airPCR >= 10) score += 1;
  return score;
}

/**
 * Calcula o Score AAS (Adult Appendicitis Score) - TABELA OFICIAL CORRETA
 * Sintomas e Achados Clínicos + Exames Laboratoriais
 * Pontuação total: 0-16+ pontos
 */
export function calculateAASScore(state: GuideFlowAppendicitisState): { score: number; resultado: string } {
  let score = 0;
  
  // ========================================
  // SINTOMAS E ACHADOS CLÍNICOS
  // ========================================
  
  // 1. DOR EM FID (Fossa Ilíaca Direita) - 2 pontos
  if (state.aasDorFID) score += 2;
  
  // 2. RELOCAÇÃO DA DOR (Pain Relocation) - 2 pontos  
  if (state.aasMigracaoDor) score += 2;
  
  // 3. DEFESA MUSCULAR (Guarding)
  // Leve → 2 pontos
  // Moderada ou Grave → 4 pontos
  if (state.aasDefesaLeve) score += 2;
  if (state.aasDefesaModeradaGrave) score += 4;
  
  // 4. DADOS DEMOGRÁFICOS - SEXO
  // Sexo masculino → 3 pontos
  // Sexo feminino 16-49 anos → 1 ponto
  // Sexo feminino ≥50 anos → 3 pontos
  if (state.aasSexoMasculino) {
    score += 3; // Sexo masculino sempre 3 pontos
  } else if (state.aasSexoFeminino) {
    // Sexo feminino depende da idade
    if (state.aasIdade >= 16 && state.aasIdade <= 49) {
      score += 1; // 16-49 anos: 1 ponto
    } else if (state.aasIdade >= 50) {
      score += 3; // ≥50 anos: 3 pontos
    }
  }
  
  // ========================================
  // EXAMES LABORATORIAIS
  // ========================================
  
  // 5. CONTAGEM DE LEUCÓCITOS (×10⁹/L)
  if (state.aasLeucocitos >= 7.2 && state.aasLeucocitos < 10.9) score += 1;
  else if (state.aasLeucocitos >= 10.9 && state.aasLeucocitos < 14.0) score += 2;
  else if (state.aasLeucocitos >= 14.0) score += 3;
  
  // 6. PROPORÇÃO DE NEUTRÓFILOS (%)
  if (state.aasNeutrofilos >= 62 && state.aasNeutrofilos < 75) score += 2;
  else if (state.aasNeutrofilos >= 75 && state.aasNeutrofilos < 83) score += 3;
  else if (state.aasNeutrofilos >= 83) score += 4;
  
  // 7. PROTEÍNA C-REATIVA (PCR) - Se sintomas <24h
  if (state.aasPCRMenos24h && state.aasPCR > 0) {
    if (state.aasPCR >= 4 && state.aasPCR < 11) score += 2;
    else if (state.aasPCR >= 11 && state.aasPCR < 25) score += 3;
    else if (state.aasPCR >= 25 && state.aasPCR < 83) score += 5;
    else if (state.aasPCR >= 83) score += 1;
  }
  
  // 8. PROTEÍNA C-REATIVA (PCR) - Se sintomas ≥24h
  if (state.aasPCRMais24h && state.aasPCR > 0) {
    if (state.aasPCR >= 12 && state.aasPCR < 53) score += 2;
    else if (state.aasPCR >= 53 && state.aasPCR < 152) score += 2;
    else if (state.aasPCR >= 152) score += 1;
  }
  
  // Interpretação do resultado
  let resultado = '';
  if (score >= 0 && score <= 10) {
    resultado = 'Baixa probabilidade de apendicite aguda';
  } else if (score >= 11 && score <= 15) {
    resultado = 'Probabilidade intermediária de apendicite aguda';
  } else if (score >= 16) {
    resultado = 'Alta probabilidade de apendicite aguda';
  }
  
  return { score, resultado };
}

/**
 * Calcula o PAS com valores corretos
 */
export function calculatePASScore(state: GuideFlowAppendicitisState): number {
  let score = 0;
  if (state.pasFebre) score += 1;
  if (state.pasAnorexia) score += 1;
  if (state.pasNauseasVomitos) score += 1;
  if (state.pasDorMigratoria) score += 1;
  if (state.pasSensibilidadeFID) score += 2;
  if (state.pasDorTossePuloPercussao) score += 2;
  if (state.pasLeucocitose) score += 1;
  if (state.pasNeutrofilia) score += 1;
  return score;
}
