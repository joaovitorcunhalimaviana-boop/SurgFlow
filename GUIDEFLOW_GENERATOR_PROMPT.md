# 🤖 Sistema de Geração Automática de GuideFlows

## 📋 Instruções para Criar Novos GuideFlows

Este documento contém um prompt detalhado para gerar GuideFlows automaticamente a partir de guidelines em PDF.

---

## 🎯 PROMPT PARA CLAUDE

Olá Claude! Por favor, analise o guideline em PDF anexado e gere um GuideFlow interativo seguindo exatamente a estrutura do GuideFlow de Apendicite do SurgFlow.

### 📚 Contexto do SurgFlow

O SurgFlow é uma aplicação Next.js/React/TypeScript que apresenta guidelines médicos de forma interativa através de "GuideFlows" - interfaces passo a passo que guiam o usuário através do diagnóstico e tratamento.

### 🏗️ Estrutura de um GuideFlow

Cada GuideFlow é composto de:

#### 1️⃣ **Arquivo de Tipos** (`src/types/guideflow-[nome].ts`)

```typescript
export interface GuideFlow[Nome]State {
  // ========================================
  // CONTROLE DE NAVEGAÇÃO E POPULAÇÃO
  // ========================================
  etapaAtual: number;
  totalEtapas: number;
  populacao: 'adulto' | 'pediatria' | 'gestacao' | 'idoso' | '';

  // ========================================
  // ETAPA 1 - DIAGNÓSTICO
  // ========================================
  // Variáveis booleanas, números e strings para capturar dados clínicos
  // Exemplo: sintomas, sinais, scores diagnósticos

  // ========================================
  // ETAPA 2 - SCORES/CLASSIFICAÇÃO
  // ========================================
  // Scores diagnósticos calculados automaticamente
  // Interpretações dos scores

  // ========================================
  // ETAPA 3 - EXAMES COMPLEMENTARES
  // ========================================
  // Indicações de exames de imagem/laboratoriais
  // Achados dos exames

  // ========================================
  // ETAPA 4 - CLASSIFICAÇÃO
  // ========================================
  // Classificação da doença (ex: complicada vs não complicada)

  // ========================================
  // ETAPA 5 - AVALIAÇÃO ESPECÍFICA
  // ========================================
  // Detalhamento de complicações, severidade, etc.

  // ========================================
  // ETAPA 6 - TRATAMENTO
  // ========================================
  // Opções terapêuticas
  // Indicações cirúrgicas vs conservadoras

  // ========================================
  // ETAPA 7 - PARTICULARIDADES CLÍNICAS
  // ========================================
  // Antibioticoterapia
  // Seguimento
  // Situações especiais

  // ========================================
  // ETAPA 8 - PARTICULARIDADES TÉCNICAS
  // ========================================
  // Detalhes técnicos de procedimentos
  // Classificações cirúrgicas

  // ========================================
  // CONTROLE DE QUALIDADE
  // ========================================
  validacaoCompleta: boolean;
  errosCriticos: string[];
  alertas: string[];

  // Timestamps
  inicioAvaliacao: Date | null;
  fimAvaliacao: Date | null;
  tempoTotal: number;
}

export const default[Nome]State: GuideFlow[Nome]State = {
  // Valores padrão para todas as variáveis
}
```

#### 2️⃣ **Componente React** (`src/components/guidelines/GuideFlow[Nome].tsx`)

