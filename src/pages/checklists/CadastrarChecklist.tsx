import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  FileText,
  HelpCircle,
  CheckSquare,
  ToggleLeft,
  Star,
  Calendar,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Schema para pergunta individual
const perguntaSchema = z.object({
  id: z.string().optional(),
  texto: z.string().min(5, 'Pergunta deve ter pelo menos 5 caracteres'),
  tipo: z.enum(['multipla_escolha', 'sim_nao', 'texto_livre', 'numerica', 'data', 'arquivo', 'avaliacao', 'conformidade']),
  obrigatoria: z.boolean().default(true),
  peso: z.number().min(1).max(10).default(1),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  opcoes: z.array(z.string()).optional(),
  valor_minimo: z.number().optional(),
  valor_maximo: z.number().optional(),
  permite_evidencia: z.boolean().default(true),
  observacoes: z.string().optional()
});

// Schema principal do checklist
const checklistSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  norma_id: z.string().min(1, 'Selecione uma norma'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  versao: z.string().default('1.0'),
  ativo: z.boolean().default(true),
  perguntas: z.array(perguntaSchema).min(1, 'Adicione pelo menos uma pergunta')
});

type ChecklistForm = z.infer<typeof checklistSchema>;
type PerguntaForm = z.infer<typeof perguntaSchema>;

// Dados mockados
const normas = [
  { id: '1', nome: 'ISO 9001:2015 - Gestão da Qualidade' },
  { id: '2', nome: 'ISO 14001:2015 - Gestão Ambiental' },
  { id: '3', nome: 'ISO 45001:2018 - Saúde e Segurança' },
  { id: '4', nome: 'ISO 27001:2013 - Segurança da Informação' }
];

const categorias = [
  'Gestão de Processos',
  'Documentação',
  'Recursos Humanos',
  'Infraestrutura',
  'Monitoramento',
  'Melhoria Contínua',
  'Controle de Qualidade',
  'Segurança',
  'Meio Ambiente',
  'Tecnologia da Informação'
];

const tiposPergunta = [
  { value: 'sim_nao', label: 'Sim/Não', icon: CheckSquare },
  { value: 'multipla_escolha', label: 'Múltipla Escolha', icon: HelpCircle },
  { value: 'texto_livre', label: 'Texto Livre', icon: FileText },
  { value: 'numerica', label: 'Numérica', icon: ToggleLeft },
  { value: 'data', label: 'Data', icon: Calendar },
  { value: 'arquivo', label: 'Arquivo/Evidência', icon: Upload },
  { value: 'avaliacao', label: 'Avaliação (1-5)', icon: Star },
  { value: 'conformidade', label: 'Conforme/Não Conforme/Parcial/Supera/N/A', icon: CheckSquare }
];

