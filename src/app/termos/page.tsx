'use client'

import Layout from '@/components/layout/Layout'
import { Shield, FileText, Users, Lock, AlertCircle, CheckCircle, Mail, Phone } from 'lucide-react'

export default function TermosPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4 mr-2" />
                Termos de Uso
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Termos de Uso
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                  SurgFlow
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              {/* 1. Aceitação dos Termos */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. Aceitação dos Termos</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ao acessar e utilizar a plataforma SurgFlow, você concorda automaticamente com estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Estes termos podem ser atualizados periodicamente, e é sua responsabilidade revisá-los regularmente.
                </p>
              </div>

              {/* 2. Uso da Plataforma */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. Uso da Plataforma</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-blue-800 font-medium">Conteúdo Educacional</p>
                    <p className="text-blue-700 text-sm mt-1">
                      O SurgFlow oferece conteúdo educacional exclusivamente para profissionais de saúde qualificados.
                    </p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                    <p className="text-amber-800 font-medium">Não Substitui Julgamento Clínico</p>
                    <p className="text-amber-700 text-sm mt-1">
                      As informações fornecidas não substituem o julgamento clínico profissional ou a consulta médica direta.
                    </p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                    <p className="text-green-800 font-medium">Baseado em Guidelines Reconhecidos</p>
                    <p className="text-green-700 text-sm mt-1">
                      Todo conteúdo é baseado em guidelines médicos reconhecidos internacionalmente e evidências científicas.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Propriedade Intelectual */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">3. Propriedade Intelectual</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Todo o conteúdo disponível na plataforma SurgFlow, incluindo mas não limitado a textos, 
                  fluxogramas, calculadoras, imagens e design, é protegido por direitos autorais e outras 
                  leis de propriedade intelectual.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  É proibida a reprodução, distribuição ou modificação do conteúdo sem autorização expressa por escrito.
                </p>
              </div>

              {/* 4. Limitação de Responsabilidade */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <AlertCircle className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">4. Limitação de Responsabilidade</h2>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-red-800 font-semibold mb-3">IMPORTANTE - FERRAMENTA EDUCACIONAL</p>
                  <p className="text-red-700 leading-relaxed mb-4">
                    O SurgFlow é uma ferramenta educacional e de apoio à decisão. Todas as decisões clínicas 
                    são de responsabilidade exclusiva do profissional de saúde.
                  </p>
                  <p className="text-red-700 leading-relaxed">
                    O SurgFlow não se responsabiliza por decisões clínicas tomadas com base nas informações 
                    fornecidas pela plataforma. O usuário assume total responsabilidade pelo uso das informações.
                  </p>
                </div>
              </div>

              {/* 5. Planos e Assinaturas */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Planos e Assinaturas</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Plano Teste (Gratuito):</strong> Acesso limitado a conteúdos básicos e calculadoras essenciais.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Plano GuideFlow:</strong> Acesso completo a todos os guideflows e calculadoras médicas.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Plano MindFlow:</strong> Tudo do GuideFlow + grupo VIP + oportunidades de pesquisa.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm mt-4">
                    Os preços e condições dos planos podem ser alterados mediante aviso prévio de 30 dias.
                  </p>
                </div>
              </div>

              {/* 6. Contato */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <Mail className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">6. Contato</h2>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <p className="text-purple-800 mb-4">
                    Para dúvidas sobre estes Termos de Uso ou questões relacionadas à plataforma:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-purple-700">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>contato@surgflow.com.br</span>
                    </div>
                    <div className="flex items-center text-purple-700">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>Suporte via WhatsApp (disponível na plataforma)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acceptance */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. Aceitação dos Termos</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ao criar uma conta, acessar ou usar qualquer parte do SurgFlow, você confirma que:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Leu, compreendeu e concorda com estes Termos de Uso</li>
                  <li>É um profissional da saúde ou estudante da área médica</li>
                  <li>Tem pelo menos 18 anos de idade</li>
                  <li>Possui capacidade legal para celebrar este acordo</li>
                </ul>
              </div>

              {/* Services */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">3. Descrição dos Serviços</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O SurgFlow oferece três tipos de planos:
                </p>
                <div className="space-y-4 ml-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Plano Teste (Gratuito)</h3>
                    <p className="text-gray-700 text-sm">Acesso limitado a conteúdos básicos e algumas funcionalidades.</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Plano GuideFlow (R$ 57/mês)</h3>
                    <p className="text-gray-700 text-sm">Acesso completo a todos os guidelines e calculadoras médicas.</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Plano MindFlow (R$ 149/mês)</h3>
                    <p className="text-gray-700 text-sm">Tudo do GuideFlow + grupo VIP.</p>
                  </div>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <AlertCircle className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">4. Responsabilidades do Usuário</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ao usar o SurgFlow, você se compromete a:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Fornecer informações verdadeiras e atualizadas durante o cadastro</li>
                  <li>Manter a confidencialidade de suas credenciais de acesso</li>
                  <li>Usar o conteúdo apenas para fins educacionais e profissionais</li>
                  <li>Não compartilhar seu acesso com terceiros</li>
                  <li>Não reproduzir, distribuir ou comercializar nosso conteúdo sem autorização</li>
                  <li>Respeitar os direitos de propriedade intelectual</li>
                </ul>
              </div>

              {/* Medical Disclaimer */}
              <div className="mb-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                    <h2 className="text-2xl font-bold text-red-900">5. Aviso Médico Importante</h2>
                  </div>
                  <p className="text-red-800 leading-relaxed mb-4">
                    <strong>O SurgFlow é uma ferramenta educacional e de apoio à decisão clínica.</strong> 
                    Todo o conteúdo é fornecido apenas para fins informativos e educacionais.
                  </p>
                  <ul className="list-disc list-inside text-red-800 space-y-2 ml-4">
                    <li>Não substitui o julgamento clínico profissional</li>
                    <li>Não constitui aconselhamento médico direto</li>
                    <li>Sempre consulte guidelines oficiais e literatura médica atualizada</li>
                    <li>A responsabilidade final pelas decisões clínicas é sempre do profissional</li>
                  </ul>
                </div>
              </div>

              {/* Payment and Cancellation */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">6. Pagamentos e Cancelamentos</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cobrança</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Os planos pagos são cobrados mensalmente ou anualmente, conforme sua escolha. 
                      A cobrança é processada automaticamente na data de renovação.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Garantia</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Oferecemos 7 dias de garantia incondicional. Se não ficar satisfeito, 
                      devolvemos 100% do valor pago.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cancelamento</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Você pode cancelar sua assinatura a qualquer momento. O acesso continuará 
                      ativo até o final do período pago.
                    </p>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">7. Propriedade Intelectual</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Todo o conteúdo do SurgFlow, incluindo textos, gráficos, logos, ícones, imagens, 
                  fluxogramas e software, é propriedade exclusiva do SurgFlow ou de seus licenciadores.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  É concedida uma licença limitada, não exclusiva e não transferível para uso pessoal 
                  e profissional do conteúdo, exclusivamente dentro da plataforma.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <AlertCircle className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">8. Limitação de Responsabilidade</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O SurgFlow não se responsabiliza por:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Decisões clínicas baseadas no conteúdo da plataforma</li>
                  <li>Danos diretos ou indiretos decorrentes do uso dos serviços</li>
                  <li>Interrupções temporárias do serviço</li>
                  <li>Perda de dados ou informações</li>
                </ul>
              </div>

              {/* Changes to Terms */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">9. Alterações nos Termos</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após a publicação. 
                  O uso continuado da plataforma constitui aceitação dos novos termos.
                </p>
              </div>

              {/* Contact */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">10. Contato</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Para dúvidas sobre estes Termos de Uso, entre em contato conosco através da 
                  página de contato ou pelo email: contato@surgflow.com.br
                </p>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500 text-center">
                  © {new Date().getFullYear()} SurgFlow. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}