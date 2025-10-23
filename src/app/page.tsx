import Layout from '@/components/layout/Layout'
import FeaturesSection from '@/components/features/FeaturesSection'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Lock } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - Enhanced with better visual hierarchy */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-25 py-24 lg:py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Educação Cirúrgica
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Simplificada
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed text-justify">
              Siga o fluxo certo e transforme seu aprendizado cirúrgico com ajuda de uma plataforma que conecta fluxogramas baseados em guidelines, calculadoras, discussões de casos clínicos, network e pesquisa científica em um só lugar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/planos">
                <Button 
                  size="xl" 
                  variant="primary"
                  className="group shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                >
                  Quero Fazer Parte
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/planos">
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="border-2 border-purple-200 hover:border-purple-300"
                >
                  Ver Planos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Resources Section - New comprehensive section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16 relative z-50">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-50">
              Plataforma Completa Para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block relative z-50">
                Aprendizado Cirúrgico
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma integrada que flui naturalmente do conhecimento teórico à prática clínica, 
              conectando estudantes, residentes e cirurgiões em um ecossistema de excelência.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* GuideFlow */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50/70 to-purple-100/70 hover:from-purple-100/70 hover:to-purple-200/70 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">GuideFlow</h3>
              <p className="text-gray-600 mb-4">
                Fluxogramas interativos baseados nas melhores evidências científicas, 
                transformam protocolos complexos em decisões fluidas.
              </p>
            </div>

            {/* Calculadoras */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50/70 to-purple-100/70 hover:from-purple-100/70 hover:to-purple-200/70 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Calculadoras</h3>
              <p className="text-gray-600 mb-4">
                Ferramentas de cálculo médico integradas ao seu fluxo de trabalho. 
                Decisões precisas com agilidade e confiabilidade.
              </p>
            </div>
          </div>

          {/* MindFlow - Seção expandida */}
          <div className="w-full">
            <div className="group p-10 rounded-2xl bg-gradient-to-br from-purple-100/70 to-purple-200/70 hover:from-purple-200/70 hover:to-purple-300/70 transition-all duration-300 hover:shadow-2xl border-2 border-purple-300/50">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">MindFlow</h3>
                <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
                  Acesso a um grupo exclusivo com discussões de casos clínicos reais em alto nível, artigos científicos atualizados, 
                  network direto com especialistas e subespecialistas, apoio e orientação para produção científica. 
                  Oportunidade única de crescimento profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />
      
      {/* Admin Access - Discrete Link */}
      <div className="fixed bottom-4 right-4">
        <Link href="/admin">
          <Button
            variant="ghost"
            size="sm"
            className="opacity-30 hover:opacity-60 transition-opacity p-2"
            title="Acesso Administrativo"
          >
            <Lock className="w-4 h-4 text-gray-400" />
          </Button>
        </Link>
      </div>
    </Layout>
  )
}
