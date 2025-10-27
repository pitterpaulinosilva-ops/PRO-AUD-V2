import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export function Relatorios() {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroPeriodo, setFiltroPeriodo] = useState('ultimo_mes');

  // Dados mockados de relatórios disponíveis
  const relatorios = [
    {
      id: '1',
      nome: 'Relatório de Auditorias',
      descricao: 'Relatório completo das auditorias realizadas no período',
      tipo: 'auditoria',
      icone: FileText,
      formato: ['PDF', 'Excel'],
      parametros: ['período', 'setor', 'auditor']
    },
    {
      id: '2',
      nome: 'Dashboard Executivo',
      descricao: 'Visão executiva com KPIs e indicadores principais',
      tipo: 'dashboard',
      icone: BarChart3,
      formato: ['PDF'],
      parametros: ['período']
    },
    {
      id: '3',
      nome: 'Não Conformidades',
      descricao: 'Relatório detalhado de NCs e Planos de Correção',
      tipo: 'nao_conformidade',
      icone: PieChart,
      formato: ['PDF', 'Excel'],
      parametros: ['período', 'status', 'criticidade']
    },
    {
      id: '4',
      nome: 'Desempenho por Setor',
      descricao: 'Análise de desempenho e conformidade por setor',
      tipo: 'desempenho',
      icone: TrendingUp,
      formato: ['PDF', 'Excel'],
      parametros: ['período', 'setor']
    },
    {
      id: '5',
      nome: 'Eficácia de Auditores',
      descricao: 'Relatório de desempenho e eficácia dos auditores',
      tipo: 'auditor',
      icone: FileText,
      formato: ['PDF', 'Excel'],
      parametros: ['período', 'auditor']
    },
    {
      id: '6',
      nome: 'Tendências de Conformidade',
      descricao: 'Análise de tendências e evolução da conformidade',
      tipo: 'tendencia',
      icone: TrendingUp,
      formato: ['PDF'],
      parametros: ['período']
    }
  ];

  const relatoriosGerados = [
    {
      id: '1',
      nome: 'Relatório de Auditorias - Janeiro 2024',
      tipo: 'auditoria',
      data_geracao: '2024-02-01',
      formato: 'PDF',
      tamanho: '2.5 MB',
      status: 'concluido'
    },
    {
      id: '2',
      nome: 'Dashboard Executivo - Q4 2023',
      tipo: 'dashboard',
      data_geracao: '2024-01-15',
      formato: 'PDF',
      tamanho: '1.8 MB',
      status: 'concluido'
    },
    {
      id: '3',
      nome: 'Não Conformidades - Dezembro 2023',
      tipo: 'nao_conformidade',
      data_geracao: '2024-01-05',
      formato: 'Excel',
      tamanho: '856 KB',
      status: 'processando'
    }
  ];

  const relatoriosFiltrados = relatorios.filter(relatorio => {
    return filtroTipo === 'todos' || relatorio.tipo === filtroTipo;
  });

  const handleGerarRelatorio = () => {
    toast.success('Relatório adicionado à fila de geração!');
  };

  const handleDownload = () => {
    toast.success('Download iniciado!');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      concluido: { variant: 'default' as const, label: 'Concluído' },
      processando: { variant: 'secondary' as const, label: 'Processando' },
      erro: { variant: 'destructive' as const, label: 'Erro' }
    };
    
    return variants[status as keyof typeof variants] || variants.concluido;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Geração e download de relatórios do sistema</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Label htmlFor="tipo">Tipo de Relatório</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="auditoria">Auditorias</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="nao_conformidade">Não Conformidades</SelectItem>
                  <SelectItem value="desempenho">Desempenho</SelectItem>
                  <SelectItem value="auditor">Auditores</SelectItem>
                  <SelectItem value="tendencia">Tendências</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="periodo">Período Padrão</Label>
              <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultima_semana">Última Semana</SelectItem>
                  <SelectItem value="ultimo_mes">Último Mês</SelectItem>
                  <SelectItem value="ultimo_trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="ultimo_ano">Último Ano</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Disponíveis */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Relatórios Disponíveis</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatoriosFiltrados.map((relatorio) => {
            const IconeRelatorio = relatorio.icone;
            
            return (
              <Card key={relatorio.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconeRelatorio className="h-6 w-6 text-blue-600 transition-all duration-200 ease-in-out hover:scale-105" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                      <CardDescription className="text-sm">
                        {relatorio.descricao}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Formatos Disponíveis
                      </Label>
                      <div className="flex gap-1 mt-1">
                        {relatorio.formato.map((formato) => (
                          <Badge key={formato} variant="outline" className="text-xs">
                            {formato}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Parâmetros
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {relatorio.parametros.map((parametro) => (
                          <Badge key={parametro} variant="secondary" className="text-xs">
                            {parametro}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                      onClick={() => handleGerarRelatorio()}
                    >
                      <FileText className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                      Gerar Relatório
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Relatórios Gerados */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Relatórios Gerados</h2>
        <div className="space-y-4">
          {relatoriosGerados.map((relatorio) => {
            const statusBadge = getStatusBadge(relatorio.status);
            
            return (
              <Card key={relatorio.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{relatorio.nome}</h3>
                        <Badge variant={statusBadge.variant}>
                          {statusBadge.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Formato: {relatorio.formato}</span>
                        <span>Tamanho: {relatorio.tamanho}</span>
                        <span>
                          Gerado em: {new Date(relatorio.data_geracao).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {relatorio.status === 'concluido' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload()}
                          className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <Download className="h-4 w-4 transition-all duration-200 ease-in-out" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {relatoriosGerados.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4 transition-all duration-200 ease-in-out hover:scale-105" />
            <h3 className="text-lg font-semibold mb-2">Nenhum relatório gerado</h3>
            <p className="text-muted-foreground text-center">
              Gere seu primeiro relatório selecionando uma das opções acima.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}