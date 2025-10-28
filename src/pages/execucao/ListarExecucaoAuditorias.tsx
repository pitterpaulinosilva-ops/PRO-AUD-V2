import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Eye,
  Calendar,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate, getStatusLabel, getPrioridadeLabel } from '@/utils/formatters';
import { STATUS_COLORS, PRIORIDADE_COLORS, PRIORIDADE_OPTIONS } from '@/utils/constants';

// Dados mockados para auditorias disponíveis para execução
const auditoriasDisponiveis = [
  {
    id: '1',
    titulo: 'Auditoria ISO 9001 - Setor Produção',
    tipo: 'interna',
    status: 'planejada',
    data_programada: '2024-02-15',
    auditor_lider: 'João Silva',
    setor: 'Produção',
    checklist: 'ISO 9001:2015 - Produção',
    progresso: 0,
    prioridade: 'alta'
  },
  {
    id: '2',
    titulo: 'Auditoria ISO 14001 - Gestão Ambiental',
    tipo: 'externa',
    status: 'em_andamento',
    data_programada: '2024-01-20',
    auditor_lider: 'Maria Santos',
    setor: 'Qualidade',
    checklist: 'ISO 14001:2015',
    progresso: 65,
    prioridade: 'media'
  },
  {
    id: '4',
    titulo: 'Auditoria ISO 27001 - Segurança da Informação',
    tipo: 'interna',
    status: 'planejada',
    data_programada: '2024-03-01',
    auditor_lider: 'Ana Oliveira',
    setor: 'TI',
    checklist: 'ISO 27001:2013',
    progresso: 0,
    prioridade: 'alta'
  }
];

export function ListarExecucaoAuditorias() {
  const [auditorias] = useState(auditoriasDisponiveis);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [prioridadeFilter, setPrioridadeFilter] = useState<string>('todos');
  const navigate = useNavigate();

  // Filtrar auditorias
  const auditoriasFiltradas = auditorias.filter(auditoria => {
    const matchesSearch = auditoria.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auditoria.auditor_lider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auditoria.setor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || auditoria.status === statusFilter;
    const matchesPrioridade = prioridadeFilter === 'todos' || auditoria.prioridade === prioridadeFilter;
    
    return matchesSearch && matchesStatus && matchesPrioridade;
  });

  const handleExecutarAuditoria = (id: string) => {
    navigate(`/execucao/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executar Auditorias</h1>
          <p className="text-muted-foreground">
            Selecione uma auditoria para iniciar ou continuar a execução
          </p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por título, auditor ou setor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="planejada">Planejada</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
              </SelectContent>
            </Select>

            <Select value={prioridadeFilter} onValueChange={setPrioridadeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                {PRIORIDADE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Aguardando Execução</p>
                <p className="text-2xl font-bold">
                  {auditorias.filter(a => a.status === 'planejada').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">
                  {auditorias.filter(a => a.status === 'em_andamento').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Alta Prioridade</p>
                <p className="text-2xl font-bold">
                  {auditorias.filter(a => a.prioridade === 'alta').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Auditorias */}
      <Card>
        <CardHeader>
          <CardTitle>Auditorias Disponíveis</CardTitle>
          <CardDescription>
            {auditoriasFiltradas.length} auditoria(s) disponível(is) para execução
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Auditoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Data Programada</TableHead>
                  <TableHead>Auditor Líder</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditoriasFiltradas.map((auditoria) => (
                  <TableRow key={auditoria.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{auditoria.titulo}</p>
                        <p className="text-sm text-muted-foreground">{auditoria.setor} • {auditoria.checklist}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={STATUS_COLORS[auditoria.status as keyof typeof STATUS_COLORS]}
                      >
                        {getStatusLabel(auditoria.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={PRIORIDADE_COLORS[auditoria.prioridade as keyof typeof PRIORIDADE_COLORS]}
                      >
                        {getPrioridadeLabel(auditoria.prioridade)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(auditoria.data_programada)}</TableCell>
                    <TableCell>{auditoria.auditor_lider}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${auditoria.progresso}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{auditoria.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="sm"
                          onClick={() => handleExecutarAuditoria(auditoria.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {auditoria.status === 'planejada' ? 'Iniciar' : 'Continuar'}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/auditorias/${auditoria.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}