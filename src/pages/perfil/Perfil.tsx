import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Lock, Bell, Activity, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function Perfil() {
  const [activeTab, setActiveTab] = useState('perfil');

  // Dados mockados do usuário
  const usuario = {
    nome: 'João Silva',
    email: 'joao.silva@empresa.com',
    perfil: 'Auditor Líder',
    setor: 'Qualidade',
    telefone: '(11) 99999-9999',
    data_cadastro: '2023-01-15',
    ultimo_acesso: '2024-02-01T10:30:00',
    auditorias_realizadas: 25,
    ncs_abertas: 8,
    status: 'ativo'
  };

  const atividades = [
    {
      id: '1',
      tipo: 'auditoria',
      descricao: 'Finalizou auditoria ISO 9001 - Produção',
      data: '2024-02-01T14:30:00'
    },
    {
      id: '2',
      tipo: 'nc',
      descricao: 'Abriu NC-2024-001 - Falta de calibração',
      data: '2024-01-30T09:15:00'
    },
    {
      id: '3',
      tipo: 'checklist',
      descricao: 'Criou checklist ISO 14001 - Meio Ambiente',
      data: '2024-01-28T16:45:00'
    }
  ];

  const handleSalvarPerfil = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleAlterarSenha = () => {
    toast.success('Senha alterada com sucesso!');
  };

  const handleSalvarNotificacoes = () => {
    toast.success('Preferências de notificação salvas!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="atividades" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Atividades
          </TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="perfil" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações básicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" defaultValue={usuario.nome} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={usuario.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue={usuario.telefone} />
                </div>
                <Button onClick={handleSalvarPerfil}>
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações Profissionais</CardTitle>
                <CardDescription>
                  Dados relacionados ao seu trabalho
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Perfil de Acesso</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">
                      <Shield className="mr-1 h-3 w-3" />
                      {usuario.perfil}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Setor</Label>
                  <p className="text-sm">{usuario.setor}</p>
                </div>
                <div className="space-y-2">
                  <Label>Data de Cadastro</Label>
                  <p className="text-sm">
                    {new Date(usuario.data_cadastro).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Último Acesso</Label>
                  <p className="text-sm">
                    {new Date(usuario.ultimo_acesso).toLocaleString('pt-BR')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auditorias Realizadas</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usuario.auditorias_realizadas}</div>
                <p className="text-xs text-muted-foreground">Total de auditorias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NCs Abertas</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usuario.ncs_abertas}</div>
                <p className="text-xs text-muted-foreground">Não conformidades</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Badge variant="default">Ativo</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Status da conta</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Mantenha sua conta segura com uma senha forte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <Input id="senha-atual" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nova-senha">Nova Senha</Label>
                <Input id="nova-senha" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                <Input id="confirmar-senha" type="password" />
              </div>
              <Button onClick={handleAlterarSenha}>
                Alterar Senha
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Configurações adicionais de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sessões Ativas</Label>
                  <p className="text-sm text-muted-foreground">
                    Gerencie suas sessões ativas
                  </p>
                </div>
                <Button variant="outline">Ver Sessões</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auditorias Atribuídas</Label>
                    <p className="text-sm text-muted-foreground">
                      Quando uma auditoria for atribuída a você
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Não Conformidades</Label>
                    <p className="text-sm text-muted-foreground">
                      Quando uma NC for aberta ou atualizada
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Prazos Vencendo</Label>
                    <p className="text-sm text-muted-foreground">
                      Lembretes de prazos próximos ao vencimento
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Relatórios Prontos</Label>
                    <p className="text-sm text-muted-foreground">
                      Quando um relatório estiver pronto para download
                    </p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
              <Button onClick={handleSalvarNotificacoes}>
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Atividades */}
        <TabsContent value="atividades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Suas últimas atividades no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atividades.map((atividade) => (
                  <div key={atividade.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{atividade.descricao}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(atividade.data).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}