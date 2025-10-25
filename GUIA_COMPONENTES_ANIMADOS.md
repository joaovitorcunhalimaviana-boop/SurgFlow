# 🎨 GUIA DE COMPONENTES ANIMADOS - SURGFLOW

## 📦 NOVOS COMPONENTES IMPLEMENTADOS

Todos os componentes estão em `src/components/ui/` e `src/hooks/`

---

## 1. 🔔 TOAST NOTIFICATIONS

### Descrição
Sistema completo de notificações animadas com 4 tipos: success, error, warning, info.

### Arquivo
`src/components/ui/toast-notification.tsx`

### Como Usar

#### Setup (uma vez no App)
```tsx
// src/app/layout.tsx ou página raiz
import { ToastProvider } from '@/components/ui/toast-notification'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
```

#### Usando nas páginas
```tsx
'use client'
import { useToast } from '@/components/ui/toast-notification'

export default function MyPage() {
  const { addToast } = useToast()

  const handleSuccess = () => {
    addToast({
      type: 'success',
      title: 'Sucesso!',
      message: 'Operação concluída com sucesso',
      duration: 5000 // opcional, padrão 5000ms
    })
  }

  const handleError = () => {
    addToast({
      type: 'error',
      title: 'Erro!',
      message: 'Algo deu errado'
    })
  }

  const handleWarning = () => {
    addToast({
      type: 'warning',
      title: 'Atenção!',
      message: 'Verifique os dados antes de continuar'
    })
  }

  const handleInfo = () => {
    addToast({
      type: 'info',
      title: 'Informação',
      message: 'Você tem novas atualizações disponíveis'
    })
  }

  return (
    <div>
      <button onClick={handleSuccess}>Success Toast</button>
      <button onClick={handleError}>Error Toast</button>
      <button onClick={handleWarning}>Warning Toast</button>
      <button onClick={handleInfo}>Info Toast</button>
    </div>
  )
}
```

### Propriedades

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| type | 'success' \| 'error' \| 'warning' \| 'info' | - | Tipo da notificação |
| title | string | - | Título da notificação |
| message | string | opcional | Mensagem detalhada |
| duration | number | 5000 | Duração em ms |

### Animações
- ✅ Entrada: Slide from right + fade + scale
- ✅ Saída: Slide to right + fade + scale
- ✅ Progress bar animada
- ✅ Ícone com rotation entrance
- ✅ Botão close com hover rotation

---

## 2. 🔢 ANIMATED NUMBER COUNTER

### Descrição
Contador animado de números com spring physics. Ideal para estatísticas.

### Arquivo
`src/components/ui/animated-number.tsx`

### Como Usar

#### Contador Simples
```tsx
import AnimatedNumber from '@/components/ui/animated-number'

export default function Stats() {
  return (
    <div>
      <AnimatedNumber value={1500} />

      <AnimatedNumber
        value={99.99}
        prefix="R$ "
        decimals={2}
      />

      <AnimatedNumber
        value={95}
        suffix="%"
      />

      <AnimatedNumber
        value={1000000}
        prefix="+"
        suffix=" usuários"
      />
    </div>
  )
}
```

#### Card de Estatística (componente pré-configurado)
```tsx
import { StatCard } from '@/components/ui/animated-number'
import { Users, TrendingUp, Award, Star } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Users className="w-6 h-6" />}
        value={15000}
        prefix="+"
        label="Usuários Ativos"
        color="purple"
      />

      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        value={98.5}
        suffix="%"
        decimals={1}
        label="Taxa de Satisfação"
        color="green"
      />

      <StatCard
        icon={<Award className="w-6 h-6" />}
        value={250}
        prefix="+"
        label="Certificados Emitidos"
        color="orange"
      />

      <StatCard
        icon={<Star className="w-6 h-6" />}
        value={4.9}
        suffix="/5"
        decimals={1}
        label="Avaliação Média"
        color="blue"
      />
    </div>
  )
}
```

### Propriedades

#### AnimatedNumber
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| value | number | - | Valor a ser animado |
| duration | number | 2 | Duração em segundos |
| prefix | string | '' | Texto antes do número |
| suffix | string | '' | Texto depois do número |
| decimals | number | 0 | Casas decimais |
| className | string | '' | Classes CSS |

#### StatCard
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| icon | ReactNode | - | Ícone do card |
| value | number | - | Valor numérico |
| label | string | - | Texto descritivo |
| color | 'purple' \| 'blue' \| 'green' \| 'orange' | 'purple' | Cor do tema |
| ...AnimatedNumber props | - | - | Aceita props do AnimatedNumber |

### Animações
- ✅ Counter com spring physics
- ✅ Viewport trigger (anima ao entrar na tela)
- ✅ Card entrada: fade + slide up + scale
- ✅ Ícone: scale + rotation entrance
- ✅ Hover: scale + lift
- ✅ Shine effect ao hover

---

## 3. 💀 SKELETON LOADERS

### Descrição
Loading states elegantes com animações pulse ou wave.

### Arquivo
`src/components/ui/skeleton.tsx`

### Como Usar

