import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  Camera, 
  FileText, 
  Upload, 
  X, 
  Save, 
  Send,
  Loader2,
  Eye,
  Download,
  Trash2
} from 'lucide-react';

// Tipos para evidências e fotos
interface Foto {
  id: string;
  perguntaId: string;
  url: string;
  nome: string;
  timestamp: number;
}

interface Evidencia {
  id: string;
  perguntaId: string;
  nome: string;
  tipo: string;
  url: string;
  tamanho: number;
  timestamp: number;
}

export function ExecucaoAuditoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [respostas, setRespostas] = useState<Record<string, string | number | boolean>>({});
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [loading, setLoading] = useState(false);
  const [salvandoRascunho, setSalvandoRascunho] = useState(false);
  const [finalizandoAuditoria, setFinalizandoAuditoria] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const evidenciaInputRef = useRef<HTMLInputElement>(null);

  // Dados mockados
  const auditoria = {
    id: id,
    titulo: 'Auditoria ISO 9001 - Setor Produção',
    checklist: {
      nome: 'Checklist ISO 9001 - Produção',
      perguntas: [
        {
          id: '1',
          categoria: 'Gestão de Qualidade',
          texto: 'A organização possui uma política de qualidade documentada?',
          tipo: 'sim_nao',
          obrigatoria: true,
          peso: 10
        },
        {
          id: '2',
          categoria: 'Gestão de Qualidade',
          texto: 'Os objetivos de qualidade são mensuráveis?',
          tipo: 'sim_nao',
          obrigatoria: true,
          peso: 8
        },
        {
          id: '3',
          categoria: 'Controle de Processos',
          texto: 'Qual é o percentual de conformidade do último mês?',
          tipo: 'numerico',
          obrigatoria: false,
          peso: 5,
          min: 0,
          max: 100
        }
      ]
    }
  };

  const categorias = [...new Set(auditoria.checklist.perguntas.map(p => p.categoria))];

  const handleResposta = (perguntaId: string, valor: string | number | boolean) => {
    setRespostas(prev => ({
      ...prev,
      [perguntaId]: valor
    }));
  };

  const getStatusResposta = (perguntaId: string) => {
    const resposta = respostas[perguntaId];
    if (resposta === undefined) return 'pendente';
    if (resposta === 'sim' || resposta === true) return 'conforme';
    if (resposta === 'nao' || resposta === false) return 'nao_conforme';
    return 'respondida';
  };

  // Carregar dados salvos no localStorage ao inicializar
  useEffect(() => {
    const rascunhoSalvo = localStorage.getItem(`auditoria_rascunho_${id}`);
    if (rascunhoSalvo) {
      try {
        const dados = JSON.parse(rascunhoSalvo);
        setRespostas(dados.respostas || {});
        setFotos(dados.fotos || []);
        setEvidencias(dados.evidencias || []);
        toast.success('Rascunho carregado com sucesso!');
      } catch (error) {
        console.error('Erro ao carregar rascunho:', error);
      }
    }
  }, [id]);

  // Função para capturar foto
  const handleCapturarFoto = (perguntaId: string) => {
    if (cameraInputRef.current) {
      cameraInputRef.current.setAttribute('data-pergunta-id', perguntaId);
      cameraInputRef.current.click();
    }
  };

  // Função para upload de foto
  const handleUploadFoto = (perguntaId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-pergunta-id', perguntaId);
      fileInputRef.current.click();
    }
  };

  // Processar arquivo de foto selecionado
  const handleFotoSelecionada = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const perguntaId = event.target.getAttribute('data-pergunta-id');
    
    if (file && perguntaId) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const novaFoto: Foto = {
            id: Date.now().toString(),
            perguntaId,
            url: e.target?.result as string,
            nome: file.name,
            timestamp: Date.now()
          };
          
          setFotos(prev => [...prev, novaFoto]);
          toast.success('Foto anexada com sucesso!');
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Por favor, selecione apenas arquivos de imagem.');
      }
    }
    
    // Limpar o input
    event.target.value = '';
  };

  // Função para upload de evidência
  const handleUploadEvidencia = (perguntaId: string) => {
    if (evidenciaInputRef.current) {
      evidenciaInputRef.current.setAttribute('data-pergunta-id', perguntaId);
      evidenciaInputRef.current.click();
    }
  };

  // Processar arquivo de evidência selecionado
  const handleEvidenciaSelecionada = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const perguntaId = event.target.getAttribute('data-pergunta-id');
    
    if (file && perguntaId) {
      const tiposPermitidos = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/gif'];
      
      if (tiposPermitidos.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const novaEvidencia: Evidencia = {
            id: Date.now().toString(),
            perguntaId,
            nome: file.name,
            tipo: file.type,
            url: e.target?.result as string,
            tamanho: file.size,
            timestamp: Date.now()
          };
          
          setEvidencias(prev => [...prev, novaEvidencia]);
          toast.success('Evidência anexada com sucesso!');
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Tipo de arquivo não permitido. Use PDF, DOC, DOCX ou imagens.');
      }
    }
    
    // Limpar o input
    event.target.value = '';
  };

  // Remover foto
  const removerFoto = (fotoId: string) => {
    setFotos(prev => prev.filter(foto => foto.id !== fotoId));
    toast.success('Foto removida com sucesso!');
  };

  // Remover evidência
  const removerEvidencia = (evidenciaId: string) => {
    setEvidencias(prev => prev.filter(evidencia => evidencia.id !== evidenciaId));
    toast.success('Evidência removida com sucesso!');
  };

  // Salvar rascunho
  const salvarRascunho = async () => {
    setSalvandoRascunho(true);
    
    try {
      const dadosRascunho = {
        respostas,
        fotos,
        evidencias,
        timestamp: Date.now()
      };
      
      localStorage.setItem(`auditoria_rascunho_${id}`, JSON.stringify(dadosRascunho));
      
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Rascunho salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error);
      toast.error('Erro ao salvar rascunho. Tente novamente.');
    } finally {
      setSalvandoRascunho(false);
    }
  };

  // Validar perguntas obrigatórias
  const validarPerguntasObrigatorias = () => {
    const perguntasObrigatorias = auditoria.checklist.perguntas.filter(p => p.obrigatoria);
    const perguntasNaoRespondidas = perguntasObrigatorias.filter(p => respostas[p.id] === undefined);
    
    return perguntasNaoRespondidas;
  };

  // Calcular score da auditoria
  const calcularScore = () => {
    let pontuacaoTotal = 0;
    let pesoTotal = 0;
    
    auditoria.checklist.perguntas.forEach(pergunta => {
      const resposta = respostas[pergunta.id];
      pesoTotal += pergunta.peso;
      
      if (resposta === 'sim' || resposta === true) {
        pontuacaoTotal += pergunta.peso;
      } else if (pergunta.tipo === 'numerico' && typeof resposta === 'string') {
        const valor = parseFloat(resposta);
        if (!isNaN(valor)) {
          // Para perguntas numéricas, calcular proporcionalmente
          const proporcao = valor / (pergunta.max || 100);
          pontuacaoTotal += pergunta.peso * proporcao;
        }
      }
    });
    
    return pesoTotal > 0 ? Math.round((pontuacaoTotal / pesoTotal) * 100) : 0;
  };

  // Finalizar auditoria
  const finalizarAuditoria = async () => {
    const perguntasNaoRespondidas = validarPerguntasObrigatorias();
    
    if (perguntasNaoRespondidas.length > 0) {
      toast.error(`Por favor, responda todas as perguntas obrigatórias. Faltam ${perguntasNaoRespondidas.length} pergunta(s).`);
      return;
    }
    
    setFinalizandoAuditoria(true);
    
    try {
      const score = calcularScore();
      
      // Calcular estatísticas detalhadas
      const totalPerguntas = auditoria.checklist.perguntas.length;
      const perguntasRespondidas = Object.keys(respostas).length;
      const perguntasConformes = auditoria.checklist.perguntas.filter(p => {
        const resposta = respostas[p.id];
        return resposta === 'sim' || resposta === true || (p.tipo === 'numerico' && parseFloat(resposta as string) >= 80);
      }).length;
      const perguntasNaoConformes = perguntasRespondidas - perguntasConformes;

      const auditoriaFinalizada = {
        id,
        titulo: auditoria.titulo,
        checklist: auditoria.checklist.nome,
        auditor: 'João Silva',
        local: 'Setor Produção',
        dataFinalizacao: new Date().toISOString(),
        score,
        totalPerguntas,
        perguntasRespondidas,
        perguntasConformes,
        perguntasNaoConformes,
        respostas: Object.entries(respostas).map(([perguntaId, valor]) => ({
          perguntaId,
          valor,
          observacoes: ''
        })),
        fotos,
        evidencias,
        perguntas: auditoria.checklist.perguntas
      };
      
      // Salvar auditoria finalizada usando a função do mockData
      const auditoriasSalvas = localStorage.getItem('auditorias_finalizadas');
      let auditorias = [];
      
      if (auditoriasSalvas) {
        auditorias = JSON.parse(auditoriasSalvas);
      }
      
      // Remove auditoria existente se houver
      auditorias = auditorias.filter((a: any) => a.id !== id);
      
      // Adiciona nova auditoria
      auditorias.push(auditoriaFinalizada);
      
      localStorage.setItem('auditorias_finalizadas', JSON.stringify(auditorias));
      
      // Remover rascunho
      localStorage.removeItem(`auditoria_rascunho_${id}`);
      
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Auditoria finalizada com sucesso! Score: ${score}%`);
      
      // Redirecionar para página de resultados
      navigate(`/auditorias/resultado/${id}`);
      
    } catch (error) {
      console.error('Erro ao finalizar auditoria:', error);
      toast.error('Erro ao finalizar auditoria. Tente novamente.');
    } finally {
      setFinalizandoAuditoria(false);
    }
  };

  const renderPergunta = (pergunta: { id: string; texto: string; tipo: string; obrigatoria: boolean; categoria: string; peso: number; min?: number; max?: number; opcoes?: string[] }) => {
    const status = getStatusResposta(pergunta.id);
    
    return (
      <Card key={pergunta.id} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-base font-medium">
                {pergunta.texto}
                {pergunta.obrigatoria && <span className="text-red-500 ml-1">*</span>}
              </CardTitle>
              <CardDescription>
                Peso: {pergunta.peso} | Categoria: {pergunta.categoria}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {status === 'conforme' && <CheckCircle2 className="h-5 w-5 text-green-500 transition-all duration-200 ease-in-out hover:scale-105" />}
              {status === 'nao_conforme' && <XCircle className="h-5 w-5 text-red-500 transition-all duration-200 ease-in-out hover:scale-105" />}
              {status === 'pendente' && <AlertOctagon className="h-5 w-5 text-yellow-500 transition-all duration-200 ease-in-out hover:scale-105" />}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {pergunta.tipo === 'sim_nao' && (
            <div className="flex gap-2">
              <Button
                variant={respostas[pergunta.id] === 'sim' ? 'default' : 'outline'}
                onClick={() => handleResposta(pergunta.id, 'sim')}
                className="flex-1 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <CheckCircle2 className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                Sim
              </Button>
              <Button
                variant={respostas[pergunta.id] === 'nao' ? 'destructive' : 'outline'}
                onClick={() => handleResposta(pergunta.id, 'nao')}
                className="flex-1 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <XCircle className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
                Não
              </Button>
            </div>
          )}
          
          {pergunta.tipo === 'numerico' && (
            <div className="space-y-2">
              <input
                type="number"
                min={pergunta.min}
                max={pergunta.max}
                value={respostas[pergunta.id] as string || ''}
                onChange={(e) => handleResposta(pergunta.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Entre ${pergunta.min} e ${pergunta.max}`}
              />
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleCapturarFoto(pergunta.id)}
              className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Camera className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
              Foto
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleUploadEvidencia(pergunta.id)}
              className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FileText className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
              Evidência
            </Button>
          </div>

          {/* Exibir fotos anexadas */}
          {fotos.filter(foto => foto.perguntaId === pergunta.id).length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Fotos anexadas:</h4>
              <div className="grid grid-cols-2 gap-2">
                {fotos
                  .filter(foto => foto.perguntaId === pergunta.id)
                  .map(foto => (
                    <div key={foto.id} className="relative group">
                      <img 
                        src={foto.url} 
                        alt={foto.nome}
                        className="w-full h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                        onClick={() => window.open(foto.url, '_blank')}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removerFoto(foto.id)}
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="text-xs text-muted-foreground mt-1 truncate">
                        {foto.nome}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Exibir evidências anexadas */}
          {evidencias.filter(evidencia => evidencia.perguntaId === pergunta.id).length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Evidências anexadas:</h4>
              <div className="space-y-2">
                {evidencias
                  .filter(evidencia => evidencia.perguntaId === pergunta.id)
                  .map(evidencia => (
                    <div key={evidencia.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2 flex-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{evidencia.nome}</div>
                          <div className="text-xs text-muted-foreground">
                            {(evidencia.tamanho / 1024).toFixed(1)} KB
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(evidencia.url, '_blank')}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removerEvidencia(evidencia.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const calcularProgresso = () => {
    const totalPerguntas = auditoria.checklist.perguntas.length;
    const respondidas = Object.keys(respostas).length;
    return Math.round((respondidas / totalPerguntas) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header Mobile-First */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/auditorias')} className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="h-4 w-4 transition-all duration-200 ease-in-out" />
          </Button>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">{auditoria.titulo}</h1>
            <p className="text-sm text-muted-foreground">Execução da auditoria</p>
          </div>
        </div>
      </div>

      {/* Progresso */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progresso</span>
            <span className="text-sm text-muted-foreground">{calcularProgresso()}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${calcularProgresso()}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Perguntas por Categoria */}
      <Tabs defaultValue={categorias[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {categorias.map((categoria) => (
            <TabsTrigger key={categoria} value={categoria} className="text-xs sm:text-sm">
              {categoria}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categorias.map((categoria) => (
          <TabsContent key={categoria} value={categoria} className="space-y-4">
            {auditoria.checklist.perguntas
              .filter(p => p.categoria === categoria)
              .map(renderPergunta)}
          </TabsContent>
        ))}
      </Tabs>

      {/* Botões de Ação */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button 
          variant="outline" 
          onClick={salvarRascunho}
          disabled={salvandoRascunho}
          className="w-full sm:w-auto transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {salvandoRascunho ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Rascunho
            </>
          )}
        </Button>
        <Button 
          onClick={finalizarAuditoria}
          disabled={finalizandoAuditoria}
          className="w-full sm:w-auto transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {finalizandoAuditoria ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finalizando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Finalizar Auditoria
            </>
          )}
        </Button>
      </div>

      {/* Inputs ocultos para upload de arquivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFotoSelecionada}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFotoSelecionada}
        className="hidden"
      />
      <input
        ref={evidenciaInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
        onChange={handleEvidenciaSelecionada}
        className="hidden"
      />
    </div>
  );
}