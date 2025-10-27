import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Users,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Save,
  AlertCircle,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Schema de validação seguindo ISO 19011
const auditoriaSchema = z.object({
  // Etapa 1: Informações Básicas
  titulo: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  tipo_auditoria: z.enum(['interna', 'externa', 'certificacao', 'fornecedor']),
  norma_id: z.string().min(1, 'Selecione uma norma'),
  setor_id: z.string().min(1, 'Selecione um setor'),
  
  // Etapa 2: Planejamento
  data_inicio: z.string().min(1, 'Data de início é obrigatória'),
  data_fim: z.string().min(1, 'Data de fim é obrigatória'),
  duracao_estimada: z.number().min(1, 'Duração deve ser maior que 0'),
  
  // Etapa 3: Equipe Auditora
  auditor_lider_id: z.string().min(1, 'Selecione o auditor líder'),
  auditores_ids: z.array(z.string()).min(1, 'Selecione pelo menos um auditor'),
  
  // Etapa 4: Escopo e Critérios
  escopo: z.string().min(10, 'Escopo deve ter pelo menos 10 caracteres'),
  criterios: z.string().min(10, 'Critérios devem ter pelo menos 10 caracteres'),
  checklist_id: z.string().min(1, 'Selecione um checklist'),
  
  // Etapa 5: Objetivos e Riscos
  objetivos: z.string().min(10, 'Objetivos devem ter pelo menos 10 caracteres'),
  riscos_identificados: z.string().optional(),
  recursos_necessarios: z.string().optional()
});

type AuditoriaForm = z.infer<typeof auditoriaSchema>;

// Schemas de validação por etapa
const stepSchemas = {
  basicas: z.object({
    titulo: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
    tipo_auditoria: z.enum(['interna', 'externa', 'certificacao', 'fornecedor']),
    norma_id: z.string().min(1, 'Selecione uma norma'),
    setor_id: z.string().min(1, 'Selecione um setor'),
  }),
  planejamento: z.object({
    data_inicio: z.string().min(1, 'Data de início é obrigatória'),
    data_fim: z.string().min(1, 'Data de fim é obrigatória'),
    duracao_estimada: z.number().min(1, 'Duração deve ser maior que 0'),
  }).refine((data) => {
    if (data.data_inicio && data.data_fim) {
      return new Date(data.data_fim) >= new Date(data.data_inicio);
    }
    return true;
  }, {
    message: "Data de fim deve ser posterior ou igual à data de início",
    path: ["data_fim"]
  }),
  equipe: z.object({
    auditor_lider_id: z.string().min(1, 'Selecione o auditor líder'),
    auditores_ids: z.array(z.string()).min(1, 'Selecione pelo menos um auditor'),
  }),
  escopo: z.object({
    escopo: z.string().min(10, 'Escopo deve ter pelo menos 10 caracteres'),
    criterios: z.string().min(10, 'Critérios devem ter pelo menos 10 caracteres'),
    checklist_id: z.string().min(1, 'Selecione um checklist'),
  }),
  objetivos: z.object({
    objetivos: z.string().min(10, 'Objetivos devem ter pelo menos 10 caracteres'),
    riscos_identificados: z.string().optional(),
    recursos_necessarios: z.string().optional()
  })
};

// Dados mockados
const normas = [
  { id: '1', nome: 'ISO 9001:2015 - Gestão da Qualidade' },
  { id: '2', nome: 'ISO 14001:2015 - Gestão Ambiental' },
  { id: '3', nome: 'ISO 45001:2018 - Saúde e Segurança' },
  { id: '4', nome: 'ISO 27001:2013 - Segurança da Informação' }
];

const setores = [
  { id: '1', nome: 'Recursos Humanos' },
  { id: '2', nome: 'Finanças' },
  { id: '3', nome: 'Tecnologia da Informação' },
  { id: '4', nome: 'Produção' },
  { id: '5', nome: 'Qualidade' }
];

const auditores = [
  { id: '1', nome: 'João Silva', certificacoes: ['ISO 9001', 'ISO 14001'] },
  { id: '2', nome: 'Maria Santos', certificacoes: ['ISO 45001', 'ISO 27001'] },
  { id: '3', nome: 'Pedro Costa', certificacoes: ['ISO 9001', 'ISO 45001'] },
  { id: '4', nome: 'Ana Oliveira', certificacoes: ['ISO 14001', 'ISO 27001'] }
];

