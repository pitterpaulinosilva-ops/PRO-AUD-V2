import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Eye, Edit2, AlertOctagon, CheckCircle2, Clock } from 'lucide-react';

export function ListarNaoConformidades() {
  const navigate = useNavigate();
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');

  // Dados mockados
  const naoConformidades = [
    {
      id: '1',
      numero: 'NC-2024-001',
      titulo: 'Falta de calibração em equipamento',
      tipo: 'nao_conformidade',
      status: 'aberta',
      criticidade: 'alta',
      auditoria: 'Auditoria ISO 9001 - Produção',
      setor: 'Produção',
      responsavel: 'Maria Santos',
      data_abertura: '2024-01-15',
      prazo: '2024-02-15',
      descricao: 'Equipamento de medição sem certificado de calibração válido'
    },
    {
      id: '2',
      numero: 'PC-2024-001',
      titulo: 'Melhoria no processo de treinamento',
      tipo: 'plano_correcao',
      status: 'em_andamento',
      criticidade: 'media',
      auditoria: 'Auditoria ISO 9001 - RH',
      setor: 'Recursos Humanos',
      responsavel: 'João Silva',
      data_abertura: '2024-01-20',
      prazo: '2024-03-20',
      descricao: 'Implementar sistema de acompanhamento de treinamentos'
    },
    {
      id: '3',
      numero: 'NC-2024-002',
      titulo: 'Documentação desatualizada',
      tipo: 'nao_conformidade',
      status: 'fechada',
      criticidade: 'baixa',
      auditoria: 'Auditoria ISO 9001 - Qualidade',
      setor: 'Qualidade',
      responsavel: 'Ana Costa',
      data_abertura: '2024-01-10',
      prazo: '2024-02-10',
      descricao: 'Procedimentos operacionais com versões desatualizadas'
    }
  ];

  const estatisticas = {
    total: naoConformidades.length,
    abertas: naoConformidades.filter(nc => nc.status === 'aberta').length,
    em_andamento: naoConformidades.filter(nc => nc.status === 'em_andamento').length,
    fechadas: naoConformidades.filter(nc => nc.status === 'fechada').length,
    vencidas: naoConformidades.filter(nc => 
      nc.status !== 'fechada' && new Date(nc.prazo) < new Date()
    ).length
  };

  const naoConformidadesFiltradas = naoConformidades.filter(nc => {
    const matchTexto = nc.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                      nc.numero.toLowerCase().includes(filtroTexto.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || nc.status === filtroStatus;
    const matchTipo = filtroTipo === 'todos' || nc.tipo === filtroTipo;
    
    return matchTexto && matchStatus && matchTipo;
  });



  const getTipoBadge = (tipo: string) => {
    return tipo === 'nao_conformidade' 
      ? { className: 'bg-red-100 text-red-800', label: 'NC' }
      : { className: 'bg-blue-100 text-blue-800', label: 'PC' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Não Conformidades</h1>
          <p className="text-muted-foreground">Gestão de NCs e Planos de Correção</p>
        </div>
        <Button onClick={() => navigate('/nao-conformidades/nova')} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
          Nova NC/PC
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <AlertOctagon className="h-4 w-4 text-muted-foreground transition-all duration-200 ease-in-out hover:scale-105" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abertas</CardTitle>
            <AlertOctagon className="h-4 w-4 text-red-500 transition-all duration-200 ease-in-out hover:scale-105" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{estatisticas.abertas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-500 transition-all duration-200 ease-in-out hover:scale-105" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estatisticas.em_andamento}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fechadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500 transition-all duration-200 ease-in-out hover:scale-105" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estatisticas.fechadas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertOctagon className="h-4 w-4 text-orange-500 transition-all duration-200 ease-in-out hover:scale-105" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estatisticas.vencidas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground transition-all duration-200 ease-in-out" />
                <Input
                  placeholder="Buscar por título ou número..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="aberta">Aberta</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="fechada">Fechada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="nao_conformidade">Não Conformidade</SelectItem>
                <SelectItem value="plano_correcao">Plano de Correção</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Não Conformidades */}
      <div className="space-y-4">
        {naoConformidadesFiltradas.map((nc) => {
          const tipoBadge = getTipoBadge(nc.tipo);
          const isVencida = nc.status !== 'fechada' && new Date(nc.prazo) < new Date();

          return (
            <Card key={nc.id} className={isVencida ? 'border-red-200 bg-red-50' : ''}>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{nc.numero}</CardTitle>
                      <Badge className={tipoBadge.className}>
                        {tipoBadge.label}
                      </Badge>
                      <Badge
                        variant={
                          nc.status === 'Resolvida'
                            ? 'default'
                            : nc.status === 'Em Análise'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {nc.status}
                      </Badge>
                      <Badge
                          variant={
                            nc.criticidade === 'Alta'
                              ? 'destructive'
                              : nc.criticidade === 'Média'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {nc.criticidade}
                        </Badge>
                      {isVencida && (
                        <Badge variant="destructive">
                          Vencida
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base font-medium">
                      {nc.titulo}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">{nc.descricao}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/nao-conformidades/${nc.id}`)} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <Eye className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/nao-conformidades/${nc.id}/editar`)} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <Edit2 className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                      Editar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Auditoria</label>
                    <p className="text-sm">{nc.auditoria}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Setor</label>
                    <p className="text-sm">{nc.setor}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Responsável</label>
                    <p className="text-sm">{nc.responsavel}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Prazo</label>
                    <p className={`text-sm ${isVencida ? 'text-red-600 font-medium' : ''}`}>
                      {new Date(nc.prazo).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {naoConformidadesFiltradas.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertOctagon className="h-12 w-12 text-muted-foreground mb-4 transition-all duration-200 ease-in-out hover:scale-105" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma não conformidade encontrada</h3>
            <p className="text-muted-foreground text-center">
              Não há não conformidades que correspondam aos filtros selecionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}