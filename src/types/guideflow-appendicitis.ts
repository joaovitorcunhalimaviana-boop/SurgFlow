// Tipos para GuideFlow - Apendicite Aguda WSES 2020
// Baseado no WSES Jerusalem Guidelines 2020

export interface GuideFlowAppendicitisState {
  // ========================================
  // CONTROLE DE NAVEGAÇÃO E POPULAÇÃO
  // ========================================
  etapaAtual: number;
  totalEtapas: number;
  populacao: 'adulto' | 'pediatria' | 'gestacao' | 'idoso' | '';

  // ========================================
  // ETAPA 1 - DIAGNÓSTICO
  // ========================================

  // 1.1 APRESENTAÇÃO CLÍNICA - Sintomas
  dorAbdominal: boolean;
  dorMigratoria: boolean;
  anorexia: boolean;
  nauseas: boolean;
  vomitos: boolean;
  febre: boolean;
  temperaturaValue: number;

  // 1.2 EXAME FÍSICO - Sinais
  dorFID: boolean;
  sinalBlumberg: boolean;
  sinalRovsing: boolean;
  sinalPsoas: boolean;
  sinalObturador: boolean;
  defesaMuscular: boolean;

  // 1.3 SCORE DE ALVARADO (0-10 pontos) - Adultos
  alvaradoDorMigratoria: boolean;        // 1 ponto
  alvaradoAnorexia: boolean;             // 1 ponto
  alvaradoNauseasVomitos: boolean;       // 1 ponto
  alvaradoDorFID: boolean;               // 2 pontos
  alvaradoSinalBlumberg: boolean;        // 1 ponto
  alvaradoFebre: boolean;                // 1 ponto (>37.3°C)
  alvaradoLeucocitose: boolean;          // 2 pontos (>10.000/mm³)
  alvaradoDesvioEsquerda: boolean;       // 1 ponto (>75% neutrófilos)
  scoreAlvarado: number;                 // Score calculado (0-10)
  alvaradoResultado: string;             // Interpretação do resultado

  // 1.4 SCORE AIR (0-12 pontos) - Adultos e Pediatria
  airVomitos: boolean;                   // 1 ponto
  airDorFID: boolean;                    // 1 ponto
  airDescompressaoLeve: boolean;         // 1 ponto
  airDescompressaoModerada: boolean;     // 2 pontos
  airDescompressaoIntensa: boolean;      // 3 pontos
  airTemperatura: number;                // ≥38.5°C = 1 ponto
  airLeucocitos: number;                 // 10-14.9 = 1pt, ≥15 = 2pts
  airNeutrofilos: number;                // ≥85% = 2 pontos
  airPCR: number;                        // 10-49 = 1pt, ≥50 = 2pts
  scoreAIR: number;                      // Score calculado (0-12)
  airResultado: string;                  // Interpretação do resultado

  // 1.5 SCORE AAS (Adult Appendicitis Score) - Adultos - TABELA OFICIAL CORRETA
  // Sintomas e Achados Clínicos
  aasDorFID: boolean;                    // 1. Dor em FID - 2 pontos
  aasMigracaoDor: boolean;               // 2. Relocação da dor - 2 pontos
  
  // Defesa Muscular (Guarding)
  aasDefesaLeve: boolean;                // 4. Defesa leve - 2 pontos
  aasDefesaModeradaGrave: boolean;       // 4. Defesa moderada/grave - 4 pontos
  
  // Dados demográficos
  aasSexoMasculino: boolean;             // Sexo masculino (para cálculo sensibilidade)
  aasSexoFeminino: boolean;              // Sexo feminino (para cálculo sensibilidade)
  aasIdade: number;                      // Idade em anos (para cálculo sensibilidade)
  aasSensibilidadeFIDMulher: boolean;    // 3. Sensibilidade em FID (mulher) - 1 ponto
  aasSensibilidadeFIDOutros: boolean;    // 3. Sensibilidade em FID (outros) - 3 pontos
  
