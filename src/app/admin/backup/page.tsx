'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  Upload, 
  Database, 
  Settings, 
  Shield, 
  Clock, 
  Server, 
  Mail,
  MessageSquare,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

interface BackupInfo {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'full' | 'partial' | 'users' | 'content';
  status: 'completed' | 'failed' | 'in_progress';
}

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  whatsappIntegration: boolean;
  maxUsersPerPlan: {
    teste: number;
    basico: number;
    premium: number;
    admin: number;
  };
  sessionTimeout: number;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  autoBackup: boolean;
}

export default function BackupAndSettings() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [backups, setBackups] = useState<BackupInfo[]>([]);
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'SurgFlow',
    siteDescription: 'Plataforma de gestão cirúrgica',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    whatsappIntegration: true,
    maxUsersPerPlan: {
      teste: 100,
      basico: 1000,
      premium: 5000,
      admin: -1
    },
    sessionTimeout: 24,
    backupFrequency: 'daily',
    autoBackup: true
  });
  const [backupProgress, setBackupProgress] = useState(0);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  useEffect(() => {
    // Verificar se o usuário tem permissão de acesso
    if (!user || (user.role !== 'super_admin' && user.plan !== 'admin')) {
      router.push('/dashboard');
      return;
    }

    // Simular carregamento de dados
    setTimeout(() => {
      setBackups([
        {
          id: '1',
          name: 'Backup Completo - Janeiro 2024',
          size: '2.3 GB',
          date: '2024-01-15 03:00:00',
          type: 'full',
          status: 'completed'
        },
        {
          id: '2',
          name: 'Backup Usuários - Janeiro 2024',
          size: '45 MB',
          date: '2024-01-14 02:00:00',
          type: 'users',
          status: 'completed'
        },
        {
          id: '3',
          name: 'Backup Conteúdo - Janeiro 2024',
          size: '1.8 GB',
          date: '2024-01-13 01:30:00',
          type: 'content',
          status: 'failed'
        },
        {
          id: '4',
          name: 'Backup Parcial - Janeiro 2024',
          size: '890 MB',
          date: '2024-01-12 04:00:00',
          type: 'partial',
          status: 'completed'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [user, router]);

  const handleCreateBackup = async (type: 'full' | 'partial' | 'users' | 'content') => {
    setIsCreatingBackup(true);
    setBackupProgress(0);

    // Simular progresso do backup
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreatingBackup(false);
          
          // Adicionar novo backup à lista
          const newBackup: BackupInfo = {
            id: Date.now().toString(),
            name: `Backup ${type === 'full' ? 'Completo' : type === 'users' ? 'Usuários' : type === 'content' ? 'Conteúdo' : 'Parcial'} - ${new Date().toLocaleDateString()}`,
            size: type === 'full' ? '2.5 GB' : type === 'users' ? '50 MB' : type === 'content' ? '1.9 GB' : '950 MB',
            date: new Date().toLocaleString(),
            type,
            status: 'completed'
          };
          
          setBackups(prev => [newBackup, ...prev]);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleSaveSettings = () => {
    // Simular salvamento das configurações
    alert('Configurações salvas com sucesso!');
  };

  const getBackupTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-blue-500';
      case 'users': return 'bg-green-500';
      case 'content': return 'bg-purple-500';
      case 'partial': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backup e Configurações</h1>
          <p className="text-gray-600 mt-2">Gerencie backups do sistema e configurações avançadas</p>
        </div>
      </div>

      <Tabs defaultValue="backup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="backup" className="space-y-6">
          {/* Criar Backup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Criar Novo Backup
              </CardTitle>
              <CardDescription>
                Crie backups do sistema para garantir a segurança dos dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCreatingBackup ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Criando backup... {backupProgress}%</span>
                  </div>
                  <Progress value={backupProgress} className="w-full" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => handleCreateBackup('full')}
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Database className="h-6 w-6" />
                    Backup Completo
                  </Button>
                  <Button 
                    onClick={() => handleCreateBackup('users')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Users className="h-6 w-6" />
                    Backup Usuários
                  </Button>
                  <Button 
                    onClick={() => handleCreateBackup('content')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <FileText className="h-6 w-6" />
                    Backup Conteúdo
                  </Button>
                  <Button 
                    onClick={() => handleCreateBackup('partial')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Server className="h-6 w-6" />
                    Backup Parcial
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lista de Backups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Backups Disponíveis
              </CardTitle>
              <CardDescription>
                Histórico de backups criados e seus status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(backup.status)}
                        <Badge className={getBackupTypeColor(backup.type)}>
                          {backup.type === 'full' ? 'Completo' : 
                           backup.type === 'users' ? 'Usuários' : 
                           backup.type === 'content' ? 'Conteúdo' : 'Parcial'}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-medium">{backup.name}</h3>
                        <p className="text-sm text-gray-500">
                          {backup.size} • {backup.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {backup.status === 'completed' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            Restaurar
                          </Button>
                        </>
                      )}
                      {backup.status === 'failed' && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Tentar Novamente
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Configurações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configurações básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (horas)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Manutenção</Label>
                    <p className="text-sm text-gray-500">Ativar modo de manutenção do site</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Registro Habilitado</Label>
                    <p className="text-sm text-gray-500">Permitir novos registros</p>
                  </div>
                  <Switch
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, registrationEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-gray-500">Enviar notificações automáticas</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Integração WhatsApp</Label>
                    <p className="text-sm text-gray-500">Habilitar funcionalidades WhatsApp</p>
                  </div>
                  <Switch
                    checked={settings.whatsappIntegration}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, whatsappIntegration: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Backup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Configurações de Backup
              </CardTitle>
              <CardDescription>
                Configure backups automáticos do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-gray-500">Criar backups automaticamente</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoBackup: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Frequência do Backup</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                    setSettings(prev => ({ ...prev, backupFrequency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Limites por Plano */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Limites por Plano
              </CardTitle>
              <CardDescription>
                Configure limites máximos de usuários por plano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testePlan">Plano Teste</Label>
                  <Input
                    id="testePlan"
                    type="number"
                    value={settings.maxUsersPerPlan.teste}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      maxUsersPerPlan: { ...prev.maxUsersPerPlan, teste: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basicoPlan">Plano Básico</Label>
                  <Input
                    id="basicoPlan"
                    type="number"
                    value={settings.maxUsersPerPlan.basico}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      maxUsersPerPlan: { ...prev.maxUsersPerPlan, basico: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premiumPlan">Plano Premium</Label>
                  <Input
                    id="premiumPlan"
                    type="number"
                    value={settings.maxUsersPerPlan.premium}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      maxUsersPerPlan: { ...prev.maxUsersPerPlan, premium: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPlan">Plano Admin</Label>
                  <Input
                    id="adminPlan"
                    type="number"
                    value={settings.maxUsersPerPlan.admin === -1 ? '' : settings.maxUsersPerPlan.admin}
                    placeholder="Ilimitado"
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      maxUsersPerPlan: { ...prev.maxUsersPerPlan, admin: e.target.value === '' ? -1 : parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="px-8">
              Salvar Configurações
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}