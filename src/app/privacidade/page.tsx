'use client'

import Layout from '@/components/layout/Layout'
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle, Mail, Phone } from 'lucide-react'

export default function PrivacidadePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-25">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Política de Privacidade
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Política de
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 block">
                  Privacidade
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-green-800 text-sm">
                  <strong>Adequada à LGPD:</strong> Esta política está em conformidade com a 
                  Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              {/* Introduction */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. Introdução</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O SurgFlow respeita sua privacidade e está comprometido em proteger seus dados pessoais. 
                  Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos 
                  suas informações pessoais.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ao usar nossos serviços, você concorda com as práticas descritas nesta política.
                </p>
              </div>

              {/* Data Controller */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. Controlador de Dados</h2>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>SurgFlow</strong> é o controlador dos seus dados pessoais para os fins desta política.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> contato@surgflow.com.br</p>
                    <p><strong>Encarregado de Dados (DPO):</strong> dpo@surgflow.com.br</p>
                  </div>
                </div>
              </div>

              {/* Data Collection */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Database className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">3. Dados Coletados</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">3.1 Dados Fornecidos por Você</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><strong>Nome completo:</strong> Para personalização e identificação</li>
                        <li><strong>Email:</strong> Para comunicação e acesso à conta</li>
                        <li><strong>WhatsApp:</strong> Para comunicações importantes e grupo VIP (MindFlow)</li>
                        <li><strong>Data de nascimento:</strong> Para estatísticas demográficas</li>
                        <li><strong>Senha:</strong> Armazenada de forma criptografada</li>
                        <li><strong>Informações de pagamento:</strong> Processadas por terceiros seguros</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">3.2 Dados Coletados Automaticamente</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><strong>Dados de uso:</strong> Páginas visitadas, tempo de sessão, funcionalidades utilizadas</li>
                        <li><strong>Dados técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional</li>
                        <li><strong>Cookies:</strong> Para melhorar a experiência do usuário</li>
                        <li><strong>Logs de acesso:</strong> Para segurança e análise de performance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Basis */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">4. Base Legal (LGPD)</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Processamos seus dados pessoais com base nas seguintes bases legais da LGPD:
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Execução de Contrato (Art. 7º, V)</h3>
                    <p className="text-gray-700 text-sm">Para fornecer os serviços contratados e gerenciar sua conta.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Consentimento (Art. 7º, I)</h3>
                    <p className="text-gray-700 text-sm">Para comunicações de marketing e funcionalidades opcionais.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Legítimo Interesse (Art. 7º, IX)</h3>
                    <p className="text-gray-700 text-sm">Para segurança, prevenção de fraudes e melhorias do serviço.</p>
                  </div>
                </div>
              </div>

              {/* Data Usage */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Eye className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Como Usamos Seus Dados</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Prestação de Serviços</h3>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Criar e gerenciar sua conta</li>
                      <li>• Fornecer acesso aos conteúdos</li>
                      <li>• Processar pagamentos</li>
                      <li>• Suporte técnico</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Comunicação</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Notificações importantes</li>
                      <li>• Atualizações de conteúdo</li>
                      <li>• Grupo VIP WhatsApp (MindFlow)</li>
                      <li>• Suporte ao cliente</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Melhorias</h3>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Análise de uso da plataforma</li>
                      <li>• Desenvolvimento de novos recursos</li>
                      <li>• Personalização de conteúdo</li>
                      <li>• Otimização de performance</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-900 mb-2">Segurança</h3>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Prevenção de fraudes</li>
                      <li>• Monitoramento de segurança</li>
                      <li>• Cumprimento legal</li>
                      <li>• Proteção de dados</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Sharing */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">6. Compartilhamento de Dados</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Não vendemos seus dados pessoais.</strong> Compartilhamos informações apenas nas seguintes situações:
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Prestadores de Serviços</h3>
                    <p className="text-gray-700 text-sm">
                      Processadores de pagamento, provedores de email, serviços de hospedagem - 
                      todos com contratos de proteção de dados.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Obrigações Legais</h3>
                    <p className="text-gray-700 text-sm">
                      Quando exigido por lei, ordem judicial ou autoridades competentes.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Proteção de Direitos</h3>
                    <p className="text-gray-700 text-sm">
                      Para proteger nossos direitos, propriedade, segurança ou de terceiros.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">7. Segurança dos Dados</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800 text-sm">Criptografia SSL/TLS</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800 text-sm">Senhas criptografadas</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Database className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800 text-sm">Backups seguros</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Eye className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800 text-sm">Monitoramento 24/7</span>
                  </div>
                </div>
              </div>

              {/* Data Retention */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Database className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">8. Retenção de Dados</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Contas Ativas</h3>
                    <p className="text-blue-800 text-sm">
                      Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário 
                      para fornecer os serviços.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">Contas Canceladas</h3>
                    <p className="text-yellow-800 text-sm">
                      Após o cancelamento, mantemos dados por até 5 anos para fins legais e contábeis, 
                      depois são anonimizados ou excluídos.
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-900 mb-2">Dados de Marketing</h3>
                    <p className="text-red-800 text-sm">
                      Mantidos até que você retire o consentimento ou solicite a exclusão.
                    </p>
                  </div>
                </div>
              </div>

              {/* User Rights */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">9. Seus Direitos (LGPD)</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Você tem os seguintes direitos sobre seus dados pessoais:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Acesso</h3>
                    <p className="text-purple-800 text-sm">Saber quais dados temos sobre você</p>
                  </div>
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Correção</h3>
                    <p className="text-purple-800 text-sm">Corrigir dados incompletos ou incorretos</p>
                  </div>
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Exclusão</h3>
                    <p className="text-purple-800 text-sm">Solicitar a remoção de seus dados</p>
                  </div>
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Portabilidade</h3>
                    <p className="text-purple-800 text-sm">Receber seus dados em formato estruturado</p>
                  </div>
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Oposição</h3>
                    <p className="text-purple-800 text-sm">Opor-se ao processamento de seus dados</p>
                  </div>
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Revogação</h3>
                    <p className="text-purple-800 text-sm">Retirar consentimento a qualquer momento</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    <strong>Para exercer seus direitos:</strong> Entre em contato através do email 
                    <strong> dpo@surgflow.com.br</strong> ou pela página de contato.
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Eye className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">10. Cookies</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Usamos cookies para melhorar sua experiência:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cookies Essenciais</h3>
                      <p className="text-gray-700 text-sm">Necessários para o funcionamento básico da plataforma</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cookies de Performance</h3>
                      <p className="text-gray-700 text-sm">Para análise de uso e melhorias (com seu consentimento)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Changes */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">11. Alterações na Política</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
                  por email ou através da plataforma. A versão mais atual estará sempre disponível nesta página.
                </p>
              </div>

              {/* Contact */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <Mail className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">12. Contato</h2>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-purple-800 leading-relaxed mb-4">
                    Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos:
                  </p>
                  <div className="space-y-2 text-purple-700">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm"><strong>Email geral:</strong> contato@surgflow.com.br</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="text-sm"><strong>Encarregado de Dados:</strong> dpo@surgflow.com.br</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm"><strong>ANPD:</strong> Você pode registrar reclamações na Autoridade Nacional</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500 text-center">
                  © {new Date().getFullYear()} SurgFlow. Todos os direitos reservados. 
                  Política adequada à LGPD (Lei nº 13.709/2018).
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}