'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CreditCard, Shield, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
}

const plans: Record<string, Plan> = {
  guideflow: {
    id: 'guideflow',
    name: 'GuideFlow',
    price: 49,
    originalPrice: 97,
    features: [
        'Acesso completo a todos os guideflows',
        'Todas as calculadoras médicas',
        'Conteúdo baseado em evidências',
        'Atualizações constantes',
        'Acesso via mobile e desktop'
      ]
  },
  mindflow: {
    id: 'mindflow',
    name: 'MindFlow',
    price: 179,
    originalPrice: 297,
    features: [
      'Tudo do GuideFlow',
      'Mapas mentais exclusivos',
      'Grupo VIP no WhatsApp',
      'Acesso antecipado a novos conteúdos',
      'Suporte prioritário'
    ],
    popular: true
  }
};

const CheckoutPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, updateUserPlan } = useAuth();
  const { toast } = useToast();
  
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix'>('credit');

  useEffect(() => {
    const planId = searchParams.get('plan');
    if (planId && plans[planId]) {
      setSelectedPlan(plans[planId]);
    } else {
      router.push('/planos');
    }
  }, [searchParams, router]);

  const handlePayment = async () => {
    if (!selectedPlan || !user) return;

    setIsProcessing(true);

    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simular sucesso do pagamento
      const success = Math.random() > 0.1; // 90% de chance de sucesso

      if (success) {
        // Atualizar plano do usuário
        await updateUserPlan(selectedPlan.id as 'guideflow' | 'mindflow');
        
        toast({
          title: "Pagamento aprovado!",
          description: `Seu plano ${selectedPlan.name} foi ativado com sucesso.`,
          variant: "success"
        });

        // Redirecionar para a biblioteca
        setTimeout(() => {
          router.push('/biblioteca');
        }, 2000);
      } else {
        throw new Error('Pagamento recusado');
      }
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar seu pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">Complete seu pagamento para ativar o plano {selectedPlan.name}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="border rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPlan.name}</h3>
                  {selectedPlan.popular && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-amber-100 text-purple-700 mt-1">
                      Mais Popular
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {selectedPlan.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      R$ {selectedPlan.originalPrice}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-purple-600">
                    R$ {selectedPlan.price}
                  </p>
                  <p className="text-sm text-gray-600">/mês</p>
                </div>
              </div>

              <div className="space-y-2">
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span className="text-purple-600">R$ {selectedPlan.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Cobrança mensal recorrente</p>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>

            {/* Seleção do método */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('credit')}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  paymentMethod === 'credit'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-6 w-6 mx-auto mb-2" />
                <span className="font-medium">Cartão de Crédito</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  paymentMethod === 'pix'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded"></div>
                <span className="font-medium">PIX</span>
              </button>
            </div>

            {paymentMethod === 'credit' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="João Silva"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="font-medium text-green-800">Pagamento via PIX</span>
                </div>
                <p className="text-sm text-green-700">
                  Após confirmar, você receberá o código PIX para pagamento instantâneo.
                </p>
              </div>
            )}

            {/* Segurança */}
            <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Pagamento Seguro</p>
                <p className="text-xs text-gray-600">Seus dados são protegidos com criptografia SSL</p>
              </div>
            </div>

            {/* Botão de Pagamento */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processando...
                </div>
              ) : (
                `Pagar R$ ${selectedPlan.price}`
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Ao confirmar o pagamento, você concorda com nossos{' '}
              <a href="/termos" className="text-purple-600 hover:underline">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="/privacidade" className="text-purple-600 hover:underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
};

export default CheckoutPage;