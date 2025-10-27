import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Users, Building, FileText, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function Configuracoes() {
  const [activeTab, setActiveTab] = useState('usuarios');

  // Dados mockados
  const usuarios = [
    { id: '1', nome: 'João Silva', email: 'joao@empresa.com', perfil: 'Administrador', status: 'ativo' },
    { id: '2', nome: 'Maria Santos', email: 'maria@empresa.com', perfil: 'Auditor', status: 'ativo' },
    { id: '3', nome: 'Pedro Costa', email: 'pedro@empresa.com', perfil: 'Auditado', status: 'inativo' }
  ];

  const setores = [
    { id: '1', nome: 'Produção', responsavel: 'Ana Silva', usuarios: 15 },
    { id: '2', nome: 'Qualidade', responsavel: 'Carlos Santos', usuarios: 8 },
    { id: '3', nome: 'Recursos Humanos', responsavel: 'Lucia Costa', usuarios: 5 }
  ];

  const normas = [
    { id: '1', nome: 'ISO 9001:2015', versao: '2015', status: 'ativa' },
    { id: '2', nome: 'ISO 14001:2015', versao: '2015', status: 'ativa' },
    { id: '3', nome: 'ISO 45001:2018', versao: '2018', status: 'inativa' }
  ];

  const handleSalvar = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Painel administrativo do sistema</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="setores" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Setores
          </TabsTrigger>
          <TabsTrigger value="normas" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Normas
          </TabsTrigger>
          <TabsTrigger value="sistema" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        {/* Usuários */}
        <TabsContent value="usuarios" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </div>

          <div className="space-y-4">
            {usuarios.map((usuario) => (
              <Card key={usuario.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{usuario.nome}</h3>
                        <Badge variant={usuario.status === 'ativo' ? 'default' : 'secondary'}>
                          {usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{usuario.email}</p>
                      <p className="text-sm">Perfil: {usuario.perfil}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Setores */}
        <TabsContent value="setores" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestão de Setores</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Setor
            </Button>
          </div>

          <div className="space-y-4">
            {setores.map((setor) => (
              <Card key={setor.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{setor.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        Responsável: {setor.responsavel}
                      </p>
                      <p className="text-sm">{setor.usuarios} usuários</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Normas */}
        <TabsContent value="normas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestão de Normas</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Norma
            </Button>
          </div>

          <div className="space-y-4">
            {normas.map((norma) => (
              <Card key={norma.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{norma.nome}</h3>
                        <Badge variant={norma.status === 'ativa' ? 'default' : 'secondary'}>
                          {norma.status === 'ativa' ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Versão: {norma.versao}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sistema */}
        <TabsContent value="sistema" className="space-y-6">
          <h2 className="text-2xl font-bold">Configurações do Sistema</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Configurações básicas do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Nome da Empresa</Label>
                  <Input id="empresa" defaultValue="Empresa Exemplo Ltda" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select defaultValue="america/sao_paulo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america/sao_paulo">América/São Paulo</SelectItem>
                      <SelectItem value="america/new_york">América/Nova York</SelectItem>
                      <SelectItem value="europe/london">Europa/Londres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Configure as notificações do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-servidor">Servidor de Email</Label>
                  <Input id="email-servidor" placeholder="smtp.exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-porta">Porta</Label>
                  <Input id="email-porta" placeholder="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-usuario">Usuário</Label>
                  <Input id="email-usuario" placeholder="sistema@empresa.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Configurações de segurança e acesso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessao-timeout">Timeout de Sessão (minutos)</Label>
                  <Input id="sessao-timeout" defaultValue="30" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tentativas-login">Máximo de Tentativas de Login</Label>
                  <Input id="tentativas-login" defaultValue="3" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha-complexidade">Complexidade de Senha</Label>
                  <Select defaultValue="media">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup</CardTitle>
                <CardDescription>
                  Configurações de backup automático
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequencia">Frequência</Label>
                  <Select defaultValue="diario">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diário</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensal">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-horario">Horário</Label>
                  <Input id="backup-horario" defaultValue="02:00" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-retencao">Retenção (dias)</Label>
                  <Input id="backup-retencao" defaultValue="30" type="number" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSalvar}>
              Salvar Configurações
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}