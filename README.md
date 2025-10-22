# SurgFlow - Plataforma de Educação Médica

SurgFlow é uma plataforma moderna de educação médica especializada em cirurgia, oferecendo guidelines, calculadoras médicas, casos clínicos e recursos premium para profissionais da saúde.

## 🚀 Funcionalidades

### Funcionalidades Principais
- **Guidelines Médicos**: Acesso a protocolos atualizados (Tokyo Guidelines 2018, etc.)
- **Calculadoras Médicas**: Ferramentas de cálculo especializadas
- **Casos Clínicos**: Estudos de caso interativos
- **Sistema de Autenticação**: Login/cadastro completo
- **Planos de Assinatura**: Teste, GuideFlow e MindFlow

### Funcionalidades Premium
- **Dashboard Personalizado**: Interface exclusiva para assinantes
- **Recursos Avançados**: Conteúdo premium baseado no plano
- **Sistema de Pagamento**: Integração com checkout
- **Emails Transacionais**: Sistema completo de notificações

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: React Context
- **Deployment**: Vercel
- **Version Control**: Git/GitHub

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/joaovitorcunhalimaviana-boop/SurgFlow.git
cd SurgFlow
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

5. Acesse: `http://localhost:3000`

## 🚀 Deploy

### Deploy no Vercel

1. **Via GitHub (Recomendado)**:
   - Acesse [vercel.com](https://vercel.com)
   - Conecte sua conta GitHub
   - Importe o repositório SurgFlow
   - Configure as variáveis de ambiente
   - Deploy automático!

2. **Via CLI**:
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Variáveis de Ambiente para Produção

Configure no painel do Vercel:
- `NEXT_PUBLIC_APP_URL`: URL da aplicação em produção
- Outras variáveis conforme necessário (ver `.env.example`)

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── admin/             # Páginas administrativas
│   ├── auth/              # Autenticação
│   ├── checkout/          # Processo de pagamento
│   ├── dashboard/         # Dashboard do usuário
│   └── ...
├── components/            # Componentes React
│   ├── auth/             # Componentes de autenticação
│   ├── emails/           # Templates de email
│   ├── layout/           # Layout components
│   ├── payment/          # Componentes de pagamento
│   └── ui/               # Componentes UI base
├── contexts/             # React Contexts
├── lib/                  # Utilitários e serviços
└── styles/              # Estilos globais
```

## 🎯 Planos de Assinatura

### Teste (Gratuito)
- Acesso básico aos guidelines
- Calculadoras limitadas

### GuideFlow (R$ 29,90/mês)
- Todos os guidelines
- Calculadoras completas
- Casos clínicos básicos

### MindFlow (R$ 49,90/mês)
- Todos os recursos do GuideFlow
- Casos clínicos avançados
- Dashboard premium
- Suporte prioritário

## 📧 Sistema de Emails

O projeto inclui um sistema completo de emails transacionais:

- **Welcome Email**: Boas-vindas para novos usuários
- **Confirmation Email**: Confirmação de conta
- **Password Recovery**: Recuperação de senha
- **Plan Upgrade**: Confirmação de upgrade de plano
- **Cancellation Email**: Confirmação de cancelamento

### Visualização de Templates
Acesse `/admin/emails` para visualizar todos os templates de email.

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Executar build de produção
npm run lint         # Linting
npm run type-check   # Verificação de tipos TypeScript
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Email: suporte@surgflow.com
- Website: [surgflow.com](https://surgflow.com)

---

Desenvolvido com ❤️ para a comunidade médica brasileira.
