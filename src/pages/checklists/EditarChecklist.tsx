import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckSquare,
  Hash,
  Type,
  List,
  Star,
  Calendar,
  FileText,
  AlertCircle
} from 'lucide-react';
import { carregarChecklist, salvarChecklist, normas, categorias, Checklist, Pergunta } from '@/data/mockData';

// Schema para pergunta
const perguntaSchema = z.object({
  id: z.string().optional(),
  texto: z.string().min(1, 'Texto da pergunta é obrigatório'),
  tipo: z.enum(['sim_nao', 'multipla_escolha', 'texto_livre', 'numerica', 'data', 'arquivo', 'avaliacao', 'conformidade']),
  obrigatoria: z.boolean(),
  peso: z.number().min(0).max(10).optional(),
  categoria: z.string().optional(),
  opcoes: z.array(z.string()).optional(),
  valor_minimo: z.number().optional(),
  valor_maximo: z.number().optional(),
  permite_evidencia: z.boolean().optional(),
  observacoes: z.string().optional(),
});

// Schema para checklist
const checklistSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  norma_id: z.string().min(1, 'Norma é obrigatória'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  versao: z.string().min(1, 'Versão é obrigatória'),
  ativo: z.boolean(),
  perguntas: z.array(perguntaSchema),
});

type ChecklistFormData = z.infer<typeof checklistSchema>;

const tiposPergunta = [
  { value: 'sim_nao', label: 'Sim/Não', icon: CheckSquare },
  { value: 'multipla_escolha', label: 'Múltipla Escolha', icon: List },
  { value: 'texto_livre', label: 'Texto Livre', icon: Type },
  { value: 'numerica', label: 'Numérica', icon: Hash },
  { value: 'data', label: 'Data', icon: Calendar },
  { value: 'arquivo', label: 'Arquivo', icon: FileText },
  { value: 'avaliacao', label: 'Avaliação (1-5)', icon: Star },
  { value: 'conformidade', label: 'Conformidade', icon: CheckSquare },
];

export function EditarChecklist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      norma_id: '',
      categoria: '',
      versao: '1.0',
      ativo: true,
      perguntas: [],
    },
  });

  useEffect(() => {
    if (id) {
      const checklistCarregado = carregarChecklist(id);
      if (checklistCarregado) {
        setChecklist(checklistCarregado);
        form.reset({
          nome: checklistCarregado.nome,
          descricao: checklistCarregado.descricao,
          norma_id: checklistCarregado.norma_id,
          categoria: checklistCarregado.categoria,
          versao: checklistCarregado.versao,
          ativo: checklistCarregado.ativo,
          perguntas: checklistCarregado.perguntas || [],
        });
      }
    }
    setLoading(false);
  }, [id, form]);

  const adicionarPergunta = () => {
    const perguntas = form.getValues('perguntas');
    const novaPergunta: Pergunta = {
      id: `pergunta_${Date.now()}`,
      texto: '',
      tipo: 'sim_nao',
      obrigatoria: false,
      peso: 1,
      categoria: '',
      opcoes: [],
      permite_evidencia: false,
      observacoes: '',
    };
    form.setValue('perguntas', [...perguntas, novaPergunta]);
  };

  const removerPergunta = (index: number) => {
    const perguntas = form.getValues('perguntas');
    form.setValue('perguntas', perguntas.filter((_, i) => i !== index));
  };

  const handleTipoChange = (index: number, novoTipo: string) => {
    const perguntas = form.getValues('perguntas');
    const perguntaAtualizada = { ...perguntas[index] };
    perguntaAtualizada.tipo = novoTipo as 'sim_nao' | 'multipla_escolha' | 'texto_livre' | 'numerica' | 'data' | 'arquivo' | 'avaliacao' | 'conformidade';
    
    // Configurar opções baseadas no tipo
    if (novoTipo === 'conformidade') {
      perguntaAtualizada.opcoes = ['Conforme', 'Não Conforme', 'Não Aplicável'];
    } else if (novoTipo === 'sim_nao') {
      perguntaAtualizada.opcoes = ['Sim', 'Não'];
    } else if (novoTipo === 'avaliacao') {
      perguntaAtualizada.opcoes = ['1', '2', '3', '4', '5'];
    } else if (novoTipo !== 'multipla_escolha') {
      perguntaAtualizada.opcoes = [];
    }
    
    // Limpar valores específicos baseados no tipo
    if (novoTipo !== 'numerica') {
      perguntaAtualizada.valor_minimo = undefined;
      perguntaAtualizada.valor_maximo = undefined;
    }
    
    perguntas[index] = perguntaAtualizada;
    form.setValue('perguntas', [...perguntas]);
  };

  const adicionarOpcao = (perguntaIndex: number) => {
    const perguntas = form.getValues('perguntas');
    const pergunta = perguntas[perguntaIndex];
    if (pergunta.opcoes) {
      pergunta.opcoes.push('');
    } else {
      pergunta.opcoes = [''];
    }
    form.setValue('perguntas', [...perguntas]);
  };

  const removerOpcao = (perguntaIndex: number, opcaoIndex: number) => {
    const perguntas = form.getValues('perguntas');
    const pergunta = perguntas[perguntaIndex];
    if (pergunta.opcoes) {
      pergunta.opcoes.splice(opcaoIndex, 1);
    }
    form.setValue('perguntas', [...perguntas]);
  };

  const onSubmit = async (data: ChecklistFormData) => {
    if (!checklist) return;
    
    setIsLoading(true);
    try {
      const checklistAtualizado: Checklist = {
        ...checklist,
        ...data,
        ultimaAtualizacao: new Date().toISOString(),
      };
      
      salvarChecklist(checklistAtualizado);
      navigate('/checklists');
    } catch (error) {
      console.error('Erro ao salvar checklist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTipoIcon = (tipo: string) => {
    const tipoInfo = tiposPergunta.find(t => t.value === tipo);
    return tipoInfo ? tipoInfo.icon : CheckSquare;
  };

  const getTipoLabel = (tipo: string) => {
    const tipoInfo = tiposPergunta.find(t => t.value === tipo);
    return tipoInfo ? tipoInfo.label : tipo;
  };

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
            <h1 className="text-2xl font-bold">Editar Checklist</h1>
            <p className="text-muted-foreground">Modifique as informações do checklist</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina as informações principais do checklist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Checklist</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome do checklist" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="versao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Versão</FormLabel>
                      <FormControl>
                        <Input placeholder="1.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o objetivo e escopo do checklist"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="norma_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Norma</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma norma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {normas.map((norma) => (
                            <SelectItem key={norma.id} value={norma.id}>
                              {norma.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categorias.map((categoria, index) => (
                            <SelectItem key={index} value={categoria}>
                              {categoria}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="ativo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Checklist ativo
                      </FormLabel>
                      <FormDescription>
                        Checklists ativos podem ser utilizados em auditorias
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Editor de Perguntas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Perguntas do Checklist</CardTitle>
                  <CardDescription>
                    Adicione e configure as perguntas do checklist
                  </CardDescription>
                </div>
                <Button type="button" onClick={adicionarPergunta} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Pergunta
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {form.watch('perguntas').map((pergunta, index) => {
                  const IconComponent = getTipoIcon(pergunta.tipo);
                  return (
                    <Card key={pergunta.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">#{index + 1}</Badge>
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              <IconComponent className="h-3 w-3" />
                              <span>{getTipoLabel(pergunta.tipo)}</span>
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removerPergunta(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`perguntas.${index}.texto`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Texto da Pergunta</FormLabel>
                                <FormControl>
                                  <Input placeholder="Digite a pergunta" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`perguntas.${index}.tipo`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tipo da Pergunta</FormLabel>
                                <Select 
                                  onValueChange={(value) => handleTipoChange(index, value)} 
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {tiposPergunta.map((tipo) => {
                                      const IconComponent = tipo.icon;
                                      return (
                                        <SelectItem key={tipo.value} value={tipo.value}>
                                          <div className="flex items-center space-x-2">
                                            <IconComponent className="h-4 w-4" />
                                            <span>{tipo.label}</span>
                                          </div>
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`perguntas.${index}.categoria`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Categoria</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Categoria" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {categorias.map((categoria, index) => (
                                      <SelectItem key={index} value={categoria}>
                                        {categoria}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`perguntas.${index}.peso`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Peso (0-10)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min="0" 
                                    max="10" 
                                    placeholder="1"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center space-x-4 pt-6">
                            <FormField
                              control={form.control}
                              name={`perguntas.${index}.obrigatoria`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm">Obrigatória</FormLabel>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`perguntas.${index}.permite_evidencia`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm">Permite Evidência</FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Opções para múltipla escolha */}
                        {(pergunta.tipo === 'multipla_escolha' || pergunta.tipo === 'conformidade' || pergunta.tipo === 'sim_nao' || pergunta.tipo === 'avaliacao') && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Opções</Label>
                              {pergunta.tipo === 'multipla_escolha' && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => adicionarOpcao(index)}
                                >
                                  <Plus className="mr-2 h-3 w-3" />
                                  Adicionar Opção
                                </Button>
                              )}
                            </div>
                            <div className="space-y-2">
                              {pergunta.opcoes?.map((opcao, opcaoIndex) => (
                                <div key={opcaoIndex} className="flex items-center space-x-2">
                                  <Input
                                    value={opcao}
                                    onChange={(e) => {
                                      const perguntas = form.getValues('perguntas');
                                      if (perguntas[index].opcoes) {
                                        perguntas[index].opcoes![opcaoIndex] = e.target.value;
                                        form.setValue('perguntas', [...perguntas]);
                                      }
                                    }}
                                    placeholder={`Opção ${opcaoIndex + 1}`}
                                    disabled={pergunta.tipo !== 'multipla_escolha'}
                                  />
                                  {pergunta.tipo === 'multipla_escolha' && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removerOpcao(index, opcaoIndex)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Valores mínimo e máximo para perguntas numéricas */}
                        {pergunta.tipo === 'numerica' && (
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`perguntas.${index}.valor_minimo`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Valor Mínimo</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      placeholder="0"
                                      {...field}
                                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`perguntas.${index}.valor_maximo`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Valor Máximo</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      placeholder="100"
                                      {...field}
                                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}

                        <FormField
                          control={form.control}
                          name={`perguntas.${index}.observacoes`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Observações</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Observações adicionais sobre a pergunta"
                                  className="min-h-[80px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  );
                })}

                {form.watch('perguntas').length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Nenhuma pergunta adicionada</h3>
                    <p className="text-muted-foreground mb-4">
                      Clique no botão "Adicionar Pergunta" para começar a criar seu checklist.
                    </p>
                    <Button type="button" onClick={adicionarPergunta}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Primeira Pergunta
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/checklists')}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}