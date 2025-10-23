'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Home, User, Mail } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

function SuccessPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [paymentType, setPaymentType] = useState<string>('')

  useEffect(() => {
    const payment = searchParams.get('payment')
    if (payment === 'success') {
      setPaymentType('payment')
    } else {
      // Se não há parâmetro de sucesso, redirecionar para home
      router.push('/')
    }
  }, [searchParams, router])

  if (!paymentType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Pagamento Confirmado!
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sua assinatura foi ativada com sucesso
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Informações do usuário */}
          {user && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Detalhes da Conta
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Nome:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Plano:</strong> {user.plan}</p>
              </div>
            </div>
          )}

          {/* Próximos passos */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Próximos Passos:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Acesse sua conta para explorar os guidelines</li>
              <li>• Confira seu email para o recibo de pagamento</li>
              <li>• Entre no grupo do WhatsApp (se aplicável)</li>
            </ul>
          </div>

          {/* Informações de contato */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Precisa de Ajuda?
            </h3>
            <p className="text-sm text-yellow-800">
              Entre em contato conosco pelo email: suporte@surgflow.com
            </p>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3">
            <Button 
              onClick={() => router.push('/')}
              className="w-full"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir para o Dashboard
            </Button>
            
            <Button 
              onClick={() => router.push('/planos')}
              variant="outline"
              className="w-full"
            >
              Ver Meus Planos
            </Button>
          </div>

          {/* Agradecimento */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Obrigado por escolher o <strong>SurgFlow</strong>! 🎉
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Estamos aqui para ajudar você a tomar as melhores decisões cirúrgicas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}