#### Skeleton Básico
```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      {/* Texto */}
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />

      {/* Avatar circular */}
      <Skeleton variant="circular" width={64} height={64} />

      {/* Bloco retangular */}
      <Skeleton variant="rectangular" width="100%" height={200} />

      {/* Com animação wave */}
      <Skeleton animation="wave" width="100%" />

      {/* Sem animação */}
      <Skeleton animation="none" width="100%" />
    </div>
  )
}
```

#### Skeletons Pré-configurados
```tsx
import {
  CardSkeleton,
  GuidelineCardSkeleton,
  TableRowSkeleton,
  ProfileSkeleton,
  StatsGridSkeleton
} from '@/components/ui/skeleton'

export default function LoadingPage() {
  return (
    <div>
      {/* Card genérico */}
      <CardSkeleton />

      {/* Card de guideline */}
      <GuidelineCardSkeleton />

      {/* Linha de tabela com 5 colunas */}
      <TableRowSkeleton columns={5} />

      {/* Profile */}
      <ProfileSkeleton />

      {/* Grid de 4 estatísticas */}
      <StatsGridSkeleton count={4} />
    </div>
  )
}
```

#### Exemplo Real: Loading de Lista
```tsx
'use client'
import { useState, useEffect } from 'react'
import { GuidelineCardSkeleton } from '@/components/ui/skeleton'

export default function GuidelinesList() {
  const [loading, setLoading] = useState(true)
  const [guidelines, setGuidelines] = useState([])

  useEffect(() => {
    // Simula fetch
    setTimeout(() => {
      setGuidelines([/* dados */])
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <GuidelineCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {guidelines.map(guideline => (
        <GuidelineCard key={guideline.id} {...guideline} />
      ))}
    </div>
  )
}
```

### Variantes

| Variante | Uso |
|----------|-----|
| `text` | Linhas de texto |
| `circular` | Avatares |
| `rectangular` | Blocos, imagens, cards |

### Animações

| Animação | Efeito |
|----------|--------|
| `pulse` | Pulsação de opacity |
| `wave` | Onda deslizante |
| `none` | Sem animação |

---

## 4. 🎭 ANIMATED MODAL

### Descrição
Modais com backdrop blur e animações suaves.

### Arquivo
`src/components/ui/animated-modal.tsx`

### Como Usar

#### Modal Básico
```tsx
'use client'
import { useState } from 'react'
import AnimatedModal from '@/components/ui/animated-modal'

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>

      <AnimatedModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Título do Modal"
        size="md"
      >
        <div>
          <p>Conteúdo do modal aqui...</p>
        </div>
      </AnimatedModal>
    </>
  )
}
```

#### Modal de Confirmação (pré-configurado)
```tsx
import { ConfirmModal } from '@/components/ui/animated-modal'

export default function DeleteButton() {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    // Lógica de exclusão
    console.log('Deletado!')
  }

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>
        Deletar
      </button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
        confirmText="Sim, deletar"
        cancelText="Cancelar"
        variant="danger"
      />
    </>
  )
}
```

#### Modal de Sucesso (pré-configurado)
```tsx
import { SuccessModal } from '@/components/ui/animated-modal'

export default function Form() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    // Enviar formulário
    setShowSuccess(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* campos */}
      </form>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Cadastro Realizado!"
        message="Seu cadastro foi concluído com sucesso. Você receberá um email de confirmação."
      />
    </>
  )
}
```

### Propriedades

#### AnimatedModal
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| isOpen | boolean | - | Controla visibilidade |
| onClose | () => void | - | Callback de fechamento |
| title | string | - | Título do modal |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | Tamanho |
| closeOnBackdrop | boolean | true | Fecha ao clicar fora |
| showCloseButton | boolean | true | Mostra botão X |

#### ConfirmModal
| Prop | Tipo | Descrição |
|------|------|-----------|
| variant | 'danger' \| 'warning' \| 'info' | Cor do botão confirmar |
| confirmText | string | Texto do botão confirmar |
| cancelText | string | Texto do botão cancelar |

### Funcionalidades
- ✅ Fecha com ESC
- ✅ Previne scroll da página
- ✅ Backdrop blur
- ✅ Click outside to close
- ✅ Animações de entrada/saída

---

## 5. 🎉 CONFETTI EFFECTS

### Descrição
7 tipos diferentes de efeitos de confetti para celebrações.

### Arquivo
`src/hooks/useConfetti.ts`

### Dependência
```bash
npm install canvas-confetti @types/canvas-confetti
```

### Como Usar

```tsx
'use client'
import { useConfetti } from '@/hooks/useConfetti'

export default function CelebrationPage() {
  const {
    fireConfetti,          // Confetti básico
    fireExplosion,         // Explosão
    fireRain,             // Chuva
    firePremiumCelebration, // Celebração premium (ouro + roxo)
    fireSide,             // Lateral
    fireHeart,            // Corações
    fireFireworks         // Fogos de artifício
  } = useConfetti()

  return (
    <div className="space-y-4">
      <button onClick={fireConfetti}>
        Confetti Básico
      </button>

      <button onClick={fireExplosion}>
        Explosão
      </button>

      <button onClick={fireRain}>
        Chuva de Confetti
      </button>

      <button onClick={firePremiumCelebration}>
        Celebração Premium
      </button>

      <button onClick={fireSide}>
        Confetti Lateral
      </button>

      <button onClick={fireHeart}>
        Corações
      </button>

      <button onClick={fireFireworks}>
        Fogos de Artifício
      </button>
    </div>
  )
}
```