```typescript
'use client'

/**
 * GuideFlow de [Nome da Patologia]
 * Baseado no [Nome do Guideline] [Ano]
 *
 * IMPORTANTE: Este é um aplicativo médico que se relaciona com vidas.
 * Todo o conteúdo é fiel ao guideline original com máximo rigor científico.
 */

import React, { useState, useEffect } from 'react'
// Imports de componentes UI...

const GuideFlow[Nome]: React.FC<GuideFlow[Nome]Props> = ({ state, setState }) => {
  // ========================================
  // LÓGICA CONDICIONAL
  // ========================================

  // useEffects para cálculos automáticos de scores
  useEffect(() => {
    // Calcular scores automaticamente baseado nos inputs
  }, [dependências])

  // useEffects para determinar condições específicas
  useEffect(() => {
    // Exemplo: determinar se exame de imagem é necessário
  }, [dependências])

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================

  const proximaEtapa = () => {
    if (state.etapaAtual < totalEtapas) {
      let proximaEtapa = state.etapaAtual + 1

      // LÓGICA CONDICIONAL: Pular etapas não aplicáveis
      // Exemplo: se não complicada, pula etapa de caracterização de complicação
      if (proximaEtapa === X && state.condicao === 'Y') {
        proximaEtapa = X + 1
      }

      setState(prevState => ({ ...prevState, etapaAtual: proximaEtapa }))
    }
  }

  const podeAvancar = () => {
    switch (state.etapaAtual) {
      case 1:
        return true // ou validação específica
      case 2:
        return /* condição de validação */
      // ... para cada etapa
    }
  }

  // ========================================
  // COMPONENTES DE RENDERIZAÇÃO
  // ========================================

  const renderHeroSection = () => (
    // Cabeçalho com título, badges, barra de progresso
  )

  const renderPopulationSelector = () => (
    // Seletor de população (adulto/pediatria/gestação/idoso)
  )

  const renderEtapa1 = () => (
    // Apresentação clínica, sintomas, sinais
    // Cards expansíveis organizados por categoria
  )

  const renderEtapa2 = () => (
    // Scores diagnósticos com cálculo automático
    // Interpretação dos scores
  )

  const renderEtapa3 = () => (
    // Exames complementares
    // Algoritmo de solicitação baseado em scores
  )

  const renderEtapa4 = () => (
    // Classificação da doença
    // Cards com checkboxes para definir tipo/gravidade
  )

  const renderEtapa5 = () => (
    // CONDICIONAL: Só mostra se aplicável
    // Exemplo: caracterização de complicações
  )

  const renderEtapa6 = () => (
    <div className="space-y-6">
      {/* LÓGICA CONDICIONAL: Mostra conteúdo baseado na classificação */}
      {state.classificacao === 'tipoA' && (
        <>
          {/* Opções de tratamento para tipo A */}
        </>
      )}

      {state.classificacao === 'tipoB' && (
        <>
          {/* Opções de tratamento para tipo B */}
        </>
      )}
    </div>
  )

  const renderEtapa7 = () => (
    <div className="space-y-6">
      {/* LÓGICA CONDICIONAL: Antibioticoterapia */}
      {state.classificacao === 'tipoB' && (
        <Card>
          {/* Detalhes de antibioticoterapia específicos */}
        </Card>
      )}

      {/* Acompanhamento ambulatorial - para todos */}
      <Card>
        {/* Follow-up */}
      </Card>

      {/* LÓGICA CONDICIONAL: Procedimentos especiais */}
      {state.condicaoEspecial && (
        <Card>
          {/* Informações específicas */}
        </Card>
      )}
    </div>
  )

  const renderEtapa8 = () => {
    // LÓGICA CONDICIONAL: Verifica se tratamento cirúrgico
    const isCirurgico = /* condição */

    return (
      <div className="space-y-6">
        {!isCirurgico && (
          <Card>
            <Alert>
              Esta seção não se aplica ao tratamento conservador selecionado.
            </Alert>
          </Card>
        )}

        {isCirurgico && (
          <>
            {/* Detalhes técnicos cirúrgicos */}

            {/* LÓGICA CONDICIONAL: Antibiótico perioperatório */}
            {state.classificacao === 'naoComplicada' && (
              <Card>
                {/* Dose única */}
              </Card>
            )}

            {/* Classificações cirúrgicas - para todos */}
            <Card>
              {/* Classificação intraoperatória */}
            </Card>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {renderHeroSection()}
      {renderPopulationSelector()}

      {/* RENDERIZAÇÃO CONDICIONAL POR ETAPA */}
      {state.etapaAtual === 1 && renderEtapa1()}
      {state.etapaAtual === 2 && renderEtapa2()}
      {state.etapaAtual === 3 && renderEtapa3()}
      {state.etapaAtual === 4 && renderEtapa4()}
      {state.etapaAtual === 5 && renderEtapa5()}
      {state.etapaAtual === 6 && renderEtapa6()}
      {state.etapaAtual === 7 && renderEtapa7()}
      {state.etapaAtual === 8 && renderEtapa8()}

      {/* Navegação */}
      <div className="flex justify-between">
        <Button onClick={etapaAnterior} disabled={state.etapaAtual === 1}>
          Etapa Anterior
        </Button>
        <Button onClick={proximaEtapa} disabled={!podeAvancar() || state.etapaAtual === totalEtapas}>
          Próxima Etapa
        </Button>
      </div>
    </div>
  )
}
```

### 🎨 Padrões de Design

#### Cards Expansíveis
```tsx
<Card className="border-[cor]-200">
  <CardHeader
    className="cursor-pointer hover:bg-gray-50 transition-colors bg-[cor]-50"
    onClick={() => toggleSection('[secao]')}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-[cor]-600" />
        <CardTitle>Título</CardTitle>
      </div>
      {expandedSections.[secao] ? <ChevronUp /> : <ChevronDown />}
    </div>
  </CardHeader>

  {expandedSections.[secao] && (
    <CardContent>
      {/* Conteúdo */}
    </CardContent>
  )}
</Card>
```