const checklists = [
  { id: '1', nome: 'Checklist ISO 9001 - Processos Gerais' },
  { id: '2', nome: 'Checklist ISO 14001 - Aspectos Ambientais' },
  { id: '3', nome: 'Checklist ISO 45001 - Segurança do Trabalho' },
  { id: '4', nome: 'Checklist ISO 27001 - Segurança da Informação' }
];

export function CadastrarAuditoria() {
  const [currentStep, setCurrentStep] = useState('basicas');
  const [isLoading, setIsLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const form = useForm<AuditoriaForm>({
    resolver: zodResolver(auditoriaSchema),
    mode: 'onChange',
    defaultValues: {
      titulo: '',
      tipo_auditoria: 'interna',
      norma_id: '',
      setor_id: '',
      data_inicio: '',
      data_fim: '',
      duracao_estimada: 8,
      auditor_lider_id: '',
      auditores_ids: [],
      escopo: '',
      criterios: '',
      checklist_id: '',
      objetivos: '',
      riscos_identificados: '',
      recursos_necessarios: ''
    }
  });

  const steps = [
    { id: 'basicas', label: 'Informações Básicas', icon: FileText },
    { id: 'planejamento', label: 'Planejamento', icon: Calendar },
    { id: 'equipe', label: 'Equipe Auditora', icon: Users },
    { id: 'escopo', label: 'Escopo e Critérios', icon: CheckCircle },
    { id: 'objetivos', label: 'Objetivos e Riscos', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  // Função para validar etapa atual
  const validateCurrentStep = async () => {
    const currentStepData = form.getValues();
    const stepSchema = stepSchemas[currentStep as keyof typeof stepSchemas];
    
    try {
      await stepSchema.parseAsync(currentStepData);
      setValidationErrors([]);
      
      // Marcar etapa como completada
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.issues.map(err => err.message);
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    
    if (isValid && currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
      setValidationErrors([]);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
      setValidationErrors([]);
    }
  };

  const goToStep = async (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const currentIndex = currentStepIndex;
    
    // Se está tentando ir para uma etapa anterior, permite
    if (stepIndex < currentIndex) {
      setCurrentStep(stepId);
      setValidationErrors([]);
      return;
    }
    
    // Se está tentando ir para uma etapa posterior, valida a atual primeiro
    if (stepIndex > currentIndex) {
      const isValid = await validateCurrentStep();
      if (isValid) {
        setCurrentStep(stepId);
        setValidationErrors([]);
      }
    }
  };

  const saveDraft = async () => {
    const data = form.getValues();
    console.log('Salvando rascunho:', data);
    // Aqui você implementaria a lógica para salvar como rascunho
    alert('Rascunho salvo com sucesso!');
  };

  const onSubmit = async (data: AuditoriaForm) => {
    setIsLoading(true);
    
    // Simular salvamento
    setTimeout(() => {
      console.log('Nova auditoria:', data);
      setIsLoading(false);
      alert('Auditoria cadastrada com sucesso!');
      navigate('/auditorias');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nova Auditoria</h1>
          <p className="text-muted-foreground">
            Cadastre uma nova auditoria seguindo a metodologia ISO 19011
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={saveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Rascunho
          </Button>
          <Button variant="outline" onClick={() => navigate('/auditorias')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = completedSteps.includes(step.id);
              
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      isActive 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : isCompleted 
                          ? 'border-green-500 bg-green-500 text-white hover:bg-green-600'
                          : 'border-gray-300 text-gray-400 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Corrija os seguintes erros para continuar:
                </h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={currentStep} className="space-y-6">
            {/* Etapa 1: Informações Básicas */}
            <TabsContent value="basicas">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Informações Básicas
                  </CardTitle>
                  <CardDescription>
                    Defina as informações fundamentais da auditoria
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Auditoria</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Auditoria ISO 9001 - Setor Produção" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tipo_auditoria"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Auditoria</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="interna">Auditoria Interna</SelectItem>
                              <SelectItem value="externa">Auditoria Externa</SelectItem>
                              <SelectItem value="certificacao">Auditoria de Certificação</SelectItem>
                              <SelectItem value="fornecedor">Auditoria de Fornecedor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                  </div>

                  <FormField
                    control={form.control}
                    name="setor_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setor Auditado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o setor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {setores.map((setor) => (
                              <SelectItem key={setor.id} value={setor.id}>
                                {setor.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Etapa 2: Planejamento */}
            <TabsContent value="planejamento">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Planejamento da Auditoria
                  </CardTitle>
                  <CardDescription>
                    Defina o cronograma e duração da auditoria
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="data_inicio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Início</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="data_fim"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Fim</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duracao_estimada"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duração Estimada (horas)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium">Dica de Planejamento:</p>
                        <p>Considere tempo adicional para preparação, reuniões e elaboração do relatório final.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Etapa 3: Equipe Auditora */}
            <TabsContent value="equipe">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Equipe Auditora
                  </CardTitle>
                  <CardDescription>
                    Selecione o auditor líder e a equipe auditora
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="auditor_lider_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auditor Líder</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o auditor líder" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {auditores.map((auditor) => (
                              <SelectItem key={auditor.id} value={auditor.id}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{auditor.nome}</span>
                                  <div className="flex gap-1 ml-2">
                                    {auditor.certificacoes.map((cert) => (
                                      <Badge key={cert} variant="secondary" className="text-xs">
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
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
                    name="auditores_ids"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipe Auditora</FormLabel>
                        <div className="mt-2 space-y-2">
                          {auditores.map((auditor) => (
                            <div key={auditor.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  id={`auditor-${auditor.id}`}
                                  checked={field.value?.includes(auditor.id) || false}
                                  onChange={(e) => {
                                    const currentValues = field.value || [];
                                    if (e.target.checked) {
                                      field.onChange([...currentValues, auditor.id]);
                                    } else {
                                      field.onChange(currentValues.filter(id => id !== auditor.id));
                                    }
                                  }}
                                  className="rounded"
                                />
                                <label htmlFor={`auditor-${auditor.id}`} className="font-medium cursor-pointer">
                                  {auditor.nome}
                                </label>
                              </div>
                              <div className="flex gap-1">
                                {auditor.certificacoes.map((cert) => (
                                  <Badge key={cert} variant="secondary" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Etapa 4: Escopo e Critérios */}
            <TabsContent value="escopo">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Escopo e Critérios
                  </CardTitle>
                  <CardDescription>
                    Defina o escopo, critérios e checklist da auditoria
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="escopo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escopo da Auditoria</FormLabel>
                        <FormControl>
                          <Textarea
                            className="w-full min-h-[100px] p-3 border rounded-md"
                            placeholder="Descreva o escopo da auditoria, incluindo processos, áreas e atividades a serem auditadas..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="criterios"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Critérios de Auditoria</FormLabel>
                        <FormControl>
                          <Textarea
                            className="w-full min-h-[100px] p-3 border rounded-md"
                            placeholder="Defina os critérios de auditoria baseados na norma selecionada..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checklist_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Checklist</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o checklist" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {checklists.map((checklist) => (
                              <SelectItem key={checklist.id} value={checklist.id}>
                                {checklist.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Etapa 5: Objetivos e Riscos */}
            <TabsContent value="objetivos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Objetivos e Riscos
                  </CardTitle>
                  <CardDescription>
                    Defina os objetivos da auditoria e identifique possíveis riscos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="objetivos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Objetivos da Auditoria</FormLabel>
                        <FormControl>
                          <Textarea
                            className="w-full min-h-[100px] p-3 border rounded-md"
                            placeholder="Descreva os objetivos específicos desta auditoria..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="riscos_identificados"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Riscos Identificados (Opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            className="w-full min-h-[80px] p-3 border rounded-md"
                            placeholder="Identifique possíveis riscos que podem afetar a auditoria..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recursos_necessarios"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recursos Necessários (Opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            className="w-full min-h-[80px] p-3 border rounded-md"
                            placeholder="Liste os recursos necessários para a auditoria (equipamentos, documentos, etc.)..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Preview dos dados antes do salvamento */}
                  {currentStep === 'objetivos' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Resumo da Auditoria:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Título:</strong> {form.watch('titulo') || 'Não informado'}</p>
                        <p><strong>Tipo:</strong> {form.watch('tipo_auditoria') || 'Não informado'}</p>
                        <p><strong>Período:</strong> {form.watch('data_inicio')} até {form.watch('data_fim')}</p>
                        <p><strong>Auditor Líder:</strong> {auditores.find(a => a.id === form.watch('auditor_lider_id'))?.nome || 'Não selecionado'}</p>
                        <p><strong>Equipe:</strong> {form.watch('auditores_ids')?.length || 0} auditor(es) selecionado(s)</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <div className="flex gap-2">
              {currentStepIndex === steps.length - 1 ? (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar Auditoria'}
                </Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}