  // Exames Laboratoriais
  aasLeucocitos: number;                 // 5. Leucócitos ×10⁹/L (≥7.2-<10.9=1pt, ≥10.9-<14=2pts, ≥14=3pts)
  aasNeutrofilos: number;                // 6. Neutrófilos % (≥62-<75=2pts, ≥75-<83=3pts, ≥83=4pts)
  aasPCR: number;                        // 7/8. PCR mg/L (pontuação varia com tempo)
  aasPCRMenos24h: boolean;               // 7. PCR se sintomas <24h
  aasPCRMais24h: boolean;                // 8. PCR se sintomas ≥24h
  
  scoreAAS: number;                      // Score calculado (0-16+)
  aasResultado: string;                  // Interpretação do resultado

  // 1.6 SCORE PAS (0-8 pontos) - Pediatria
  pasFebre: boolean;                     // 1 ponto
  pasAnorexia: boolean;                  // 1 ponto
  pasNauseasVomitos: boolean;            // 1 ponto
  pasDorMigratoria: boolean;             // 1 ponto
  pasSensibilidadeFID: boolean;          // 2 pontos
  pasDorTossePuloPercussao: boolean;     // 1 ponto
  pasLeucocitose: boolean;               // 1 ponto
  pasNeutrofilia: boolean;               // 1 ponto
  scorePAS: number;                      // Score calculado (0-8)
  pasResultado: string;                  // Interpretação do resultado

  // 1.5 NECESSIDADE DE EXAME DE IMAGEM
  // Checkboxes para situações especiais (Alvarado ≥7)
  apresentacaoAtipica: boolean;          // Apresentação atípica
  incertezaDiagnostica: boolean;         // Incerteza diagnóstica
  suspeitaComplicacao: boolean;          // Suspeita de complicação
  pacienteIdoso: boolean;                // Paciente idoso (>65 anos)
  gestante: boolean;                     // Gestante
  crianca: boolean;                      // Criança
  imagemRecomendada: boolean;            // Se imagem é recomendada baseado na lógica

  // 1.6 ALGORITMO DE SOLICITAÇÃO DE EXAMES (Páginas 34-35 WSES 2020)
  nivelRisco: 'BAIXO' | 'INTERMEDIARIO' | 'ALTO' | '';  // Nível de risco calculado baseado nos scores
  condutaBaixoRisco: 'alta_telefone' | 'solicitar_imagem' | '';  // Conduta para pacientes de baixo risco
  resultadoUS: 'negativo' | 'inconclusivo' | 'positivo' | 'positivo_nao_complicada' | 'positivo_complicada' | '';  // Resultado do ultrassom
  idadeCategoria: 'menor40' | 'maior40' | '';  // Categoria de idade para decisões clínicas
  apendicolito: boolean | null;  // Presença de apendicolito na imagem
  idadeAltoRisco: 'menor40' | 'maior40' | '';  // Idade para pacientes de alto risco
  proximoPasso: 'tratamento_cirurgico' | 'tratamento_complicada' | 'opcoes_tratamento' | 'solicitar_tc' | '';  // Próximo passo no fluxo

  // 1.6 EXAMES DE IMAGEM
  // Ultrassonografia
  usgRealizado: boolean;
  usgAchados: string[];                  // Array de achados

  // Tomografia Computadorizada
  tcRealizado: boolean;
  tcAchados: string[];                   // Array de achados

  // Ressonância Magnética
  rmRealizado: boolean;
  rmAchados: string[];                   // Array de achados

  // ========================================
  // ETAPA 2 - CLASSIFICAÇÃO
  // ========================================
  classificacao: 'naoComplicada' | 'complicada' | null;

  // 2.1 APENDICITE NÃO COMPLICADA
  apendiceInflamado: boolean;
  ausenciaComplicacoes: boolean;
  ausenciaAbscesso: boolean;
  ausenciaPerfuracao: boolean;

  // 2.2 APENDICITE COMPLICADA
  apendiceGangrenosa: boolean;
  apendicePerfurada: boolean;
  abscessoPeriapendicular: boolean;
  peritoniteLocalizada: boolean;
  peritoniteDifusa: boolean;
  sepse: boolean;

  // ========================================
  // ETAPA 3 - TRATAMENTO
  // ========================================

