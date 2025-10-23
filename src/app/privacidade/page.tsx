'use client'

import Layout from '@/components/layout/Layout'
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle, Mail, Phone, FileText, Users } from 'lucide-react'

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
              
              {/* 1. Informações que Coletamos */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Database className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. Informações que Coletamos</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-blue-800 font-medium mb-2">Dados de Cadastro</p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Nome completo</li>
                      <li>• Endereço de email</li>
                      <li>• Número de telefone</li>
                      <li>• Informações profissionais (CRM, especialidade)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                    <p className="text-green-800 font-medium mb-2">Dados de Uso da Plataforma</p>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Páginas visitadas e tempo de navegação</li>
                      <li>• Guideflows acessados</li>
                      <li>• Calculadoras utilizadas</li>
                      <li>• Histórico de atividades</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                    <p className="text-amber-800 font-medium mb-2">Cookies e Tecnologias Similares</p>
                    <p className="text-amber-700 text-sm">
                      Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o uso da plataforma.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Como Usamos Seus Dados */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Eye className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. Como Usamos Seus Dados</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-800 mb-2">Fornecer Acesso à Plataforma</h3>
                      <p className="text-purple-700 text-sm">
                        Autenticação, personalização de conteúdo e gerenciamento de sua conta.
                      </p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <h3 className="font-semibold text-indigo-800 mb-2">Melhorar Nossos Serviços</h3>
                      <p className="text-indigo-700 text-sm">
                        Análise de uso para aprimorar funcionalidades e desenvolver novos recursos.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <h3 className="font-semibold text-teal-800 mb-2">Comunicações</h3>
                      <p className="text-teal-700 text-sm">
                        Envio de atualizações, novidades e informações relevantes sobre a plataforma.
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h3 className="font-semibold text-orange-800 mb-2">Suporte Técnico</h3>
                      <p className="text-orange-700 text-sm">
                        Resolução de problemas e atendimento às suas solicitações.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Compartilhamento de Dados */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">3. Compartilhamento de Dados</h2>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">Compromisso de Privacidade</h3>
                      <p className="text-red-700 mb-4">
                        <strong>Não vendemos ou compartilhamos seus dados pessoais com terceiros</strong> para fins comerciais ou de marketing.
                      </p>
                      <p className="text-red-700 text-sm">
                        Seus dados podem ser compartilhados apenas em casos específicos exigidos por lei ou para proteção de direitos legítimos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Seus Direitos (LGPD) */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">4. Seus Direitos (LGPD)</h2>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                  <p className="text-purple-800 font-medium mb-4">
                    De acordo com a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-purple-700">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-sm"><strong>Acessar</strong> seus dados pessoais</span>
                      </div>
                      <div className="flex items-center text-purple-700">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-sm"><strong>Corrigir</strong> dados incorretos ou desatualizados</span>
                      </div>
                      <div className="flex items-center text-purple-700">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-sm"><strong>Solicitar exclusão</strong> de seus dados</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-purple-700">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-sm"><strong>Revogar consentimento</strong> a qualquer momento</span>
                      </div>
                      <div className="flex items-center text-purple-700">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-sm"><strong>Portabilidade</strong> dos dados</span>
                      </div>
                      <div className="flex items-center text-purple-700">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        <span className="text-sm"><strong>Informações</strong> sobre uso e compartilhamento</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Segurança dos Dados */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Segurança dos Dados</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-700 text-sm font-medium">Acesso não autorizado</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <Lock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-700 text-sm font-medium">Alteração indevida</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <AlertTriangle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-700 text-sm font-medium">Perda ou destruição</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Contato para Exercer Direitos */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <Mail className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">6. Contato para Exercer Seus Direitos</h2>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
                  <p className="text-purple-800 mb-4 font-medium">
                    Para exercer qualquer um dos seus direitos relacionados aos dados pessoais, entre em contato conosco:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-purple-700">
                      <Mail className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">Email para Privacidade:</p>
                        <p className="text-sm">privacidade@surgflow.com.br</p>
                      </div>
                    </div>
                    <div className="flex items-center text-purple-700">
                      <Phone className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">Suporte Geral:</p>
                        <p className="text-sm">contato@surgflow.com.br</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border border-purple-200">
                    <p className="text-purple-700 text-sm">
                      <strong>Prazo de Resposta:</strong> Responderemos às suas solicitações em até 15 dias úteis, 
                      conforme estabelecido pela LGPD.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}