export function CadastrarChecklist() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      norma_id: '',
      categoria: '',
      versao: '1.0',
      ativo: true,
      perguntas: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'perguntas'
  });

  const adicionarPergunta = () => {
    const novaPergunta: PerguntaForm = {
      id: `pergunta_${Date.now()}`,
      texto: '',
      tipo: 'sim_nao',
      obrigatoria: true,
      peso: 1,
      categoria: '',
      permite_evidencia: true,
      opcoes: []
    };
    append(novaPergunta);
  };

  // Função para definir opções fixas quando tipo conformidade for selecionado
  const handleTipoChange = (perguntaIndex: number, novoTipo: string) => {
    form.setValue(`perguntas.${perguntaIndex}.tipo`, novoTipo as 'multipla_escolha' | 'sim_nao' | 'texto_livre' | 'numerica' | 'data' | 'arquivo' | 'avaliacao' | 'conformidade');
    
    if (novoTipo === 'conformidade') {
      const opcoesConformidade = [
        'Conforme',
        'Não Conforme',
        'Parcial Conforme',
        'Supera',
        'Não se Aplica'
      ];
      form.setValue(`perguntas.${perguntaIndex}.opcoes`, opcoesConformidade);
    } else if (novoTipo !== 'multipla_escolha') {
      // Limpar opções para outros tipos que não sejam múltipla escolha
      form.setValue(`perguntas.${perguntaIndex}.opcoes`, []);
    }
  };

  const adicionarOpcao = (perguntaIndex: number) => {
    const pergunta = form.getValues(`perguntas.${perguntaIndex}`);
    const novasOpcoes = [...(pergunta.opcoes || []), ''];
    form.setValue(`perguntas.${perguntaIndex}.opcoes`, novasOpcoes);
  };

  const removerOpcao = (perguntaIndex: number, opcaoIndex: number) => {
    const pergunta = form.getValues(`perguntas.${perguntaIndex}`);
    const novasOpcoes = pergunta.opcoes?.filter((_, index) => index !== opcaoIndex) || [];
    form.setValue(`perguntas.${perguntaIndex}.opcoes`, novasOpcoes);
  };

  const onSubmit = async (data: ChecklistForm) => {
    setIsLoading(true);
    
    // Simular salvamento
    setTimeout(() => {
      console.log('Novo checklist:', data);
      setIsLoading(false);
      navigate('/checklists');
    }, 1000);
  };

  const getTipoIcon = (tipo: string) => {
    const tipoInfo = tiposPergunta.find(t => t.value === tipo);
    return tipoInfo ? tipoInfo.icon : HelpCircle;
  };

  const getTipoLabel = (tipo: string) => {
    const tipoInfo = tiposPergunta.find(t => t.value === tipo);
    return tipoInfo ? tipoInfo.label : tipo;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Checklist</h1>
          <p className="text-muted-foreground">
            Crie um checklist personalizado para suas auditorias
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/checklists')} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <ArrowLeft className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
          Voltar
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina as informações gerais do checklist
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a norma" />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria} value={categoria}>
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
                <Button type="button" onClick={adicionarPergunta} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Plus className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                  Adicionar Pergunta
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {fields.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-400 transition-all duration-200 ease-in-out hover:scale-105" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Nenhuma pergunta adicionada
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Comece adicionando a primeira pergunta do seu checklist.
                  </p>
                  <div className="mt-6">
                    <Button type="button" onClick={adicionarPergunta} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <Plus className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                      Adicionar Primeira Pergunta
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {fields.map((field, index) => {
                    const tipoPergunta = form.watch(`perguntas.${index}.tipo`);
                    const TipoIcon = getTipoIcon(tipoPergunta);
                    
                    return (
                      <Card key={field.id} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <TipoIcon className="h-5 w-5 text-blue-600 transition-all duration-200 ease-in-out" />
                              <CardTitle className="text-lg">
                                Pergunta {index + 1}
                              </CardTitle>
                              <Badge variant="secondary">
                                {getTipoLabel(tipoPergunta)}
                              </Badge>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => remove(index)}
                              className="text-red-600 hover:text-red-700 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <Trash2 className="h-4 w-4 transition-all duration-200 ease-in-out" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`perguntas.${index}.texto`}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Texto da Pergunta</FormLabel>
                                  <FormControl>
                                  <Textarea 
                                    placeholder="Digite o texto da pergunta"
                                    {...field}
                                  />
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
                                  <FormLabel>Tipo de Pergunta</FormLabel>
                                  <Select onValueChange={(value) => handleTipoChange(index, value)} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {tiposPergunta.map((tipo) => {
                                        const Icon = tipo.icon;
                                        return (
                                          <SelectItem key={tipo.value} value={tipo.value}>
                                            <div className="flex items-center gap-2">
                                              <Icon className="h-4 w-4 transition-all duration-200 ease-in-out" />
                                              {tipo.label}
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

                            <FormField
                              control={form.control}
                              name={`perguntas.${index}.categoria`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Categoria</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categorias.map((categoria) => (
                                        <SelectItem key={categoria} value={categoria}>
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
                                  <FormLabel>Peso (1-10)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number" 
                                      min="1" 
                                      max="10"
                                      {...field}
                                      onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex items-center space-x-4">
                              <FormField
                                control={form.control}
                                name={`perguntas.${index}.obrigatoria`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="rounded"
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
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="rounded"
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm">Permite Evidência</FormLabel>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* Opções para múltipla escolha */}
                          {tipoPergunta === 'multipla_escolha' && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <FormLabel>Opções de Resposta</FormLabel>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => adicionarOpcao(index)}
                                  className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                  <Plus className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                                  Adicionar Opção
                                </Button>
                              </div>
                              {form.watch(`perguntas.${index}.opcoes`)?.map((opcao, opcaoIndex) => (
                                <div key={opcaoIndex} className="flex items-center gap-2">
                                  <Input
                                    placeholder={`Opção ${opcaoIndex + 1}`}
                                    value={opcao}
                                    onChange={(e) => {
                                      const opcoes = form.getValues(`perguntas.${index}.opcoes`) || [];
                                      opcoes[opcaoIndex] = e.target.value;
                                      form.setValue(`perguntas.${index}.opcoes`, opcoes);
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removerOpcao(index, opcaoIndex)}
                                    className="text-red-600 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                  >
                                    <Trash2 className="h-4 w-4 transition-all duration-200 ease-in-out" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Opções fixas para conformidade */}
                          {tipoPergunta === 'conformidade' && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Opções de Conformidade (Fixas)</label>
                              <div className="grid grid-cols-1 gap-2">
                                {['Conforme', 'Não Conforme', 'Parcial Conforme', 'Supera', 'Não se Aplica'].map((opcao) => (
                                  <Badge key={opcao} variant="outline" className="justify-start">
                                    {opcao}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Estas opções são fixas e não podem ser editadas.
                              </p>
                            </div>
                          )}

                          {/* Valores mínimo e máximo para perguntas numéricas */}
                          {tipoPergunta === 'numerica' && (
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
                                <FormLabel>Observações (Opcional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Instruções adicionais para o auditor..."
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/checklists')}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
              {isLoading ? 'Salvando...' : 'Salvar Checklist'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}