  // 3.1 TRATAMENTO NÃO COMPLICADA
  // Cirúrgico
  cirurgiaIndicada: boolean;
  laparoscopiaPreferida: boolean;
  viaLaparoscopica: boolean;         // Via laparoscópica preferida
  cirurgiaAberta: boolean;
  viaAberta: boolean;                // Via aberta (quando laparoscopia contraindicada)

  // Conservador (quando aplicável)
  tratamentoConservador: boolean;
  antibioticoterapia: boolean;
  esquemaAntibiotico: string;
  antibioticoDoseUnica: boolean;     // Antibiótico em dose única pré-operatória
  drenagemRotina: boolean;           // Drenagem de rotina (CONTRAINDICADA)
  drenagemExcecao: boolean;          // Drenagem em casos excepcionais
  motivoDrenagemExcecao: string;     // Motivo para drenagem excepcional
  
  // 3.2 TRATAMENTO COMPLICADA
  // Abscesso
  drenagemPercutanea: boolean;
  drenagemCirurgica: boolean;
  tamanhoAbscesso: number;                   // Tamanho do abscesso em cm
  apendicectomiaImediata: boolean;           // Apendicectomia imediata após drenagem
  intervalAppendectomy: boolean;             // Interval appendectomy (NÃO MAIS RECOMENDADA)
  intervalAppendectomyAposAbscesso: boolean; // Interval appendectomy após abscesso tratado
  presencaApendicolito: boolean;             // Presença de apendicolito
  suspeitaNeoplasia: boolean;                // Suspeita de neoplasia
  recorrenciaAposTratamentoConservador: boolean; // Recorrência após tratamento conservador
  preferenciaDoPaciente: boolean;            // Preferência do paciente por cirurgia
  idadeMaior40: boolean;                     // Idade > 40 anos (fator de risco neoplasia)
  suspeitaNeoplasiaNaImagem: boolean;        // Suspeita de neoplasia na imagem
  fleimaoPeriapendicular: boolean;           // Fleimão periapendicular
  colonoscopiaRecomendada: boolean;          // Colonoscopia recomendada

  // Peritonite
  cirurgiaUrgente: boolean;
  lavadoPeritoneal: boolean;
  tratamentoCirurgico: boolean;      // Tratamento cirúrgico indicado

  // Antibióticos
  antibioticosEV: boolean;
  duracaoTratamento: number;
  antibioticoAmploEspectro: boolean; // Antibiótico de amplo espectro

  // ========================================
  // SITUAÇÕES ESPECIAIS
  // ========================================

  // Pediatria
  scoreAIRPediatrico: boolean;
  scorePASUtilizado: boolean;
  
  // Gestação
  trimestre: number;
  rmPreferida: boolean;

  // Idosos
  comorbidades: string[];

  // ========================================
  // CONTROLE DE QUALIDADE
  // ========================================
  validacaoCompleta: boolean;
  errosCriticos: string[];
  alertas: string[];
  
  // Timestamps
  inicioAvaliacao: Date | null;
  fimAvaliacao: Date | null;
  tempoTotal: number; // em minutos
}

