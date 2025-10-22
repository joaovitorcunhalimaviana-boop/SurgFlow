'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Lock, Shield } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
}

interface CheckoutFormProps {
  plan: Plan
  onSuccess?: () => void
  onCancel?: () => void
}

export default function CheckoutForm({ plan, onSuccess, onCancel }: CheckoutFormProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    cpf: '',
    email: user?.email || '',
    phone: user?.whatsapp || ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Formatação específica para alguns campos
    let formattedValue = value
    
    if (name === 'cardNumber') {
      // Remove espaços e adiciona espaços a cada 4 dígitos
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    } else if (name === 'expiryDate') {
      // Formato MM/AA
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5)
    } else if (name === 'cvv') {
      // Apenas números, máximo 4 dígitos
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    } else if (name === 'cpf') {
      // Formato XXX.XXX.XXX-XX
      formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .slice(0, 14)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulação de processamento de pagamento
      // Em um ambiente real, você integraria com Stripe, PagSeguro, Mercado Pago, etc.
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular sucesso do pagamento
      const success = Math.random() > 0.1 // 90% de chance de sucesso
      
      if (success) {
        // Aqui você salvaria a assinatura no backend
        console.log('Pagamento processado com sucesso:', {
          planId: plan.id,
          userId: user?.id,
          amount: plan.price
        })
        
        alert('Pagamento processado com sucesso! Sua assinatura foi ativada.')
        onSuccess?.()
      } else {
        throw new Error('Falha no processamento do pagamento')
      }
    } catch (error) {
      console.error('Erro no pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Resumo do Plano */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Resumo do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{plan.name}</h3>
              <p className="text-gray-600 text-sm">{plan.description}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Recursos inclusos:</h4>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(plan.price)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-blue-600">{formatPrice(plan.price)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Pagamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Dados de Pagamento
            </CardTitle>
            <CardDescription>
              Seus dados estão protegidos com criptografia SSL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dados do Cartão */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Validade</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="Nome como está no cartão"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <Separator />

              {/* Dados Pessoais */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Segurança */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Lock className="h-4 w-4" />
                <span>Pagamento 100% seguro e criptografado</span>
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Processando...' : `Pagar ${formatPrice(plan.price)}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}