import React from 'react';
import { 
  Heart, 
  Zap, 
  Activity,
  Stethoscope,
  Brain,
  Pill
} from 'lucide-react';
import GuidelineCard from './GuidelineCard';

const GuidelinesGrid: React.FC = () => {
  const guidelines = [
    {
      icon: Heart,
      title: 'Colecistite Aguda',
      description: 'Diagnóstico, classificação de gravidade e manejo da colecistite aguda segundo Tokyo Guidelines 2018.',
      year: '2018',
      organization: 'Tokyo Guidelines',
      href: '/guideline/cholecystitis-tokyo-2018'
    },
    {
      icon: Zap,
      title: 'Colangite Aguda',
      description: 'Protocolo para diagnóstico e tratamento da colangite aguda com critérios de Charcot e Reynolds.',
      year: '2018',
      organization: 'Tokyo Guidelines',
      href: '/guideline/cholangitis-tokyo-2018'
    },
    {
      icon: Activity,
      title: 'Pancreatite Aguda',
      description: 'Classificação de Atlanta revisada para pancreatite aguda com critérios de gravidade atualizados.',
      year: '2012',
      organization: 'Atlanta Classification',
      href: '/guideline/pancreatitis-atlanta-2012'
    },
    {
      icon: Stethoscope,
      title: 'Apendicite Aguda',
      description: 'Diretrizes para diagnóstico e manejo cirúrgico da apendicite aguda em adultos e crianças.',
      year: '2020',
      organization: 'WSES Guidelines',
      href: '/guideline/appendicitis-wses-2020'
    },
    {
      icon: Brain,
      title: 'Trauma Abdominal',
      description: 'Protocolo de avaliação e manejo do trauma abdominal fechado e penetrante.',
      year: '2021',
      organization: 'ATLS Guidelines',
      href: '/guideline/abdominal-trauma-atls-2021'
    },
    {
      icon: Pill,
      title: 'Profilaxia Antibiótica',
      description: 'Diretrizes para profilaxia antibiótica em cirurgias abdominais e procedimentos invasivos.',
      year: '2022',
      organization: 'CDC Guidelines',
      href: '/guideline/antibiotic-prophylaxis-cdc-2022'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Guidelines Disponíveis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acesse os principais protocolos internacionais organizados por especialidade 
            e situação clínica para tomada de decisão rápida e segura.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidelines.map((guideline, index) => (
            <GuidelineCard
              key={index}
              icon={guideline.icon}
              title={guideline.title}
              description={guideline.description}
              year={guideline.year}
              organization={guideline.organization}
              href={guideline.href}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Ver Todos os Guidelines
          </button>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesGrid;