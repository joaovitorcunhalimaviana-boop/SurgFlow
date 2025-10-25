// Dados para busca inteligente por sintomas e keywords
export interface SearchDataItem {
  guideline: string;
  keywords: string[];
  symptoms: string[];
  category: string;
  id: string;
}

export const searchData: SearchDataItem[] = [
  {
    id: 'apendicite',
    guideline: 'Apendicite',
    keywords: ['dor fid', 'fossa ilíaca', 'blumberg', 'alvarado', 'mcburney', 'rovsing', 'psoas', 'obturador'],
    symptoms: ['dor abdominal', 'febre', 'náusea', 'vômito', 'dor migratória', 'anorexia'],
    category: 'Cirurgia Geral'
  },
  {
    id: 'colecistite',
    guideline: 'Colecistite',
    keywords: ['murphy', 'vesícula', 'tokyo', 'colecisto', 'biliar', 'courvoisier'],
    symptoms: ['dor hipocôndrio direito', 'icterícia', 'febre', 'náusea', 'vômito', 'colúria'],
    category: 'Cirurgia Hepatobiliar'
  },
  {
    id: 'colangite',
    guideline: 'Colangite',
    keywords: ['charcot', 'reynolds', 'tokyo', 'biliar', 'sepse', 'cpre', 'drenagem'],
    symptoms: ['icterícia', 'febre', 'dor abdominal', 'confusão mental', 'hipotensão', 'calafrios'],
    category: 'Cirurgia Hepatobiliar'
  },
  {
    id: 'pancreatite',
    guideline: 'Pancreatite',
    keywords: ['atlanta', 'ranson', 'apache', 'balthazar', 'lipase', 'amilase'],
    symptoms: ['dor epigástrica', 'irradiação dorsal', 'náusea', 'vômito', 'distensão abdominal'],
    category: 'Cirurgia Hepatobiliar'
  },
  {
    id: 'diverticulite',
    guideline: 'Diverticulite',
    keywords: ['hinchey', 'wses', 'sigmoidite', 'perfuração', 'abscesso', 'peritonite'],
    symptoms: ['dor fossa ilíaca esquerda', 'febre', 'alteração hábito intestinal', 'massa palpável'],
    category: 'Cirurgia Colorretal'
  },
  {
    id: 'obstrucao-intestinal',
    guideline: 'Obstrução Intestinal',
    keywords: ['íleo', 'obstrução', 'aderências', 'volvo', 'intussuscepção', 'hérnia'],
    symptoms: ['dor abdominal cólica', 'vômitos', 'distensão abdominal', 'parada eliminação gases'],
    category: 'Cirurgia Geral'
  },
  {
    id: 'trauma-abdominal',
    guideline: 'Trauma Abdominal',
    keywords: ['atls', 'fast', 'dpl', 'laparoscopia', 'penetrante', 'contuso'],
    symptoms: ['dor abdominal', 'rigidez', 'equimoses', 'instabilidade hemodinâmica'],
    category: 'Trauma'
  },
  {
    id: 'hernia-inguinal',
    guideline: 'Hérnia Inguinal',
    keywords: ['lichtenstein', 'tep', 'tapp', 'shouldice', 'bassini', 'mesh'],
    symptoms: ['abaulamento inguinal', 'dor local', 'desconforto', 'irradiação testicular'],
    category: 'Cirurgia Geral'
  },
  {
    id: 'hemorroidas',
    guideline: 'Hemorroidas',
    keywords: ['goligher', 'milligan-morgan', 'longo', 'ligadura elástica', 'escleroterapia'],
    symptoms: ['sangramento anal', 'prolapso', 'dor anal', 'prurido', 'tenesmo'],
    category: 'Cirurgia Colorretal'
  },
  {
    id: 'fissura-anal',
    guideline: 'Fissura Anal',
    keywords: ['esfincterotomia', 'nitroglicerina', 'toxina botulínica', 'diltiazem'],
    symptoms: ['dor anal intensa', 'sangramento', 'espasmo esfincteriano', 'constipação'],
    category: 'Cirurgia Colorretal'
  }
];

// Função de busca inteligente melhorada
export const buscarInteligente = (query: string): SearchDataItem[] => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const queryLower = query.toLowerCase().trim();
  const results: { item: SearchDataItem; score: number }[] = [];

  searchData.forEach(item => {
    let score = 0;

    // Busca exata no nome do guideline (peso maior)
    if (item.guideline.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Busca em sintomas (peso alto)
    item.symptoms.forEach(symptom => {
      if (symptom.toLowerCase().includes(queryLower)) {
        score += 8;
      }
      // Busca fuzzy em sintomas
      if (symptom.toLowerCase().split(' ').some(word => word.includes(queryLower))) {
        score += 5;
      }
    });

    // Busca em keywords (peso médio)
    item.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(queryLower)) {
        score += 6;
      }
      // Busca fuzzy em keywords
      if (keyword.toLowerCase().split(' ').some(word => word.includes(queryLower))) {
        score += 3;
      }
    });

    // Busca na categoria (peso menor)
    if (item.category.toLowerCase().includes(queryLower)) {
      score += 2;
    }

    if (score > 0) {
      results.push({ item, score });
    }
  });

  // Ordenar por score (maior primeiro) e retornar apenas os itens
  return results
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
};

// Função para buscar por sintomas específicos
export const buscarPorSintomas = (sintomas: string[]): SearchDataItem[] => {
  return searchData.filter(item =>
    sintomas.some(sintoma =>
      item.symptoms.some(s => s.toLowerCase().includes(sintoma.toLowerCase()))
    )
  );
};

// Função para buscar por keywords específicas
export const buscarPorKeywords = (keywords: string[]): SearchDataItem[] => {
  return searchData.filter(item =>
    keywords.some(keyword =>
      item.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
    )
  );
};