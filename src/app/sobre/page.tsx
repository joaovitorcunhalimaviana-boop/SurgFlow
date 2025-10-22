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
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Sábado, Plantão Noturno
                </h2>
              </div>
              
              <div className="prose prose-lg text-gray-600 space-y-6">
                <p>
                  Era um sábado à noite no hospital. Como cirurgião geral e coloproctologista, 
                  eu estava de plantão quando chegou uma estudante de medicina para acompanhar 
                  os casos. Discutíamos um paciente com colecistite aguda - diagnóstico, 
                  classificação, condutas.
                </p>
                
                <p>
                  Tentei explicar o passo a passo: desde o diagnóstico inicial, passando pelos 
                  critérios de Tokyo, classificação em graus, até as condutas específicas para 
                  cada situação. Mas havia um problema...
                </p>
                
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                  <p className="text-purple-800 font-medium italic">
                    "Eu não tinha algo palpável para mostrar a ela. O guideline de Tóquio 
                    é extenso, complexo, não dá para resumir rapidamente durante um plantão."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-center mb-6">
                  <Lightbulb className="h-16 w-16 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  O Momento Eureka
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  "E aí eu tive a ideia de criar esse site. Fluxogramas simples, 
                  interativos, que pudessem ser usados rapidamente nos plantões 
                  e ajudassem os estudantes a aprender."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nossa Visão e Missão
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformar guidelines complexos em ferramentas práticas e acessíveis 
              para toda a comunidade médica.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Para Quem Criamos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Estudantes de medicina
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Residentes de cirurgia
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Cirurgiões experientes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Profissionais de emergência
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Nosso Objetivo</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Fluxogramas interativos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Acesso rápido nos plantões
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Decisões baseadas em evidência
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Aprendizado simplificado
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Nosso Foco</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Abdômen agudo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Pré e pós-operatório
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Guidelines internacionais
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Protocolos simplificados
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Creator Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center mb-6">
                  <Stethoscope className="h-12 w-12 text-purple-200 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">Dr. João Vitor</h3>
                    <p className="text-purple-200">Criador do SurgFlow</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-purple-300 mr-3" />
                    <span>Cirurgião Geral</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-purple-300 mr-3" />
                    <span>Coloproctologista</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-purple-300 mr-3" />
                    <span>Educador Médico</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-purple-300 mr-3" />
                    <span>Mentor de Residentes</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-purple-500">
                  <p className="text-purple-100 text-sm">
                    "Transformando a complexidade dos guidelines em simplicidade prática"
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sobre o Criador
              </h2>
              
              <div className="prose prose-lg text-gray-600 space-y-6">
                <p>
                  Como cirurgião geral e coloproctologista, tenho a paixão de ensinar 
                  e compartilhar conhecimento com a próxima geração de médicos. 
                  Recebo regularmente estudantes e residentes, sempre buscando 
                  maneiras de tornar o aprendizado mais eficiente e prático.
                </p>
                
                <p>
                  A experiência daquele plantão noturno me mostrou uma lacuna real: 
                  a dificuldade de acessar rapidamente informações estruturadas dos 
                  guidelines durante a prática clínica. O SurgFlow nasceu para 
                  preencher essa lacuna.
                </p>
                
                <p>
                  Minha experiência em plantões noturnos, emergências e no ensino 
                  médico me deu a perspectiva única necessária para criar uma 
                  ferramenta que realmente atende às necessidades dos profissionais 
                  de saúde no dia a dia.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <p className="text-gray-800 font-medium">
                    "Meu objetivo é democratizar o acesso aos principais guidelines 
                    cirúrgicos, tornando-os ferramentas práticas para o dia a dia 
                    médico, desde o estudante até o cirurgião experiente. Cada 
                    fluxograma criado representa horas de plantão e anos de experiência 
                    condensados em uma ferramenta simples e eficaz."
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Formação</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Medicina - UFMG</li>
                      <li>• Residência em Cirurgia Geral</li>
                      <li>• Especialização em Coloproctologia</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Experiência</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• +10 anos em cirurgia</li>
                      <li>• +5 anos ensinando</li>
                      <li>• +1000 plantões noturnos</li>
                    </ul>
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
              Junte-se a milhares de profissionais que já utilizam o SurgFlow 
              para tomar decisões clínicas mais rápidas e precisas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button 
                  size="xl" 
                  className="bg-white text-purple-700 hover:bg-gray-50 shadow-xl hover:shadow-2xl group"
                >
                  Explorar Guidelines
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