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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  CalendarDays,
  Users,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Auditoria, Setor } from '@/types';

// Dados mockados
// Tipo estendido para o mock com propriedades adicionais para a UI
interface AuditoriaMock extends Auditoria {
  titulo: string;
  data_inicio: string;
  data_fim: string;
  auditor_lider: string;
  setor: Setor;
  norma: string;
  progresso: number;
}

// Setores mockados
const setoresMock: Setor[] = [
  {
    id: '1',
    nome: 'Produção',
    codigo: 'PROD',
    descricao: 'Setor de produção industrial',
    setor_pai_id: undefined,
    setor_pai: undefined,
    subsetores: [],
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    nome: 'Qualidade',
    codigo: 'QUAL',
    descricao: 'Setor de controle de qualidade',
    setor_pai_id: undefined,
    setor_pai: undefined,
    subsetores: [],
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    nome: 'RH',
    codigo: 'RH',
    descricao: 'Recursos Humanos',
    setor_pai_id: undefined,
    setor_pai: undefined,
    subsetores: [],
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    nome: 'TI',
    codigo: 'TI',
    descricao: 'Tecnologia da Informação',
    setor_pai_id: undefined,
    setor_pai: undefined,
    subsetores: [],
    created_at: '2024-01-01T00:00:00Z'
  }
];

const auditoriasMock: AuditoriaMock[] = [
  {
    id: '1',
    nome: 'Auditoria ISO 9001 - Setor Produção',
    codigo: 'AUD-001',
    titulo: 'Auditoria ISO 9001 - Setor Produção',
    tipo: 'interna',
    status: 'planejada',
    escopo: 'Processos de produção e controle de qualidade',
    objetivos: 'Verificar conformidade com ISO 9001:2015',
    data_programada: '2024-02-15',
    data_inicio: '2024-02-15',
    data_fim: '2024-02-16',
    auditor_id: '1',
    auditor_lider: 'João Silva',
    setor_id: '1',
    setor: setoresMock[0],
    checklist_id: '1',
    norma: 'ISO 9001:2015',
    progresso: 0,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    nome: 'Auditoria ISO 14001 - Gestão Ambiental',
    codigo: 'AUD-002',
    titulo: 'Auditoria ISO 14001 - Gestão Ambiental',
    tipo: 'externa',
    status: 'em_andamento',
    escopo: 'Sistema de gestão ambiental',
    objetivos: 'Verificar conformidade com ISO 14001:2015',
    data_programada: '2024-01-20',
    data_inicio: '2024-01-20',
    data_fim: '2024-01-22',
    auditor_id: '2',
    auditor_lider: 'Maria Santos',
    setor_id: '2',
    setor: setoresMock[1],
    checklist_id: '2',
    norma: 'ISO 14001:2015',
    progresso: 65,
    created_at: '2024-01-05T14:30:00Z',
    updated_at: '2024-01-20T09:15:00Z'
  },
  {
    id: '3',
    nome: 'Auditoria ISO 45001 - Segurança do Trabalho',
    codigo: 'AUD-003',
    titulo: 'Auditoria ISO 45001 - Segurança do Trabalho',
    tipo: 'interna',
    status: 'concluida',
    escopo: 'Sistema de gestão de saúde e segurança ocupacional',
    objetivos: 'Verificar conformidade com ISO 45001:2018',
    data_programada: '2024-01-10',
    data_inicio: '2024-01-10',
    data_fim: '2024-01-12',
    auditor_id: '3',
    auditor_lider: 'Pedro Costa',
    setor_id: '3',
    setor: setoresMock[2],
    checklist_id: '3',
    norma: 'ISO 45001:2018',
    progresso: 100,
    created_at: '2023-12-20T16:45:00Z',
    updated_at: '2024-01-12T17:30:00Z'
  },
  {
    id: '4',
    nome: 'Auditoria ISO 27001 - Segurança da Informação',
    codigo: 'AUD-004',
    titulo: 'Auditoria ISO 27001 - Segurança da Informação',
    tipo: 'interna',
    status: 'planejada',
    escopo: 'Sistema de gestão de segurança da informação',
    objetivos: 'Verificar conformidade com ISO 27001:2013',
    data_programada: '2024-03-01',
    data_inicio: '2024-03-01',
    data_fim: '2024-03-03',
    auditor_id: '4',
    auditor_lider: 'Ana Oliveira',
    setor_id: '4',
    setor: setoresMock[3],
    checklist_id: '4',
    norma: 'ISO 27001:2013',
    progresso: 0,
    created_at: '2024-01-15T11:20:00Z',
    updated_at: '2024-01-15T11:20:00Z'
  }
];



