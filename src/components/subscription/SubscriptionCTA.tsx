'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, Users, BookOpen, Zap, MessageCircle, Video, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const SubscriptionCTA: React.FC = () => {
  const router = useRouter();
  
  const benefits = [
    {
      icon: MessageCircle,
      title: 'Grupo VIP WhatsApp',
      description: 'Acesso exclusivo ao nosso grupo "SurgFlow" para networking e discussões de casos'
    },
    {
      icon: Zap,
      title: 'Evidências Rápidas',
      description: 'Acesso prioritário às melhores evidências científicas de forma rápida e organizada'
    },
    {
      icon: Users,
      title: 'Network Profissional',
      description: 'Conecte-se com cirurgiões subespecialistas, residentes e estudantes de medicina'
    },
    {
      icon: BookOpen,
      title: 'Casos Clínicos Premium',
      description: 'Discussões aprofundadas de casos reais com análise detalhada e tomada de decisão'
    },
    {
      icon: Star,
      title: 'Pesquisa Científica',
      description: 'Oportunidades de colaboração em pesquisas e publicações científicas'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-white to-purple-25 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Plano Premium
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Eleve sua Carreira
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
              Cirúrgica ao Próximo Nível
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Junte-se à comunidade exclusiva de profissionais que estão transformando 
            sua prática clínica com acesso premium aos melhores recursos educacionais.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-purple-300 shadow-xl relative overflow-hidden">
            {/* Premium Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-bl-lg">
              <span className="text-sm font-semibold">MAIS POPULAR</span>
            </div>
            
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Plano Premium
              </CardTitle>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-bold text-purple-600">R$ 149</span>
                <span className="text-gray-600 ml-2">/mês</span>
              </div>
              <p className="text-gray-600">
                Acesso completo a todos os recursos premium
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Grupo VIP WhatsApp "SurgFlow"</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Grupo VIP WhatsApp "SurgFlow"</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Acesso prioritário às evidências</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Network com cirurgiões especialistas</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Casos clínicos premium</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Oportunidades de pesquisa científica</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full text-lg py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                onClick={() => router.push('/planos')}
              >
                Assinar Agora
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Cancele a qualquer momento • Sem compromisso de permanência
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-purple-200 shadow-lg">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
              &ldquo;O grupo do WhatsApp revolucionou minha forma de aprender. Ter acesso direto 
              a cirurgiões experientes e poder discutir casos reais tem sido fundamental 
              para meu crescimento profissional.&rdquo;
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="font-semibold text-gray-900">Dr. Carlos Silva</p>
                <p className="text-gray-600 text-sm">Residente R3 - Cirurgia Geral</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionCTA;