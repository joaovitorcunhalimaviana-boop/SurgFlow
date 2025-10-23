'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Calculator, 
  Workflow, 
  Search, 
  Clock, 
  Shield,
  Users,
  Zap,
  ArrowRight,
  Award,
  Target,
  Network,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';
import RegistrationModal from './RegistrationModal';

const FeaturesSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuideflow, setSelectedGuideflow] = useState('');
  const router = useRouter();

  const handleFreeGuideflowAccess = (guideflowTitle: string) => {
    setSelectedGuideflow(guideflowTitle);
    setIsModalOpen(true);
  };

  const handleRegistrationSubmit = (data: { fullName: string; birthDate: string; email: string; whatsapp: string }) => {
    // Here you would typically send the data to your backend
    console.log('Registration data:', data);
    
    // Close modal and redirect to the guideflow
    setIsModalOpen(false);
    
    // Simulate redirect to guideflow (you'll need to implement actual routing)
    if (selectedGuideflow === 'Colecistite Aguda') {
      router.push('/guideline/cholecystitis-tokyo-2018');
    } else if (selectedGuideflow === 'Apendicite Aguda') {
      // Add route for appendicitis when available
      alert('GuideFlow de Apendicite será disponibilizado em breve!');
    }
  };
  const features = [
    {
      icon: BookOpen,
      title: 'Guidelines Atualizados',
      description: 'Acesso aos principais protocolos internacionais sempre atualizados, incluindo Tokyo Guidelines 2018 e Atlanta Classification.'
    },
    {
      icon: Workflow,
      title: 'Fluxogramas Interativos',
      description: 'Navegação visual através de algoritmos de decisão clínica com interface intuitiva e responsiva.'
    },
    {
      icon: Calculator,
      title: 'Calculadoras Médicas',
      description: 'Ferramentas de cálculo integradas para scores de gravidade, índices prognósticos e avaliações clínicas.'
    },
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Sistema de busca avançado que permite encontrar rapidamente informações específicas nos guidelines.'
    },
    {
      icon: Clock,
      title: 'Acesso Rápido',
      description: 'Interface otimizada para consulta rápida durante plantões e situações de urgência médica.'
    },
    {
      icon: Shield,
      title: 'Confiabilidade',
      description: 'Conteúdo baseado em evidências científicas e guidelines reconhecidos internacionalmente.'
    },
    {
      icon: Users,
      title: 'Casos Clínicos',
      description: 'Biblioteca de casos práticos com aplicação dos guidelines em situações reais do dia a dia.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Plataforma otimizada para carregamento rápido e funcionamento offline quando necessário.'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              O Surgimento do 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                SurgFlow
              </span>
            </h2>
            
            <div className="prose prose-lg text-gray-600 space-y-4">
               <p className="text-lg leading-relaxed">
                 Tudo começou após um plantão de sábado à noite, quando foi constatado que não existia uma plataforma 
                 que mostrasse adequadamente os fluxos de diagnóstico e tratamento baseados em guidelines e dados científicos. 
                 As patologias cirúrgicas precisavam de fluxogramas fáceis para ensino de médicos e cirurgiões em formação, 
                 mantendo o rigor científico. Foi exatamente dessa necessidade real que surgiu o SurgFlow.
               </p>
               
               <p className="text-lg leading-relaxed">
                 Uma plataforma fundamentada nos pilares da medicina baseada em evidências, onde o rigor científico encontra 
                 a praticidade do ensino médico. Desenvolvida para transformar guidelines complexos em ferramentas acessíveis, 
                 promovendo uma prática médica mais segura e fundamentada em dados científicos sólidos. O SurgFlow representa 
                 o compromisso com a excelência no ensino e na aplicação clínica das melhores evidências disponíveis.
               </p>
             </div>
          </div>
          
          {/* Image Area */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full flex items-center justify-center">
              <img 
                src="/foto-cortada.png" 
                alt="SurgFlow Logo" 
                className="w-full max-w-sm h-auto object-contain"
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Purple CTA Section - Full width */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 py-16 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative text-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Pronto para Conquistar a Sua 
                  <span className="text-purple-200 block">Excelência Cirúrgica?</span>
                </h2>
                <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                  Junte-se a quem já descobriu como o aprendizado cirúrgico fluido transforma a prática cirúrgica. Seu flow começa aqui.
                </p>
                
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl group"
                  onClick={() => router.push('/planos')}
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Free GuideFlows Section */}
        <div className="mt-24 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Acesse alguns{' '}
              <span className="text-purple-600">GuideFlows</span>
              <br />
              <span className="text-purple-600">gratuitamente</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experimente nossos GuideFlows interativos. Cadastre-se gratuitamente para acessar 
              conteúdos selecionados e descobrir como transformamos guidelines em ferramentas práticas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Colecistite GuideFlow */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Colecistite Aguda</h4>
                  <span className="text-sm text-green-600 font-medium">GRATUITO</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                GuideFlow completo baseado nas Tokyo Guidelines 2018 para diagnóstico e 
                tratamento da colecistite aguda com fluxogramas interativos.
              </p>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 group-hover:shadow-lg"
                onClick={() => handleFreeGuideflowAccess('Colecistite Aguda')}
              >
                Acessar Gratuitamente
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Apendicite GuideFlow */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Apendicite Aguda</h4>
                  <span className="text-sm text-green-600 font-medium">GRATUITO</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Protocolo atualizado para diagnóstico e manejo da apendicite aguda com 
                algoritmos de decisão baseados em evidências científicas.
              </p>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 group-hover:shadow-lg"
                onClick={() => handleFreeGuideflowAccess('Apendicite Aguda')}
              >
                Acessar Gratuitamente
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Section */}
        <div className="bg-purple-50/30 -mx-4 sm:-mx-6 lg:-mx-8 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl mb-8">
                <div className="text-gray-900">Eleve sua carreira cirúrgica ao</div>
                <div className="text-purple-600">próximo nível</div>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Junte-se à comunidade exclusiva de profissionais que estão transformando sua prática médica com acesso aos melhores recursos educacionais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 justify-items-center">
              {[
                {
                  icon: <BookOpen className="h-8 w-8 text-purple-600" />,
                  title: "Acesso a todos os GuideFlows",
                  description: "Vários protocolos cirúrgicos interativos"
                },
                {
                  icon: <Users className="h-8 w-8 text-purple-600" />,
                  title: "Grupo VIP no WhatsApp",
                  description: "Discussões exclusivas com especialistas"
                },
                {
                  icon: <Zap className="h-8 w-8 text-purple-600" />,
                  title: "Atualizações em Tempo Real",
                  description: "Acesso às diretrizes mais recentes e discussões de artigos"
                },
                {
                  icon: <Calculator className="h-8 w-8 text-purple-600" />,
                  title: "Calculadoras e Scores Avançados",
                  description: "Ferramentas precisas para tomada de decisão"
                },
                {
                  icon: <Network className="h-8 w-8 text-purple-600" />,
                  title: "Rede Profissional",
                  description: "Conecte-se com especialistas e subespecialistas"
                },
                {
                  icon: <Award className="h-8 w-8 text-purple-600" />,
                  title: "Apoio à Pesquisa Científica",
                  description: "Orientação para trabalhos e pesquisas científicas"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => window.location.href = '/planos'}
                className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Assine um Plano Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegistrationSubmit}
        guideflowTitle={selectedGuideflow}
      />
    </section>
  );
};

export default FeaturesSection;