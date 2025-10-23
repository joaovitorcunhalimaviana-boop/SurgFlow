'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  Send, 
  Users, 
  ArrowLeft,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  BarChart3,
  FileText,
  Image,
  Link,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'

interface EmailCampaign {
  id: string
  name: string
  subject: string
  status: 'draft' | 'scheduled' | 'sent' | 'sending'
  recipients: number
  openRate?: number
  clickRate?: number
  createdAt: string
  scheduledAt?: string
  sentAt?: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  createdAt: string
}

const EmailSystem: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'campaigns' | 'compose' | 'templates'>('campaigns')
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Compose email state
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    recipients: 'all',
    scheduleDate: '',
    scheduleTime: ''
  })

  useEffect(() => {
    // Verificar se o usuário é admin
    if (!isAuthenticated || !user || (user.role !== 'super_admin' && user.plan !== 'admin')) {
      router.push('/')
      return
    }

    loadData()
  }, [isAuthenticated, user, router])

  const loadData = async () => {
    try {
      // Simular carregamento de dados
      setTimeout(() => {
        const mockCampaigns: EmailCampaign[] = [
          {
            id: '1',
            name: 'Newsletter Janeiro 2024',
            subject: 'Novidades do SurgFlow - Janeiro',
            status: 'sent',
            recipients: 1247,
            openRate: 68.5,
            clickRate: 12.3,
            createdAt: '2024-01-15',
            sentAt: '2024-01-16'
          },
          {
            id: '2',
            name: 'Promoção Premium',
            subject: 'Oferta especial: 50% OFF no plano Premium',
            status: 'scheduled',
            recipients: 892,
            createdAt: '2024-01-18',
            scheduledAt: '2024-01-22'
          },
          {
            id: '3',
            name: 'Novos Recursos',
            subject: 'Conheça as novas funcionalidades',
            status: 'draft',
            recipients: 0,
            createdAt: '2024-01-20'
          }
        ]

        const mockTemplates: EmailTemplate[] = [
          {
            id: '1',
            name: 'Newsletter Padrão',
            subject: 'Newsletter {{month}} {{year}}',
            content: '<h1>Olá {{name}}</h1><p>Confira as novidades deste mês...</p>',
            createdAt: '2024-01-10'
          },
          {
            id: '2',
            name: 'Promoção',
            subject: 'Oferta especial para você!',
            content: '<h1>Oferta Imperdível!</h1><p>Aproveite nossa promoção...</p>',
            createdAt: '2024-01-12'
          }
        ]

        setCampaigns(mockCampaigns)
        setTemplates(mockTemplates)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Rascunho', color: 'bg-gray-100 text-gray-800' },
      scheduled: { label: 'Agendado', color: 'bg-blue-100 text-blue-800' },
      sending: { label: 'Enviando', color: 'bg-yellow-100 text-yellow-800' },
      sent: { label: 'Enviado', color: 'bg-green-100 text-green-800' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    )
  }

  const handleSendEmail = async () => {
    // Implementar envio de e-mail
    console.log('Sending email:', emailData)
  }

  const handleScheduleEmail = async () => {
    // Implementar agendamento de e-mail
    console.log('Scheduling email:', emailData)
  }

  const handleSaveDraft = async () => {
    // Implementar salvamento de rascunho
    console.log('Saving draft:', emailData)
  }

  if (!isAuthenticated || !user || (user.role !== 'super_admin' && user.plan !== 'admin')) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button
                onClick={() => router.push('/admin')}
                variant="ghost"
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Mail className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema de E-mails</h1>
                <p className="text-sm text-gray-500">Gerenciar campanhas e envios em massa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campaigns'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Campanhas
            </button>
            <button
              onClick={() => setActiveTab('compose')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compose'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Compor E-mail
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Campanhas de E-mail</h2>
              <Button
                onClick={() => setActiveTab('compose')}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Campanha
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Campanha</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Destinatários</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Taxa de Abertura</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Taxa de Clique</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{campaign.name}</div>
                              <div className="text-sm text-gray-500">{campaign.subject}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(campaign.status)}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {campaign.recipients.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {campaign.openRate ? `${campaign.openRate}%` : '-'}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {campaign.clickRate ? `${campaign.clickRate}%` : '-'}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {campaign.sentAt 
                              ? `Enviado: ${new Date(campaign.sentAt).toLocaleDateString('pt-BR')}`
                              : campaign.scheduledAt
                              ? `Agendado: ${new Date(campaign.scheduledAt).toLocaleDateString('pt-BR')}`
                              : `Criado: ${new Date(campaign.createdAt).toLocaleDateString('pt-BR')}`
                            }
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                              {campaign.status === 'draft' && (
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Compose Tab */}
        {activeTab === 'compose' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Compor E-mail</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Email Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Nova Campanha</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto
                      </label>
                      <input
                        type="text"
                        value={emailData.subject}
                        onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Digite o assunto do e-mail"
                      />
                    </div>

                    {/* Recipients */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destinatários
                      </label>
                      <select
                        value={emailData.recipients}
                        onChange={(e) => setEmailData({...emailData, recipients: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="all">Todos os usuários</option>
                        <option value="premium">Apenas usuários Premium</option>
                        <option value="teste">Apenas usuários Teste</option>
                        <option value="active">Apenas usuários ativos</option>
                      </select>
                    </div>

                    {/* Content Editor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conteúdo
                      </label>
                      
                      {/* Toolbar */}
                      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex space-x-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Underline className="h-4 w-4" />
                        </Button>
                        <div className="border-l border-gray-300 mx-2"></div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <AlignRight className="h-4 w-4" />
                        </Button>
                        <div className="border-l border-gray-300 mx-2"></div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <List className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Link className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Image className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Textarea
                        value={emailData.content}
                        onChange={(e) => setEmailData({...emailData, content: e.target.value})}
                        className="min-h-[300px] rounded-t-none border-t-0"
                        placeholder="Digite o conteúdo do e-mail..."
                      />
                    </div>

                    {/* Schedule */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Envio (opcional)
                        </label>
                        <input
                          type="date"
                          value={emailData.scheduleDate}
                          onChange={(e) => setEmailData({...emailData, scheduleDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horário de Envio (opcional)
                        </label>
                        <input
                          type="time"
                          value={emailData.scheduleTime}
                          onChange={(e) => setEmailData({...emailData, scheduleTime: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleSendEmail}
                        className="flex items-center"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Agora
                      </Button>
                      {emailData.scheduleDate && (
                        <Button
                          onClick={handleScheduleEmail}
                          variant="outline"
                          className="flex items-center"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar
                        </Button>
                      )}
                      <Button
                        onClick={handleSaveDraft}
                        variant="outline"
                        className="flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Salvar Rascunho
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Pré-visualização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="border-b pb-2 mb-4">
                        <div className="text-sm text-gray-600">Para: Usuários selecionados</div>
                        <div className="font-medium">{emailData.subject || 'Sem assunto'}</div>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        {emailData.content ? (
                          <div dangerouslySetInnerHTML={{ __html: emailData.content.replace(/\n/g, '<br>') }} />
                        ) : (
                          <p className="text-gray-400 italic">Conteúdo do e-mail aparecerá aqui...</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Templates de E-mail</h2>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Novo Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Assunto:</div>
                        <div className="text-sm text-gray-600">{template.subject}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Conteúdo:</div>
                        <div className="text-sm text-gray-600 truncate">{template.content}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Criado em {new Date(template.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Usar Template
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailSystem