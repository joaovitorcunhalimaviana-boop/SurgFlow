'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ArrowLeft,
  Download,
  Calendar,
  Eye,
  MousePointer,
  Clock,
  DollarSign,
  Mail,
  MessageCircle,
  Activity,
  Filter,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  newUsers: number
  premiumUsers: number
  totalRevenue: number
  monthlyRevenue: number
  pageViews: number
  uniqueVisitors: number
  avgSessionTime: string
  bounceRate: number
  emailsSent: number
  emailOpenRate: number
  whatsappMessages: number
  whatsappDeliveryRate: number
}

interface ChartData {
  date: string
  users: number
  revenue: number
  pageViews: number
}

interface TopPage {
  path: string
  views: number
  uniqueViews: number
  avgTime: string
}

interface UserActivity {
  id: string
  user: string
  action: string
  timestamp: string
  details: string
}

const AnalyticsSystem: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'marketing' | 'activity'>('overview')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [topPages, setTopPages] = useState<TopPage[]>([])
  const [userActivity, setUserActivity] = useState<UserActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    // Verificar se o usuário é admin
    if (!isAuthenticated || !user || (user.role !== 'super_admin' && user.plan !== 'admin')) {
      router.push('/')
      return
    }

    loadAnalyticsData()
  }, [isAuthenticated, user, router, dateRange])

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true)
      
      // Simular carregamento de dados
      setTimeout(() => {
        const mockAnalytics: AnalyticsData = {
          totalUsers: 2847,
          activeUsers: 1923,
          newUsers: 247,
          premiumUsers: 892,
          totalRevenue: 45670.50,
          monthlyRevenue: 12890.25,
          pageViews: 18456,
          uniqueVisitors: 7234,
          avgSessionTime: '4m 32s',
          bounceRate: 32.5,
          emailsSent: 5420,
          emailOpenRate: 68.3,
          whatsappMessages: 3210,
          whatsappDeliveryRate: 94.7
        }

        const mockChartData: ChartData[] = [
          { date: '2024-01-14', users: 145, revenue: 1250.00, pageViews: 890 },
          { date: '2024-01-15', users: 167, revenue: 1450.50, pageViews: 1020 },
          { date: '2024-01-16', users: 189, revenue: 1680.75, pageViews: 1150 },
          { date: '2024-01-17', users: 203, revenue: 1890.25, pageViews: 1280 },
          { date: '2024-01-18', users: 178, revenue: 1560.00, pageViews: 1100 },
          { date: '2024-01-19', users: 234, revenue: 2150.50, pageViews: 1450 },
          { date: '2024-01-20', users: 267, revenue: 2380.75, pageViews: 1620 }
        ]

        const mockTopPages: TopPage[] = [
          { path: '/calculadoras', views: 3420, uniqueViews: 2890, avgTime: '5m 23s' },
          { path: '/casos-clinicos', views: 2890, uniqueViews: 2340, avgTime: '7m 45s' },
          { path: '/guideline', views: 2456, uniqueViews: 1980, avgTime: '6m 12s' },
          { path: '/planos', views: 1890, uniqueViews: 1650, avgTime: '3m 28s' },
          { path: '/sobre', views: 1234, uniqueViews: 1100, avgTime: '2m 15s' }
        ]

        const mockUserActivity: UserActivity[] = [
          {
            id: '1',
            user: 'Dr. João Silva',
            action: 'Login',
            timestamp: '2024-01-20T14:30:00Z',
            details: 'Login realizado com sucesso'
          },
          {
            id: '2',
            user: 'Dra. Maria Santos',
            action: 'Upgrade',
            timestamp: '2024-01-20T14:25:00Z',
            details: 'Upgrade para plano Premium'
          },
          {
            id: '3',
            user: 'Dr. Pedro Costa',
            action: 'Calculadora',
            timestamp: '2024-01-20T14:20:00Z',
            details: 'Usou calculadora de IMC'
          },
          {
            id: '4',
            user: 'Dra. Ana Lima',
            action: 'Caso Clínico',
            timestamp: '2024-01-20T14:15:00Z',
            details: 'Visualizou caso clínico premium'
          },
          {
            id: '5',
            user: 'Dr. Carlos Oliveira',
            action: 'Cadastro',
            timestamp: '2024-01-20T14:10:00Z',
            details: 'Novo usuário cadastrado'
          }
        ]

        setAnalyticsData(mockAnalytics)
        setChartData(mockChartData)
        setTopPages(mockTopPages)
        setUserActivity(mockUserActivity)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  const getDateRangeLabel = (range: string) => {
    const labels = {
      '7d': 'Últimos 7 dias',
      '30d': 'Últimos 30 dias',
      '90d': 'Últimos 90 dias',
      '1y': 'Último ano'
    }
    return labels[range as keyof typeof labels] || 'Período personalizado'
  }

  if (!isAuthenticated || !user || (user.role !== 'super_admin' && user.plan !== 'admin')) {
    return null
  }

  if (isLoading || !analyticsData) {
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
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics & Relatórios</h1>
                <p className="text-sm text-gray-500">Análise detalhada de performance e uso</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="1y">Último ano</option>
              </select>
              <Button variant="outline" onClick={loadAnalyticsData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Usuários
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Conteúdo
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'marketing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Marketing
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'activity'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Atividade
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                      <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.totalUsers)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">+12.5%</span>
                    <span className="text-gray-500 ml-1">vs período anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.monthlyRevenue)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">+8.2%</span>
                    <span className="text-gray-500 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Visualizações</p>
                      <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.pageViews)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">+15.3%</span>
                    <span className="text-gray-500 ml-1">vs período anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.avgSessionTime}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">+5.7%</span>
                    <span className="text-gray-500 ml-1">vs período anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usuários por Dia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {chartData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="bg-blue-500 rounded-t w-full"
                          style={{ height: `${(data.users / Math.max(...chartData.map(d => d.users))) * 200}px` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(data.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Receita por Dia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {chartData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="bg-green-500 rounded-t w-full"
                          style={{ height: `${(data.revenue / Math.max(...chartData.map(d => d.revenue))) * 200}px` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(data.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.activeUsers)}</div>
                    <div className="text-sm text-gray-600">Usuários Ativos</div>
                    <div className="text-xs text-green-600 mt-1">+5.2% vs período anterior</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.newUsers)}</div>
                    <div className="text-sm text-gray-600">Novos Usuários</div>
                    <div className="text-xs text-green-600 mt-1">+18.7% vs período anterior</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.premiumUsers)}</div>
                    <div className="text-sm text-gray-600">Usuários Premium</div>
                    <div className="text-xs text-green-600 mt-1">+12.3% vs período anterior</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{analyticsData.bounceRate}%</div>
                    <div className="text-sm text-gray-600">Taxa de Rejeição</div>
                    <div className="text-xs text-red-600 mt-1">-2.1% vs período anterior</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Usuários por Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                      <span className="text-sm font-medium">Teste</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatNumber(analyticsData.totalUsers - analyticsData.premiumUsers)} usuários
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                      <span className="text-sm font-medium">Premium</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatNumber(analyticsData.premiumUsers)} usuários
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Páginas Mais Visitadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Página</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Visualizações</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Visitantes Únicos</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Tempo Médio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPages.map((page, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4 font-medium text-gray-900">{page.path}</td>
                          <td className="py-4 px-4 text-gray-600">{formatNumber(page.views)}</td>
                          <td className="py-4 px-4 text-gray-600">{formatNumber(page.uniqueViews)}</td>
                          <td className="py-4 px-4 text-gray-600">{page.avgTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Marketing Tab */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    E-mail Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">E-mails Enviados</span>
                    <span className="font-medium">{formatNumber(analyticsData.emailsSent)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Taxa de Abertura</span>
                    <span className="font-medium text-green-600">{analyticsData.emailOpenRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.emailOpenRate}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp Marketing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mensagens Enviadas</span>
                    <span className="font-medium">{formatNumber(analyticsData.whatsappMessages)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Taxa de Entrega</span>
                    <span className="font-medium text-green-600">{analyticsData.whatsappDeliveryRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.whatsappDeliveryRate}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Atividade Recente dos Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{activity.user}</div>
                          <div className="text-sm text-gray-600">{activity.details}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{activity.action}</Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsSystem