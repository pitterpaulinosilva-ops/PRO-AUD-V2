import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Edit,
  FileText,
  Calendar,
  CheckSquare,
  AlertCircle,
  Hash,
  Type,
  List,
  Star,
  Weight
} from 'lucide-react';
import { carregarChecklist, normas, Checklist } from '@/data/mockData';

export function DetalhesChecklist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const checklistCarregado = carregarChecklist(id);
      setChecklist(checklistCarregado);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!checklist) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Checklist não encontrado</h3>
          <p className="text-muted-foreground mb-4">
            O checklist solicitado não foi encontrado ou foi removido.
          </p>
          <Button onClick={() => navigate('/checklists')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Lista
          </Button>
        </div>
      </div>
    );
  }

  const normaInfo = normas.find(n => n.id === checklist.norma_id);

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'sim_nao':
        return <CheckSquare className="h-4 w-4" />;
      case 'multipla_escolha':
        return <List className="h-4 w-4" />;
      case 'texto_livre':
        return <Type className="h-4 w-4" />;
      case 'numerica':
        return <Hash className="h-4 w-4" />;
      case 'avaliacao':
        return <Star className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'sim_nao':
        return 'Sim/Não';
      case 'multipla_escolha':
        return 'Múltipla Escolha';
      case 'texto_livre':
        return 'Texto Livre';
      case 'numerica':
        return 'Numérica';
      case 'data':
        return 'Data';
      case 'arquivo':
        return 'Arquivo';
      case 'avaliacao':
        return 'Avaliação';
      case 'conformidade':
        return 'Conformidade';
      default:
        return tipo;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/checklists')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{checklist.nome}</h1>
            <p className="text-muted-foreground">{checklist.descricao}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={checklist.ativo ? "default" : "secondary"}>
            {checklist.ativo ? 'Ativo' : 'Inativo'}
          </Badge>
          <Button onClick={() => navigate(`/checklists/${id}/editar`)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      {/* Informações Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Norma</p>
                <p className="text-lg font-semibold">{normaInfo?.nome || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <List className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categoria</p>
                <p className="text-lg font-semibold">{checklist.categoria}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Hash className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Versão</p>
                <p className="text-lg font-semibold">v{checklist.versao}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Perguntas</p>
                <p className="text-lg font-semibold">{checklist.perguntas?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Datas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Informações de Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Criação</p>
              <p className="text-lg">{new Date(checklist.dataCreacao).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Última Atualização</p>
              <p className="text-lg">{new Date(checklist.ultimaAtualizacao).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Perguntas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckSquare className="mr-2 h-5 w-5" />
            Perguntas do Checklist
          </CardTitle>
          <CardDescription>
            {checklist.perguntas?.length || 0} pergunta(s) cadastrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {checklist.perguntas && checklist.perguntas.length > 0 ? (
            <div className="space-y-4">
              {checklist.perguntas.map((pergunta, index) => (
                <Card key={pergunta.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            {getTipoIcon(pergunta.tipo)}
                            <span>{getTipoLabel(pergunta.tipo)}</span>
                          </Badge>
                          {pergunta.obrigatoria && (
                            <Badge variant="destructive" className="text-xs">
                              Obrigatória
                            </Badge>
                          )}
                          {pergunta.peso && (
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <Weight className="h-3 w-3" />
                              <span>Peso: {pergunta.peso}</span>
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium mb-2">{pergunta.texto}</h4>
                        
                        {pergunta.categoria && (
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Categoria:</strong> {pergunta.categoria}
                          </p>
                        )}

                        {pergunta.opcoes && pergunta.opcoes.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Opções:</p>
                            <div className="flex flex-wrap gap-1">
                              {pergunta.opcoes.map((opcao, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {opcao}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {(pergunta.valor_minimo !== undefined || pergunta.valor_maximo !== undefined) && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            {pergunta.valor_minimo !== undefined && (
                              <span>Min: {pergunta.valor_minimo} </span>
                            )}
                            {pergunta.valor_maximo !== undefined && (
                              <span>Max: {pergunta.valor_maximo}</span>
                            )}
                          </div>
                        )}

                        {pergunta.observacoes && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-muted-foreground">Observações:</p>
                            <p className="text-sm">{pergunta.observacoes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Nenhuma pergunta cadastrada</h3>
              <p className="text-muted-foreground mb-4">
                Este checklist ainda não possui perguntas cadastradas.
              </p>
              <Button onClick={() => navigate(`/checklists/${id}/editar`)}>
                <Edit className="mr-2 h-4 w-4" />
                Adicionar Perguntas
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}