#### Alerts Informativos
```tsx
<Alert className="border-[cor]-200 bg-[cor]-50">
  <Info className="h-4 w-4 text-[cor]-600" />
  <AlertDescription className="text-xs text-[cor]-800">
    <strong>Guideline (Página X):</strong>
    <p className="mt-2">Citação literal do guideline</p>
  </AlertDescription>
</Alert>
```

#### Badges para Nível de Evidência
```tsx
<Badge className="bg-green-600">WSES: Strong/High</Badge>
<Badge variant="outline">WSES: Weak/Low</Badge>
<Badge className="bg-red-600">Strong CONTRA</Badge>
```

### ⚠️ REGRAS CRÍTICAS DE LÓGICA CONDICIONAL

1. **Etapa 7 (Particularidades Clínicas)**
   - Antibioticoterapia prolongada: só mostrar para casos complicados
   - Procedimentos especiais: só mostrar se aplicável
   - Acompanhamento: adaptar conteúdo ao tipo de tratamento

2. **Etapa 8 (Particularidades Técnicas)**
   - **TODA A ETAPA**: só mostrar se houver indicação de procedimento
   - Se tratamento conservador: mostrar apenas alerta explicativo
   - Antibiótico perioperatório: separar dose única (simples) vs prolongado (complicado)

3. **Navegação**
   - Pular etapas não aplicáveis (ex: se não complicado, pula caracterização de complicação)
   - Validação em `podeAvancar()` para cada etapa

4. **Cálculos Automáticos**
   - Scores devem ser calculados automaticamente via useEffect
   - Interpretações devem ser atualizadas em tempo real
   - Indicação de exames deve ser determinada automaticamente

### 📊 Cores por Severidade/Tipo

- **Verde** (`green`): Tratamento padrão, baixo risco, recomendações fortes
- **Azul** (`blue`): Informações gerais, alternativas, observações
- **Amarelo** (`yellow`): Atenção, casos especiais, exceções
- **Laranja** (`orange`): Risco intermediário, urgência moderada
- **Vermelho** (`red`): Alto risco, urgência, contraindicações, complicações
- **Roxo** (`purple`): Classificações, categorias
- **Índigo** (`indigo`): Scores, cálculos
- **Rosa** (`pink`): Investigações, neoplasias
- **Teal** (`teal`): Procedimentos técnicos

---

## 📝 TAREFA: Gere o GuideFlow

Com base no PDF do guideline anexado, por favor:

1. **Analise** o guideline completamente
2. **Extraia** as informações organizadas em:
   - Diagnóstico (sintomas, sinais, scores)
   - Classificação (tipos, severidade)
   - Tratamento (opções, indicações)
   - Particularidades (antibióticos, seguimento, técnicas)
3. **Identifique** os pontos de decisão condicional
4. **Gere**:
   - Arquivo de tipos TypeScript completo
   - Componente React completo
   - Com TODA a lógica condicional implementada
5. **Siga** rigorosamente:
   - Citações literais do guideline (com página)
   - Níveis de evidência corretos
   - Estrutura de 8 etapas
   - Lógica condicional para evitar sobrecarga de informação

### ⚡ Lembre-se

- **FIDELIDADE ABSOLUTA** ao guideline original
- **LÓGICA CONDICIONAL** em TODAS as etapas aplicáveis
- **CITAÇÕES COM PÁGINA** para rastreabilidade
- **CÁLCULOS AUTOMÁTICOS** de scores
- **VALIDAÇÕES** apropriadas para navegação
- **ORGANIZAÇÃO VISUAL** clara com cores consistentes

---

## 🎯 Exemplo de Saída Esperada

Você deve gerar:

```
### 📁 Arquivo 1: src/types/guideflow-[nome].ts

[código TypeScript completo]

---

### 📁 Arquivo 2: src/components/guidelines/GuideFlow[Nome].tsx

[código React/TypeScript completo]

---

### 📋 Resumo do Guideline

- **Nome**: [Nome completo]
- **Ano**: [Ano]
- **Etapas**: 8
- **Pontos de Decisão Condicional**: [lista]
- **Scores Incluídos**: [lista]
- **Populações Especiais**: [lista]
```

---

## ✅ Pronto para usar!

Anexe o PDF do guideline e use este prompt para gerar automaticamente novos GuideFlows!
