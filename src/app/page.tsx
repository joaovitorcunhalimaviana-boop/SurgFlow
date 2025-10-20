import Layout from '@/components/layout/Layout'
import FeaturesSection from '@/components/features/FeaturesSection'
import GuidelinesGrid from '@/components/guidelines/GuidelinesGrid'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'

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
              Guidelines Cirúrgicos
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Simplificados
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Acesse guidelines cirúrgicos abrangentes, protocolos e melhores práticas 
              em uma plataforma centralizada. Pronto para otimizar sua prática clínica 
              com recomendações baseadas em evidências científicas.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Tokyo Guidelines 2018</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Atlanta Classification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>WSES Guidelines</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                variant="primary"
                className="group shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
              >
                Explorar Guidelines
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-2 border-purple-200 hover:border-purple-300"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Guidelines Grid */}
      <GuidelinesGrid />

      {/* Enhanced CTA Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Pronto para Transformar sua 
              <span className="text-purple-200 block">Prática Cirúrgica?</span>
            </h2>
            <p className="text-xl text-purple-100 mb-10 leading-relaxed">
              Junte-se aos profissionais de saúde atualizados que confiam no SurgFlow 
              para suas necessidades de guidelines cirúrgicos e decisões clínicas baseadas em evidências.
            </p>
            
            <Button 
              size="xl" 
              className="bg-white text-purple-700 hover:bg-gray-50 shadow-xl hover:shadow-2xl group"
            >
              Comece Hoje Mesmo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
