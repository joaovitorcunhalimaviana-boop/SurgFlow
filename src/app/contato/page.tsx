import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  User,
  FileText,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react'

export default function ContatoPage() {
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
              Entre em 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                Contato
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Tem dúvidas, sugestões ou quer contribuir com o projeto? 
              Estamos aqui para ajudar e ouvir sua opinião.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-purple-200 shadow-lg">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-2xl flex items-center">
                    <MessageCircle className="h-6 w-6 text-purple-600 mr-3" />
                    Envie sua Mensagem
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            id="nome"
                            name="nome"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                            placeholder="Seu nome completo"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <select
                        id="assunto"
                        name="assunto"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Dúvida sobre Guidelines</option>
                        <option value="sugestao">Sugestão de Melhoria</option>
                        <option value="erro">Relatar Erro</option>
                        <option value="contribuicao">Quero Contribuir</option>
                        <option value="parceria">Proposta de Parceria</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                          id="mensagem"
                          name="mensagem"
                          rows={6}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                          placeholder="Descreva sua mensagem, dúvida ou sugestão..."
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                        Quero receber atualizações sobre novos guidelines e funcionalidades
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-purple-600 hover:bg-purple-700 group"
                    >
                      <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-xl">Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">E-mail</h4>
                      <p className="text-gray-600">contato@surgflow.com</p>
                      <p className="text-sm text-gray-500">Resposta em até 24 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Telefone</h4>
                      <p className="text-gray-600">+55 (11) 99999-9999</p>
                      <p className="text-sm text-gray-500">Segunda a sexta, 9h às 18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Localização</h4>
                      <p className="text-gray-600">São Paulo, SP - Brasil</p>
                      <p className="text-sm text-gray-500">Atendimento remoto</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Horário de Atendimento</h4>
                      <p className="text-gray-600">Segunda a sexta: 9h às 18h</p>
                      <p className="text-gray-600">Sábado: 9h às 12h</p>
                      <p className="text-sm text-gray-500">Fuso horário: GMT-3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-xl">Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com/in/surgflow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-100 hover:bg-blue-200 p-3 rounded-lg transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-6 w-6 text-blue-600" />
                    </a>
                    <a
                      href="https://twitter.com/surgflow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-sky-100 hover:bg-sky-200 p-3 rounded-lg transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-6 w-6 text-sky-600" />
                    </a>
                    <a
                      href="https://github.com/surgflow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <Github className="h-6 w-6 text-gray-600" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Siga-nos para atualizações sobre novos guidelines e funcionalidades
                  </p>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">
                      Dúvidas Frequentes?
                    </h3>
                    <p className="text-purple-700 mb-4">
                      Confira nossa seção de perguntas frequentes antes de entrar em contato
                    </p>
                    <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                      Ver FAQ
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nosso Compromisso com Você
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Valorizamos cada mensagem e feedback recebido
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resposta Rápida</h3>
              <p className="text-gray-600">
                Respondemos todas as mensagens em até 24 horas durante dias úteis
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Atendimento Personalizado</h3>
              <p className="text-gray-600">
                Cada mensagem é lida e respondida pessoalmente pelo criador do projeto
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback Valorizado</h3>
              <p className="text-gray-600">
                Suas sugestões e críticas nos ajudam a melhorar continuamente a plataforma
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}