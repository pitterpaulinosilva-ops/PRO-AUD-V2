import { useState, useEffect } from 'react';
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
import { carregarChecklists, deletarChecklist, salvarChecklist, normas, inicializarDadosLocais } from '@/data/mockData';

export function ListarChecklists() {
  const [checklists, setChecklists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState<string>('todas');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const navigate = useNavigate();

  // Carregar checklists ao montar o componente
  useEffect(() => {
    inicializarDadosLocais();
    const checklistsCarregados = carregarChecklists();
    setChecklists(checklistsCarregados);
  }, []);

  // Filtrar checklists
  const checklistsFiltrados = checklists.filter(checklist => {
    const normaInfo = normas.find(n => n.id === checklist.norma_id);
    const nomeNorma = normaInfo ? normaInfo.nome : '';
    
    const matchesSearch = checklist.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nomeNorma.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = categoriaFilter === 'todas' || checklist.categoria === categoriaFilter;
    const matchesStatus = statusFilter === 'todos' || 
                         (statusFilter === 'ativo' && checklist.ativo) ||
                         (statusFilter === 'inativo' && !checklist.ativo);
    
    return matchesSearch && matchesCategoria && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este checklist?')) {
      deletarChecklist(id);
      setChecklists(prev => prev.filter(checklist => checklist.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    const checklist = checklists.find(c => c.id === id);
    if (checklist) {
      const checklistAtualizado = { ...checklist, ativo: !checklist.ativo };
      salvarChecklist(checklistAtualizado);
      setChecklists(prev => 
        prev.map(c => c.id === id ? checklistAtualizado : c)
      );
    }
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
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categorias.map((categoria, index) => (
                  <SelectItem key={`categoria-${index}`} value={categoria}>
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
              <FileText className="h-8 w-8 text-gray-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Inativos</p>
                <p className="text-2xl font-bold">
                  {checklists.filter(c => !c.ativo).length}
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
                  <TableHead>Última Atualização</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checklistsFiltrados.map((checklist) => (
                  <TableRow key={checklist.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{checklist.nome}</p>
                        <p className="text-sm text-muted-foreground">{checklist.descricao}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {normas.find(n => n.id === checklist.norma_id)?.nome || 'N/A'}
                    </TableCell>
                    <TableCell>{checklist.categoria}</TableCell>
                    <TableCell>
                      <Badge variant="outline">v{checklist.versao}</Badge>
                    </TableCell>
                    <TableCell>{checklist.perguntas?.length || 0}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={checklist.ativo ? "default" : "secondary"}
                      >
                        {checklist.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(checklist.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/checklists/${checklist.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
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