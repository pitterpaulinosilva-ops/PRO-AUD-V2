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
  Edit,
  Trash2,
  FileText,
  CheckSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dados mockados
const checklistsMock = [
  {
    id: '1',
    nome: 'Checklist ISO 9001 - Processos Gerais',
    descricao: 'Checklist para auditoria de processos gerais conforme ISO 9001:2015',
    norma: 'ISO 9001:2015',
    categoria: 'Gestão de Processos',
    versao: '2.1',
    total_perguntas: 25,
    ativo: true,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    nome: 'Checklist ISO 14001 - Aspectos Ambientais',
    descricao: 'Checklist para avaliação de aspectos e impactos ambientais',
    norma: 'ISO 14001:2015',
    categoria: 'Meio Ambiente',
    versao: '1.5',
    total_perguntas: 18,
    ativo: true,
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-12T16:45:00Z'
  },
  {
    id: '3',
    nome: 'Checklist ISO 45001 - Segurança do Trabalho',
    descricao: 'Checklist para auditoria de saúde e segurança ocupacional',
    norma: 'ISO 45001:2018',
    categoria: 'Segurança',
    versao: '3.0',
    total_perguntas: 32,
    ativo: false,
    created_at: '2023-12-20T11:30:00Z',
    updated_at: '2024-01-08T13:20:00Z'
  }
];

export function ListarChecklists() {
  const [checklists, setChecklists] = useState(checklistsMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState<string>('todas');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const navigate = useNavigate();

  // Filtrar checklists
  const checklistsFiltrados = checklists.filter(checklist => {
    const matchesSearch = checklist.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.norma.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = categoriaFilter === 'todas' || checklist.categoria === categoriaFilter;
    const matchesStatus = statusFilter === 'todos' || 
                         (statusFilter === 'ativo' && checklist.ativo) ||
                         (statusFilter === 'inativo' && !checklist.ativo);
    
    return matchesSearch && matchesCategoria && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setChecklists(prev => prev.filter(checklist => checklist.id !== id));
  };

  const toggleStatus = (id: string) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === id 
        ? { ...checklist, ativo: !checklist.ativo }
        : checklist
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const categorias = ['Gestão de Processos', 'Meio Ambiente', 'Segurança', 'Qualidade', 'TI'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Checklists</h1>
          <p className="text-muted-foreground">
            Gerencie os checklists de auditoria
          </p>
        </div>
        <Button onClick={() => navigate('/checklists/novo')}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Checklist
        </Button>
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
                  placeholder="Buscar por nome, norma ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Categorias</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{checklists.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold">
                  {checklists.filter(c => c.ativo).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total de Perguntas</p>
                <p className="text-2xl font-bold">
                  {checklists.reduce((acc, c) => acc + c.total_perguntas, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Checklists */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Checklists</CardTitle>
          <CardDescription>
            {checklistsFiltrados.length} checklist(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Norma</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Perguntas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Atualizado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checklistsFiltrados.map((checklist) => (
                  <TableRow key={checklist.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{checklist.nome}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {checklist.descricao}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {checklist.norma}
                      </Badge>
                    </TableCell>
                    <TableCell>{checklist.categoria}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        v{checklist.versao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        {checklist.total_perguntas}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          checklist.ativo
                            ? 'default'
                            : 'outline'
                        }
                      >
                        {checklist.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(checklist.updated_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/checklists/${checklist.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/checklists/${checklist.id}/editar`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleStatus(checklist.id)}>
                              <CheckSquare className="mr-2 h-4 w-4" />
                              {checklist.ativo ? 'Desativar' : 'Ativar'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(checklist.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
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

          {checklistsFiltrados.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum checklist encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros ou criar um novo checklist.
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate('/checklists/novo')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Checklist
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}