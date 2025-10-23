'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  WelcomeEmail, 
  ConfirmationEmail, 
  PasswordRecoveryEmail, 
  PlanUpgradeEmail, 
  CancellationEmail 
} from '@/components/emails'
import { Mail, Eye, Code, Download } from 'lucide-react'

type EmailType = 'welcome' | 'confirmation' | 'password-recovery' | 'plan-upgrade' | 'cancellation'

interface EmailPreviewProps {
  type: EmailType
  title: string
  description: string
  component: React.ReactNode
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ type, title, description, component }) => {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Button
            variant={showPreview ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button
            variant={!showPreview ? "primary" : "outline"}
            size="sm"
            onClick={() => setShowPreview(false)}
          >
            <Code className="w-4 h-4 mr-2" />
            Código
          </Button>
        </div>

        {showPreview ? (
          <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
            {component}
          </div>
        ) : (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono max-h-96 overflow-y-auto">
            <pre>{`// Exemplo de uso do template ${type}
import { ${title.replace(/\s+/g, '')} } from '@/components/emails'

const emailProps = {
  userName: "João Silva",
  userEmail: "joao@exemplo.com",
  // ... outras props específicas
}

// Renderizar para HTML
const htmlContent = renderToString(<${title.replace(/\s+/g, '')} {...emailProps} />)

// Enviar email
await emailService.send${title.replace(/\s+/g, '')}(emailProps)`}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function EmailConfirmationDemo() {
  const emailTemplates: EmailPreviewProps[] = [
    {
      type: 'welcome',
      title: 'Email de Boas-vindas',
      description: 'Enviado após o cadastro de novos usuários',
      component: (
        <WelcomeEmail
          userName="João Silva"
          userEmail="joao@exemplo.com"
          plan="guideflow"
        />
      )
    },
    {
      type: 'confirmation',
      title: 'Email de Confirmação',
      description: 'Enviado para confirmar o endereço de email',
      component: (
        <ConfirmationEmail
          userName="Maria Santos"
          userEmail="maria@exemplo.com"
          confirmationToken="abc123def456"
        />
      )
    },
    {
      type: 'password-recovery',
      title: 'Recuperação de Senha',
      description: 'Enviado quando o usuário solicita redefinição de senha',
      component: (
        <PasswordRecoveryEmail
          userName="Carlos Oliveira"
          resetToken="xyz789uvw012"
          expirationTime="1 hora"
        />
      )
    },
    {
      type: 'plan-upgrade',
      title: 'Upgrade de Plano',
      description: 'Enviado quando o usuário faz upgrade do plano',
      component: (
        <PlanUpgradeEmail
          userName="Ana Costa"
          oldPlan="teste"
          newPlan="mindflow"
          upgradeDate="15/12/2024"
        />
      )
    },
    {
      type: 'cancellation',
      title: 'Cancelamento de Assinatura',
      description: 'Enviado quando o usuário cancela a assinatura',
      component: (
        <CancellationEmail
          userName="Pedro Lima"
          cancelledPlan="guideflow"
          cancellationDate="15/12/2024"
          accessExpiryDate="15/01/2025"
          reason="Não estou usando o suficiente"
        />
      )
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📧 Sistema de Emails Transacionais
        </h1>
        <p className="text-gray-600 mb-4">
          Visualize e teste todos os templates de email do SurgFlow
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <Badge variant="secondary">5 Templates</Badge>
          <Badge variant="secondary">Responsivo</Badge>
          <Badge variant="secondary">Branded</Badge>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="grid gap-6">
        {emailTemplates.map((template, index) => (
          <EmailPreview key={index} {...template} />
        ))}
      </div>

      <Separator className="my-8" />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          🚀 Como usar os templates
        </h2>
        <div className="text-blue-800 space-y-2">
          <p>1. <strong>Desenvolvimento:</strong> Os emails são logados no console</p>
          <p>2. <strong>Produção:</strong> Configure o serviço de email (Resend, SendGrid, etc.)</p>
          <p>3. <strong>Personalização:</strong> Edite os templates em <code>/components/emails/</code></p>
          <p>4. <strong>Envio:</strong> Use as funções do <code>emailService</code> para enviar</p>
        </div>
      </div>
    </div>
  )
}