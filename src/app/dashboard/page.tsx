'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Crown, 
  BookOpen, 
  Calculator, 
  Users, 
  MessageCircle,
  TrendingUp,
  Calendar,
  Award,
  Settings,
  LogOut,
  ArrowRight,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  // TEMPORARIAMENTE DESABILITADO - Permitir acesso sem autenticação
  /*
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }
  */

  const getPlanInfo = (plan: string) => {
    switch (plan) {
      case 'teste':
        return {
          name: 'Plano Teste',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-4 w-4" />,
          description: 'Acesso básico gratuito'
        };
      case 'guideflow':
        return {
          name: 'GuideFlow',
          color: 'bg-purple-100 text-purple-800',
          icon: <BookOpen className="h-4 w-4" />,
          description: 'Acesso completo aos fluxogramas'
        };
      case 'mindflow':
        return {
          name: 'MindFlow',
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Crown className="h-4 w-4" />,
          description: 'Acesso premium com comunidade exclusiva'
        };
      default:
        return {
          name: 'Plano Desconhecido',
          color: 'bg-gray-100 text-gray-800',
          icon: <User className="h-4 w-4" />,
          description: 'Plano não identificado'
        };
    }
  };

  const planInfo = getPlanInfo(user?.plan || 'admin');

  const getAvailableFeatures = (plan: string) => {
    const baseFeatures = [
      { name: 'Colecistite Tokyo 2018', type: 'guideline', available: true },
      { name: 'Escore de Alvarado', type: 'calculator', available: true },
      { name: 'Critérios de Tóquio', type: 'calculator', available: true }
    ];

    const guideflowFeatures = [
      { name: 'Todos os Guidelines', type: 'guideline', available: plan !== 'teste' },
      { name: 'Calculadoras Avançadas', type: 'calculator', available: plan !== 'teste' },
      { name: 'Casos Clínicos Premium', type: 'cases', available: plan !== 'teste' }
    ];

    const mindflowFeatures = [
      { name: 'Grupo VIP WhatsApp', type: 'community', available: plan === 'mindflow' },
      { name: 'Suporte à Pesquisa', type: 'research', available: plan === 'mindflow' }
    ];

    return [...baseFeatures, ...guideflowFeatures, ...mindflowFeatures];
  };

  const features = getAvailableFeatures(user?.plan || 'admin');

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Olá, {user?.fullName?.split(' ')[0] || 'Usuário'}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Bem-vindo ao seu painel do SurgFlow
                </p>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Plan Status Card */}
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {planInfo.icon}
                    Seu Plano Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge className={planInfo.color}>
                        {planInfo.name}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">
                        {planInfo.description}
                      </p>
                    </div>
                    {user?.plan === 'teste' && (
                      <Link href="/planos">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Fazer Upgrade
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  {user?.plan === 'teste' && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">
                        🚀 Desbloqueie todo o potencial do SurgFlow
                      </h4>
                      <p className="text-purple-800 text-sm mb-3">
                        Upgrade para GuideFlow ou MindFlow e tenha acesso a todos os recursos premium.
                      </p>
                      <Link href="/planos">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Ver Planos
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Acesso Rápido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/guideline/cholecystitis-tokyo-2018">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Colecistite</span>
                          <Badge variant="secondary" className="text-xs">GRATUITO</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Tokyo Guidelines 2018
                        </p>
                      </div>
                    </Link>

                    <Link href="/calculadoras">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <Calculator className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Calculadoras</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Ferramentas de cálculo médico
                        </p>
                      </div>
                    </Link>

                    <Link href="/casos-clinicos">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <Users className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Casos Clínicos</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Discussões de casos reais
                        </p>
                      </div>
                    </Link>

                    {user?.plan === 'mindflow' && (
                      <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                        <div className="flex items-center gap-3 mb-2">
                          <MessageCircle className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium">Grupo VIP</span>
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">EXCLUSIVO</Badge>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Acesso ao WhatsApp exclusivo
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Conta criada com sucesso</p>
                        <p className="text-xs text-gray-500">Bem-vindo ao SurgFlow!</p>
                      </div>
                      <span className="text-xs text-gray-400">Agora</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nome</label>
                    <p className="text-sm">{user?.fullName || 'Usuário'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm">{user?.email || 'email@exemplo.com'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">WhatsApp</label>
                    <p className="text-sm">{user?.whatsapp || 'Não informado'}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </CardContent>
              </Card>

              {/* Features Access */}
              <Card>
                <CardHeader>
                  <CardTitle>Recursos Disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{feature.name}</span>
                        {feature.available ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {user?.plan === 'teste' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link href="/planos">
                        <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                          <Star className="h-4 w-4 mr-2" />
                          Desbloquear Todos
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Guidelines acessados</span>
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Calculadoras usadas</span>
                    <span className="text-sm font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Casos estudados</span>
                    <span className="text-sm font-medium">0</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}