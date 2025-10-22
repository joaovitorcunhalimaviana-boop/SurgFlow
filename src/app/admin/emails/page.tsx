'use client'

import React from 'react'
import EmailConfirmationDemo from '@/components/emails/EmailConfirmationDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, Mail, Shield } from 'lucide-react'

export default function AdminEmailsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Administração</h1>
                <p className="text-gray-600">Gerenciamento de emails transacionais</p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Admin Only
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            <a 
              href="#" 
              className="flex items-center gap-2 px-1 py-4 border-b-2 border-purple-500 text-purple-600 font-medium"
            >
              <Mail className="w-4 h-4" />
              Templates de Email
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 px-1 py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            >
              Configurações
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 px-1 py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            >
              Logs de Envio
            </a>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Templates Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">5</div>
              <p className="text-xs text-gray-500">Todos funcionais</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Emails Enviados (Hoje)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500">Modo desenvolvimento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Taxa de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-xs text-gray-500">Últimos 30 dias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Status do Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600">Operacional</span>
              </div>
              <p className="text-xs text-gray-500">Todos os sistemas OK</p>
            </CardContent>
          </Card>
        </div>

        <EmailConfirmationDemo />
      </div>
    </div>
  )
}