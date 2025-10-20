import React from 'react';
import { 
  BookOpen, 
  Calculator, 
  Workflow, 
  Search, 
  Clock, 
  Shield,
  Users,
  Zap,
  ArrowRight
} from 'lucide-react';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';

const FeaturesSection: React.FC = () => {
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Por que escolher o 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block md:inline">
              {' '}SurgFlow
            </span>?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Uma plataforma completa desenvolvida especificamente para estudantes de medicina, 
            residentes de cirurgia e profissionais da área cirúrgica que precisam de acesso 
            rápido e confiável aos principais guidelines médicos baseados em evidências científicas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="relative bg-gradient-to-br from-white to-purple-50/50 rounded-2xl shadow-xl border border-purple-100 p-10 max-w-4xl mx-auto overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl"></div>
            
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Pronto para otimizar sua prática clínica?
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Explore nossos guidelines interativos e descubra como o SurgFlow 
                pode acelerar suas decisões clínicas com segurança e precisão baseada em evidências.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="primary"
                  className="group shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                >
                  Explorar Guidelines Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-200 hover:border-purple-300 text-purple-700"
                >
                  Ver Demonstração
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;