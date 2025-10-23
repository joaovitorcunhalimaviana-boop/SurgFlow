'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Plus, 
  Download,
  ArrowLeft,
  Eye,
  Ban,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface User {
  id: string
  fullName: string
  email: string
  whatsapp: string
  plan: 'teste' | 'premium' | 'admin'
  role: 'user' | 'admin' | 'super_admin'
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

const UserManagement: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPlan, setFilterPlan] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    // Verificar se o usuário é admin
    if (!isAuthenticated || !user || (user.role !== 'super_admin' && user.plan !== 'admin')) {
      router.push('/')
      return
    }

    loadUsers()
  }, [isAuthenticated, user, router])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, filterPlan, filterStatus])

  const loadUsers = async () => {
    try {
      // Simular carregamento de usuários - em produção, fazer chamada para API
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            id: '1',
            fullName: 'João Silva',
            email: 'joao@email.com',
            whatsapp: '11999999999',
            plan: 'premium',
            role: 'user',
            isActive: true,
            createdAt: '2024-01-15',
            lastLogin: '2024-01-20'
          },
          {
            id: '2',
            fullName: 'Maria Santos',
            email: 'maria@email.com',
            whatsapp: '11888888888',
            plan: 'teste',
            role: 'user',
            isActive: true,
            createdAt: '2024-01-10',
            lastLogin: '2024-01-19'
          },
          {
            id: '3',
            fullName: 'Pedro Costa',
            email: 'pedro@email.com',
            whatsapp: '11777777777',
            plan: 'premium',
            role: 'user',
            isActive: false,
            createdAt: '2024-01-05'
          },
          {
            id: '4',
            fullName: 'Ana Oliveira',
            email: 'ana@email.com',
            whatsapp: '11666666666',
            plan: 'teste',
            role: 'user',
            isActive: true,
            createdAt: '2024-01-12',
            lastLogin: '2024-01-18'
          }
        ]
        setUsers(mockUsers)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      setIsLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.whatsapp.includes(searchTerm)
      )
    }

    // Filtro por plano
    if (filterPlan !== 'all') {
      filtered = filtered.filter(user => user.plan === filterPlan)
    }

    // Filtro por status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => 
        filterStatus === 'active' ? user.isActive : !user.isActive
      )
    }

    setFilteredUsers(filtered)
  }

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      teste: { label: 'Teste', color: 'bg-gray-100 text-gray-800' },
      premium: { label: 'Premium', color: 'bg-purple-100 text-purple-800' },
      admin: { label: 'Admin', color: 'bg-red-100 text-red-800' }
    }
    
    const config = planConfig[plan as keyof typeof planConfig] || planConfig.teste
    
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    )
  }

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge className={`${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
        {isActive ? 'Ativo' : 'Inativo'}
      </Badge>
    )
  }

  const handleToggleUserStatus = async (userId: string) => {
    // Implementar toggle de status do usuário
    console.log('Toggle status for user:', userId)
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      // Implementar exclusão do usuário
      console.log('Delete user:', userId)
    }
  }

  const handleExportUsers = () => {
    // Implementar exportação de usuários
    console.log('Export users')
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
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
                <p className="text-sm text-gray-500">{filteredUsers.length} usuários encontrados</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleExportUsers}
                variant="outline"
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Plan Filter */}
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">Todos os planos</option>
                <option value="teste">Teste</option>
                <option value="premium">Premium</option>
                <option value="admin">Admin</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>

              {/* Clear Filters */}
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setFilterPlan('all')
                  setFilterStatus('all')
                }}
                variant="outline"
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Usuário</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contato</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Plano</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Cadastro</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Último Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.fullName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.whatsapp}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getPlanBadge(user.plan)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(user.isActive)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : 'Nunca'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            title={user.isActive ? "Desativar" : "Ativar"}
                            onClick={() => handleToggleUserStatus(user.id)}
                          >
                            {user.isActive ? (
                              <Ban className="h-4 w-4 text-red-600" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            title="Excluir"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum usuário encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserManagement