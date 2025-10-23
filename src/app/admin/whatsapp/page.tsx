'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  MessageCircle, 
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
  Phone,
  UserPlus,
  Download,
  Upload,
  Filter,
  Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'

interface WhatsAppContact {
  id: string
  name: string
  phone: string
  status: 'active' | 'inactive' | 'blocked'
  lastMessage?: string
  lastMessageAt?: string
  tags: string[]
}

interface BroadcastList {
  id: string
  name: string
  description: string
  contacts: number
  status: 'active' | 'inactive'
  createdAt: string
  lastBroadcast?: string
}

interface BroadcastMessage {
  id: string
  listId: string
  listName: string
  message: string
  status: 'draft' | 'scheduled' | 'sent' | 'sending'
  recipients: number
  delivered?: number
  read?: number
  createdAt: string
  scheduledAt?: string
  sentAt?: string
}

const WhatsAppSystem: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'contacts' | 'lists' | 'broadcast' | 'messages'>('contacts')
  const [contacts, setContacts] = useState<WhatsAppContact[]>([])
  const [broadcastLists, setBroadcastLists] = useState<BroadcastList[]>([])
  const [messages, setMessages] = useState<BroadcastMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Broadcast message state
  const [messageData, setMessageData] = useState({
    listId: '',
    message: '',
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
        const mockContacts: WhatsAppContact[] = [
          {
            id: '1',
            name: 'Dr. João Silva',
            phone: '+5511999887766',
            status: 'active',
            lastMessage: 'Obrigado pelas informações!',
            lastMessageAt: '2024-01-20T10:30:00Z',
            tags: ['premium', 'cirurgião']
          },
          {
            id: '2',
            name: 'Dra. Maria Santos',
            phone: '+5511888776655',
            status: 'active',
            lastMessage: 'Quando será o próximo webinar?',
            lastMessageAt: '2024-01-19T15:45:00Z',
            tags: ['teste', 'residente']
          },
          {
            id: '3',
            name: 'Dr. Pedro Costa',
            phone: '+5511777665544',
            status: 'inactive',
            tags: ['premium', 'especialista']
          }
        ]

        const mockLists: BroadcastList[] = [
          {
            id: '1',
            name: 'Usuários Premium',
            description: 'Lista de todos os usuários com plano Premium',
            contacts: 247,
            status: 'active',
            createdAt: '2024-01-10',
            lastBroadcast: '2024-01-18'
          },
          {
            id: '2',
            name: 'Novos Usuários',
            description: 'Usuários cadastrados nos últimos 30 dias',
            contacts: 89,
            status: 'active',
            createdAt: '2024-01-15'
          },
          {
            id: '3',
            name: 'Cirurgiões Especialistas',
            description: 'Lista segmentada por especialidade',
            contacts: 156,
            status: 'active',
            createdAt: '2024-01-12',
            lastBroadcast: '2024-01-20'
          }
        ]

        const mockMessages: BroadcastMessage[] = [
          {
            id: '1',
            listId: '1',
            listName: 'Usuários Premium',
            message: 'Novidades do SurgFlow! Confira as novas funcionalidades disponíveis.',
            status: 'sent',
            recipients: 247,
            delivered: 245,
            read: 198,
            createdAt: '2024-01-18',
            sentAt: '2024-01-18'
          },
          {
            id: '2',
            listId: '3',
            listName: 'Cirurgiões Especialistas',
            message: 'Webinar exclusivo sobre técnicas avançadas - Inscreva-se já!',
            status: 'scheduled',
            recipients: 156,
            createdAt: '2024-01-20',
            scheduledAt: '2024-01-22'
          }
        ]

        setContacts(mockContacts)
        setBroadcastLists(mockLists)
        setMessages(mockMessages)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Ativo', color: 'bg-green-100 text-green-800' },
      inactive: { label: 'Inativo', color: 'bg-gray-100 text-gray-800' },
      blocked: { label: 'Bloqueado', color: 'bg-red-100 text-red-800' },
      draft: { label: 'Rascunho', color: 'bg-gray-100 text-gray-800' },
      scheduled: { label: 'Agendado', color: 'bg-blue-100 text-blue-800' },
      sending: { label: 'Enviando', color: 'bg-yellow-100 text-yellow-800' },
      sent: { label: 'Enviado', color: 'bg-green-100 text-green-800' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    )
  }

  const handleSendBroadcast = async () => {
    // Implementar envio de broadcast
    console.log('Sending broadcast:', messageData)
  }

  const handleScheduleBroadcast = async () => {
    // Implementar agendamento de broadcast
    console.log('Scheduling broadcast:', messageData)
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  )

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
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema WhatsApp</h1>
                <p className="text-sm text-gray-500">Gerenciar contatos e listas de transmissão</p>
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
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Contatos
            </button>
            <button
              onClick={() => setActiveTab('lists')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lists'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Listas de Transmissão
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'broadcast'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Enviar Mensagem
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Histórico
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Contatos WhatsApp</h2>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Importar
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar Contato
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar contatos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Nome</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Telefone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Tags</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Última Mensagem</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{contact.name}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{contact.phone}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(contact.status)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1">
                              {contact.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {contact.lastMessage ? (
                              <div>
                                <div className="text-sm text-gray-600 truncate max-w-xs">
                                  {contact.lastMessage}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {new Date(contact.lastMessageAt!).toLocaleDateString('pt-BR')}
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">Nenhuma mensagem</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
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

        {/* Lists Tab */}
        {activeTab === 'lists' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Listas de Transmissão</h2>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Nova Lista
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {broadcastLists.map((list) => (
                <Card key={list.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{list.name}</CardTitle>
                      {getStatusBadge(list.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{list.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {list.contacts} contatos
                      </div>
                      <div className="text-xs text-gray-500">
                        Criada em {new Date(list.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      {list.lastBroadcast && (
                        <div className="text-xs text-gray-500">
                          Último envio: {new Date(list.lastBroadcast).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Send className="h-4 w-4 mr-1" />
                          Enviar
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
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

        {/* Broadcast Tab */}
        {activeTab === 'broadcast' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Enviar Mensagem em Massa</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Nova Mensagem</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* List Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lista de Transmissão
                      </label>
                      <select
                        value={messageData.listId}
                        onChange={(e) => setMessageData({...messageData, listId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Selecione uma lista</option>
                        {broadcastLists.map((list) => (
                          <option key={list.id} value={list.id}>
                            {list.name} ({list.contacts} contatos)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem
                      </label>
                      <Textarea
                        value={messageData.message}
                        onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                        className="min-h-[200px]"
                        placeholder="Digite sua mensagem..."
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {messageData.message.length}/1000 caracteres
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data de Envio (opcional)
                        </label>
                        <input
                          type="date"
                          value={messageData.scheduleDate}
                          onChange={(e) => setMessageData({...messageData, scheduleDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horário de Envio (opcional)
                        </label>
                        <input
                          type="time"
                          value={messageData.scheduleTime}
                          onChange={(e) => setMessageData({...messageData, scheduleTime: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleSendBroadcast}
                        className="flex items-center"
                        disabled={!messageData.listId || !messageData.message}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Agora
                      </Button>
                      {messageData.scheduleDate && (
                        <Button
                          onClick={handleScheduleBroadcast}
                          variant="outline"
                          className="flex items-center"
                          disabled={!messageData.listId || !messageData.message}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar
                        </Button>
                      )}
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
                    <div className="border rounded-lg p-4 bg-green-50">
                      <div className="flex items-center mb-3">
                        <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">WhatsApp</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        {messageData.message ? (
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">
                            {messageData.message}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400 italic">
                            Sua mensagem aparecerá aqui...
                          </p>
                        )}
                      </div>
                      {messageData.listId && (
                        <div className="mt-3 text-xs text-gray-600">
                          Para: {broadcastLists.find(l => l.id === messageData.listId)?.name}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Histórico de Mensagens</h2>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Lista</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Mensagem</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Destinatários</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Entregues</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Lidas</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((message) => (
                        <tr key={message.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{message.listName}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-600 truncate max-w-xs">
                              {message.message}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(message.status)}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {message.recipients}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {message.delivered || '-'}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {message.read || '-'}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {message.sentAt 
                              ? `Enviado: ${new Date(message.sentAt).toLocaleDateString('pt-BR')}`
                              : message.scheduledAt
                              ? `Agendado: ${new Date(message.scheduledAt).toLocaleDateString('pt-BR')}`
                              : `Criado: ${new Date(message.createdAt).toLocaleDateString('pt-BR')}`
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
      </div>
    </div>
  )
}

export default WhatsAppSystem