### Exemplo Real: Ao Selecionar Plano

```tsx
'use client'
import { useConfetti } from '@/hooks/useConfetti'
import { useToast } from '@/components/ui/toast-notification'

export default function PlanCard() {
  const { firePremiumCelebration } = useConfetti()
  const { addToast } = useToast()

  const handleSelectPlan = (planId: string) => {
    // Lógica de seleção

    if (planId === 'mindflow') {
      // Confetti para plano premium
      firePremiumCelebration()

      addToast({
        type: 'success',
        title: 'Parabéns!',
        message: 'Você selecionou o plano MindFlow Premium!'
      })
    }
  }

  return (
    <button onClick={() => handleSelectPlan('mindflow')}>
      Assinar MindFlow
    </button>
  )
}
```

### Tipos de Confetti

| Função | Duração | Uso |
|--------|---------|-----|
| `fireConfetti()` | Instantâneo | Ação simples |
| `fireExplosion()` | 3s | Grande celebração |
| `fireRain()` | 5s | Chuva contínua |
| `firePremiumCelebration()` | Instantâneo | Plano premium selecionado |
| `fireSide()` | 1s | Entrada de página |
| `fireHeart()` | Instantâneo | Favoritar, curtir |
| `fireFireworks()` | 5s | Conquista major |

---

## 📊 EXEMPLOS DE USO COMBINADO

### Exemplo 1: Formulário Completo

```tsx
'use client'
import { useState } from 'react'
import { useToast } from '@/components/ui/toast-notification'
import { SuccessModal } from '@/components/ui/animated-modal'
import { useConfetti } from '@/hooks/useConfetti'

export default function SignupForm() {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToast } = useToast()
  const { fireConfetti } = useConfetti()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // API call
      await api.signup(formData)

      // Sucesso!
      fireConfetti()
      setShowSuccess(true)
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        message: 'Bem-vindo ao SurgFlow'
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        message: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* campos */}
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Você já pode acessar todos os recursos!"
      />
    </>
  )
}
```

### Exemplo 2: Dashboard com Stats

```tsx
import { StatCard } from '@/components/ui/animated-number'
import { StatsGridSkeleton } from '@/components/ui/skeleton'
import { Users, BookOpen, Calculator, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchStats().then(data => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <StatsGridSkeleton count={4} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Users className="w-6 h-6" />}
        value={stats.users}
        label="Usuários Ativos"
        color="purple"
      />
      <StatCard
        icon={<BookOpen className="w-6 h-6" />}
        value={stats.guidelines}
        label="Guidelines Acessados"
        color="blue"
      />
      <StatCard
        icon={<Calculator className="w-6 h-6" />}
        value={stats.calculations}
        label="Cálculos Realizados"
        color="green"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        value={stats.growth}
        suffix="%"
        decimals={1}
        label="Crescimento Mensal"
        color="orange"
      />
    </div>
  )
}
```

---

## 🎯 BOAS PRÁTICAS

### Toast Notifications
✅ Use para feedback de ações (salvou, deletou, erro)
❌ Evite para informações críticas (use modals)

### Number Counters
✅ Use para estatísticas, KPIs, conquistas
✅ Sempre forneça context (label)
❌ Evite para preços dinâmicos (pode confundir)

### Skeletons
✅ Use enquanto carrega dados
✅ Mantenha layout similar ao conteúdo real
❌ Não use para loading inicial da página (use LoadingScreen)

### Modals
✅ Use para confirmações, formulários, detalhes
✅ Sempre permita fechar com ESC
❌ Evite modais aninhados

### Confetti
✅ Use para celebrações, conquistas, momentos especiais
✅ Combine com toasts para feedback completo
❌ Não abuse (pode irritar usuários)

---

## 🔧 CUSTOMIZAÇÃO

Todos os componentes aceitam className e podem ser customizados:

```tsx
<Skeleton
  className="my-custom-class"
  animation="wave"
/>

<AnimatedModal
  className="custom-modal-styles"
  // ...
/>
```

---

## 📚 REFERÊNCIAS

- Framer Motion: https://www.framer.com/motion/
- Canvas Confetti: https://www.npmjs.com/package/canvas-confetti

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Instalar canvas-confetti: `npm install canvas-confetti @types/canvas-confetti`
- [ ] Adicionar ToastProvider no layout raiz
- [ ] Importar componentes conforme necessário
- [ ] Testar todos os efeitos
- [ ] Ajustar durações e timings ao seu gosto

---

**Desenvolvido com ❤️ para o SurgFlow**

*Versão: 1.0*
*Data: Outubro 2025*
