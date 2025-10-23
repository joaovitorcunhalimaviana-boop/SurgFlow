// Interface completa do estado do GuideFlow
export interface GuideFlowState {
  // Etapa 1 - Critérios Diagnósticos
  // Critério A - Sinais Locais de Inflamação
  murphyPositivo: boolean;
  dorQSD: boolean;
  sensibilidadeQSD: boolean;
  
  // Critério B - Sinais Sistêmicos de Inflamação
  febre: boolean;
  temperaturaValue: number;
  pcrElevada: boolean;
  pcrValue: number;
  leucocitose: boolean;
  leucocitosValue: number;
  
  // Critério C - Achados de Imagem
  usgPositivo: boolean;
  usgAchados: string[];
  tcPositivo: boolean;
  tcAchados: string[];
  rmPositivo: boolean;
  rmAchados: string[];
  cprm: boolean;
  
  // Etapa 2 - Classificação de Gravidade
  // Disfunção Orgânica (Grau III)
  disfuncaoCardiovascular: boolean;
  hipotensao: boolean;
  pressaoSistolica: number;
  necessidadeDrogas: boolean;
  
  disfuncaoNeurologica: boolean;
  alteracaoConsciencia: boolean;
  glasgowValue: number;
  
  disfuncaoRespiratoria: boolean;
  pao2fio2: number;
  necessidadeVentilacao: boolean;
  
  disfuncaoRenal: boolean;
  creatininaValue: number;
  oliguria: boolean;
  diurese24h: number;
  
  disfuncaoHepatica: boolean;
  bilirrubinaTotal: number;
  
  disfuncaoHematologica: boolean;
  plaquetas: number;
  
  // Critérios Grau II
  leucocitoseMaior18000: boolean;
  massaPalpavel: boolean;
  sintomas72h: boolean;
  inflamacaoLocalGrave: boolean;
  inflamacaoAchados: string[];
  
  // Etapa 3 - Avaliação de Risco Cirúrgico
  idade: number;
  sexoMasculino: boolean;
  sexoFeminino: boolean;
  cci: number;
  asaScore: number;
  comorbidades: string[];
  
  // Comorbidades do Charlson Comorbidity Index - 1 ponto
  iamPrevio: boolean;
  iccCongestiva: boolean;
  doencaVascularPeriferica: boolean;
  doencaCerebrovascular: boolean;
  demencia: boolean;
  dpocCronico: boolean;
  doencaTecidoConectivo: boolean;
  ulceraPeptica: boolean;
  hepatopatiaLeve: boolean;
  diabetesSemComplicacao: boolean;
  
  // Comorbidades do Charlson Comorbidity Index - 2 pontos
  diabetesComComplicacao: boolean;
  hemiplegiaParaplegia: boolean;
  doencaRenalGrave: boolean;
  neoplasiaSemMetastase: boolean;
  leucemia: boolean;
  linfoma: boolean;
  
  // Comorbidades do Charlson Comorbidity Index - 3 pontos
  hepatopatiaGrave: boolean;
  
  // Comorbidades específicas adicionais
  cirroseBiliar: boolean;
  colangiteEsclerosante: boolean;
  
  // Comorbidades do Charlson Comorbidity Index - 6 pontos
  neoplasiaMetastatica: boolean;
  aids: boolean;
  
  // Etapa 4 - Condutas Terapêuticas
  gravidade: string;
  riscoCircurgico: string;
  condutaRecomendada: string;
  
  // Etapa 5 - Antibioticoterapia e Seguimento
  antibiotico: string;
  dosagem: string;
  duracao: number;
  seguimento: string[];
  
  // Controle de fluxo
  etapaAtual: number;
  diagnostico: string;
  
  // Campos adicionais para cálculos
  ictericia: boolean;
  bilirrubinaDireta: number;
  colangite: boolean;
  sepse: boolean;
  choqueSetico: boolean;
  
  // Campos de compatibilidade (mantidos para não quebrar)
  usg: boolean;
  tc: boolean;
  rm: boolean;
  cciMaiorIgual6_ASA3: boolean;
  cciMaiorIgual4_ASA3_GrauIII: boolean;
  idadeMais75Comorbidades: boolean;
  comorbidadesDescompensadas: boolean;
}