// Estado padrão inicial
export const defaultAppendicitisState: GuideFlowAppendicitisState = {
  // Navegação
  etapaAtual: 1,
  totalEtapas: 8,
  populacao: '',

  // Apresentação clínica
  dorAbdominal: false,
  dorMigratoria: false,
  anorexia: false,
  nauseas: false,
  vomitos: false,
  febre: false,
  temperaturaValue: 36.5,

  // Exame físico
  dorFID: false,
  sinalBlumberg: false,
  sinalRovsing: false,
  sinalPsoas: false,
  sinalObturador: false,
  defesaMuscular: false,

  // Score Alvarado
  alvaradoDorMigratoria: false,
  alvaradoAnorexia: false,
  alvaradoNauseasVomitos: false,
  alvaradoDorFID: false,
  alvaradoSinalBlumberg: false,
  alvaradoFebre: false,
  alvaradoLeucocitose: false,
  alvaradoDesvioEsquerda: false,
  scoreAlvarado: 0,
  alvaradoResultado: '',

  // Score AIR
  airVomitos: false,
  airDorFID: false,
  airDescompressaoLeve: false,
  airDescompressaoModerada: false,
  airDescompressaoIntensa: false,
  airTemperatura: 36.5,
  airLeucocitos: 0,
  airNeutrofilos: 0,
  airPCR: 0,
  scoreAIR: 0,
  airResultado: '',

  // Score AAS
  aasDorFID: false,
  aasMigracaoDor: false,
  aasDefesaLeve: false,
  aasDefesaModeradaGrave: false,
  aasSexoMasculino: false,
  aasSexoFeminino: false,
  aasIdade: 0,
  aasSensibilidadeFIDMulher: false,
  aasSensibilidadeFIDOutros: false,
  aasLeucocitos: 0,
  aasNeutrofilos: 0,
  aasPCR: 0,
  aasPCRMenos24h: false,
  aasPCRMais24h: false,
  scoreAAS: 0,
  aasResultado: '',

  // Score PAS
  pasFebre: false,
  pasAnorexia: false,
  pasNauseasVomitos: false,
  pasDorMigratoria: false,
  pasSensibilidadeFID: false,
  pasDorTossePuloPercussao: false,
  pasLeucocitose: false,
  pasNeutrofilia: false,
  scorePAS: 0,
  pasResultado: '',

  // 1.5 NECESSIDADE DE EXAME DE IMAGEM
  apresentacaoAtipica: false,            // Apresentação atípica
  incertezaDiagnostica: false,
  suspeitaComplicacao: false,
  pacienteIdoso: false,
  gestante: false,
  crianca: false,
  imagemRecomendada: false,

  // 1.6 ALGORITMO DE SOLICITAÇÃO DE EXAMES
  nivelRisco: '',
  condutaBaixoRisco: '',
  resultadoUS: '',
  idadeCategoria: '',
  apendicolito: null,
  idadeAltoRisco: '',
  proximoPasso: '',

  // Exames de imagem
  usgRealizado: false,
  usgAchados: [],
  tcRealizado: false,
  tcAchados: [],
  rmRealizado: false,
  rmAchados: [],

  // Classificação
  classificacao: null,

  // Não complicada
  apendiceInflamado: false,
  ausenciaComplicacoes: false,
  ausenciaAbscesso: false,
  ausenciaPerfuracao: false,

  // Complicada
  apendiceGangrenosa: false,
  apendicePerfurada: false,
  abscessoPeriapendicular: false,
  peritoniteLocalizada: false,
  peritoniteDifusa: false,
  sepse: false,

  // Tratamento não complicada
  cirurgiaIndicada: false,
  laparoscopiaPreferida: false,
  viaLaparoscopica: false,
  cirurgiaAberta: false,
  viaAberta: false,
  tratamentoConservador: false,
  antibioticoterapia: false,
  esquemaAntibiotico: '',
  antibioticoDoseUnica: false,
  drenagemRotina: false,
  drenagemExcecao: false,
  motivoDrenagemExcecao: '',

  // Tratamento complicada
  drenagemPercutanea: false,
  drenagemCirurgica: false,
  tamanhoAbscesso: 0,
  apendicectomiaImediata: false,
  intervalAppendectomy: false,
  intervalAppendectomyAposAbscesso: false,
  presencaApendicolito: false,
  suspeitaNeoplasia: false,
  recorrenciaAposTratamentoConservador: false,
  preferenciaDoPaciente: false,
  idadeMaior40: false,
  suspeitaNeoplasiaNaImagem: false,
  fleimaoPeriapendicular: false,
  colonoscopiaRecomendada: false,
  cirurgiaUrgente: false,
  lavadoPeritoneal: false,
  tratamentoCirurgico: false,
  antibioticosEV: false,
  duracaoTratamento: 0,
  antibioticoAmploEspectro: false,

  // Situações especiais
  scoreAIRPediatrico: false,
  scorePASUtilizado: false,
  trimestre: 0,
  rmPreferida: false,
  comorbidades: [],

  // Controle de qualidade
  validacaoCompleta: false,
  errosCriticos: [],
  alertas: [],
  inicioAvaliacao: null,
  fimAvaliacao: null,
  tempoTotal: 0
};
