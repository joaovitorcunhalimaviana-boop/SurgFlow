import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Stethoscope, 
  Clock, 
  Users, 
  BookOpen, 
  Target, 
  Heart,
  ArrowRight,
  CheckCircle,
  Lightbulb
} from 'lucide-react'
import Link from 'next/link'

export default function SobrePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-25 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              A História do 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                SurgFlow
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Nascido de uma necessidade real durante um plantão noturno, 
              o SurgFlow representa a união entre experiência clínica e inovação tecnológica.
            </p>
          </div>
          
          {/* História Detalhada */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 drop-shadow-xl">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>
                <p className="mb-6">
                  Tudo começou em um plantão de sábado à noite. Um caso de colecistite aguda chegou à emergência, e ao meu redor, estavam estudantes e residentes buscando aprender. Era o momento ideal para ensinar: critérios diagnósticos, classificação de gravidade, estratificação de risco, conduta cirúrgica.
                </p>
                
                <p className="mb-6">
                  Abri o Tokyo Guidelines 2018 no computador — a referência internacional para colecistite. Inúmeras páginas. Informações espalhadas, texto denso, impossível de navegar rapidamente. Como ensinar isso em um plantão? Como tomar decisões ágeis quando o conhecimento está enterrado em PDFs gigantes?
                </p>
                
                <p className="mb-6 font-semibold text-purple-800">
                  Foi naquele momento que nasceu o SurgFlow.
                </p>
                
                <p className="mb-6">
                  A ideia era simples mas poderosa: transformar guidelines complexos em fluxogramas interativos e práticos. Manter o rigor científico, mas entregar respostas em segundos. Permitir que você marque os critérios do paciente e seja guiado até a conduta correta, sem precisar ler as inúmeras páginas dos guidelines.
                </p>
                
                <p className="mb-6">
                  Mas logo percebemos que o problema era maior. Não era apenas sobre acessar informação rapidamente. Estudantes e residentes observam casos complexos sem ter a quem perguntar. Talentos não encontram oportunidades de crescimento.
                </p>
                
                <p className="mb-6">
                  O SurgFlow evoluiu então para um ecossistema cirúrgico completo. Além dos fluxogramas inteligentes, criamos o MindFlow: uma comunidade onde subespecialistas discutem casos clínicos reais, analisam artigos, oferecem estágios e apoiam pesquisas.
                </p>
                
                <p className="mb-0">
                  O SurgFlow nasceu de uma necessidade real, vivida na linha de frente, e hoje visa transformar a forma como cirurgiões, residentes e estudantes aprendem, decidem e crescem profissionalmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Foto do Dr. João Vitor */}
              <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200 flex items-center justify-center">
                <img 
                  src="/congress photo.jpeg" 
                  alt="Dr. João Vitor" 
                  className="w-full h-auto max-w-md rounded-xl object-cover"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sobre o Criador
              </h2>
              
              <div className="prose prose-lg text-gray-600 space-y-6" style={{textAlign: 'justify'}}>
                <p>
                  Formei-me em Medicina em 2019 e, logo em seguida, realizei três anos de residência em Cirurgia Geral no Hospital Universitário Onofre Lopes (HUOL), da Universidade Federal do Rio Grande do Norte (UFRN). Nesse período, aprimorei minha técnica cirúrgica e o raciocínio clínico para o diagnóstico e o tratamento das principais patologias cirúrgicas, sempre atento à segurança e à recuperação rápida do paciente.
                </p>
                
                <p>
                  Após concluir a residência de Cirurgia Geral, retornei a João Pessoa e ingressei na residência de Coloproctologia do Hospital Santa Isabel. Foi quando aprofundei minha atuação no cuidado das doenças do trato digestivo baixo — cólon, reto e ânus — incluindo desde condições benignas comuns até casos mais complexos que exigem abordagem multidisciplinar.
                </p>
                
                <p>
                  A atualização constante é parte do meu compromisso com a qualidade assistencial. Atualmente, curso o Mestrado em Ciência Cirúrgica Interdisciplinar na Universidade Federal de São Paulo (UNIFESP) — Escola Paulista de Medicina, o que me mantém em contato direto com pesquisa, inovação e análise crítica de evidências.
                </p>
                
                <p>
                  Paralelamente, realizo pós-graduação em Ciências Políticas e Atuação Pública (FICV), porque entendo que a boa medicina também depende de políticas de saúde eficientes, acesso e equidade — fatores que impactam de forma concreta a vida dos pacientes.
                </p>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    Dr. João Vítor Viana - Coloproctologista e Cirurgião Geral
                  </p>
                  
                  <div className="flex items-center justify-start">
                    <p className="text-gray-600 mr-4">Me acompanhe no Instagram:</p>
                    <a 
                      href="https://instagram.com/drjoaovitorviana" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      @drjoaovitorviana
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Faça Parte Desta Jornada
            </h2>
            
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Utilize o SurgFlow e ajude a transformar a forma como tomamos decisões clínicas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/planos">
                <Button 
                  size="xl" 
                  className="bg-white text-purple-700 hover:bg-gray-50 shadow-xl hover:shadow-2xl group"
                >
                  Ver Planos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/contato">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-700"
                >
                  Entre em Contato
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}