const tipoColors = {
  interna: 'bg-gray-100 text-gray-800',
  externa: 'bg-purple-100 text-purple-800',
  certificacao: 'bg-orange-100 text-orange-800',
  fornecedor: 'bg-indigo-100 text-indigo-800'
};

export function ListarAuditorias() {
  const [auditorias, setAuditorias] = useState<AuditoriaMock[]>(auditoriasMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [tipoFilter, setTipoFilter] = useState<string>('todos');
  const navigate = useNavigate();

  // Filtrar auditorias
  const auditoriasFiltradas = auditorias.filter(auditoria => {
    const matchesSearch = auditoria.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auditoria.auditor_lider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auditoria.setor.nome.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || auditoria.status === statusFilter;
    const matchesTipo = tipoFilter === 'todos' || auditoria.tipo === tipoFilter;
    
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const handleDelete = (id: string) => {
    setAuditorias(prev => prev.filter(auditoria => auditoria.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      planejada: 'Planejada',
      em_andamento: 'Em Andamento',
      concluida: 'Concluída',
      cancelada: 'Cancelada'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getTipoLabel = (tipo: string) => {
    const labels = {
      interna: 'Interna',
      externa: 'Externa',
      certificacao: 'Certificação',
      fornecedor: 'Fornecedor'
    };
    return labels[tipo as keyof typeof labels] || tipo;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Auditorias</h1>
          <p className="text-muted-foreground">
            Gerencie todas as auditorias do sistema
          </p>
        </div>
        <Button onClick={() => navigate('/auditorias/nova')} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
          Nova Auditoria
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 transition-all duration-200 ease-in-out hover:scale-105" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 transition-all duration-200 ease-in-out" />
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
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="interna">Interna</SelectItem>
                <SelectItem value="externa">Externa</SelectItem>
                <SelectItem value="certificacao">Certificação</SelectItem>
                <SelectItem value="fornecedor">Fornecedor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 transition-all duration-200 ease-in-out hover:scale-105" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{auditorias.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 text-yellow-600 transition-all duration-200 ease-in-out hover:scale-105" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">
                  {auditorias.filter(a => a.status === 'em_andamento').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 transition-all duration-200 ease-in-out hover:scale-105" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold">
                  {auditorias.filter(a => a.status === 'concluida').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 text-blue-600 transition-all duration-200 ease-in-out hover:scale-105" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Planejadas</p>
                <p className="text-2xl font-bold">
                  {auditorias.filter(a => a.status === 'planejada').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Auditorias */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Auditorias</CardTitle>
          <CardDescription>
            {auditoriasFiltradas.length} auditoria(s) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Auditor Líder</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Período</TableHead>
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
                        <p className="text-sm text-muted-foreground">{auditoria.norma}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={tipoColors[auditoria.tipo as keyof typeof tipoColors]}
                      >
                        {getTipoLabel(auditoria.tipo)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          auditoria.status === 'concluida'
                            ? 'default'
                            : auditoria.status === 'em_andamento'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {getStatusLabel(auditoria.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{auditoria.auditor_lider}</TableCell>
                    <TableCell>{auditoria.setor.nome}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{formatDate(auditoria.data_inicio)}</p>
                        <p className="text-muted-foreground">até {formatDate(auditoria.data_fim)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${auditoria.progresso}%` }}
                          />
                        </div>
                        <span className="text-sm">{auditoria.progresso}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/auditorias/${auditoria.id}`)}
                          className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          <Eye className="h-4 w-4 transition-all duration-200 ease-in-out" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                              <MoreHorizontal className="h-4 w-4 transition-all duration-200 ease-in-out" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/auditorias/${auditoria.id}/editar`)}>
                              <Edit2 className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                              Editar
                            </DropdownMenuItem>
                            {auditoria.status === 'planejada' && (
                              <DropdownMenuItem onClick={() => navigate(`/execucao/${auditoria.id}`)}>
                                <CalendarDays className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                                Executar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleDelete(auditoria.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                              Excluir
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

          {auditoriasFiltradas.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 transition-all duration-200 ease-in-out hover:scale-105" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhuma auditoria encontrada
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros ou criar uma nova auditoria.
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate('/auditorias/nova')} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Plus className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                  Nova Auditoria
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}