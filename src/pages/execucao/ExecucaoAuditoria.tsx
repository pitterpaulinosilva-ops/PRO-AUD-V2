import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle2, XCircle, AlertOctagon, Camera, FileText } from 'lucide-react';

export function ExecucaoAuditoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [respostas, setRespostas] = useState<Record<string, string | number | boolean>>({});

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
            <Button variant="outline" size="sm" className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Camera className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
              Foto
            </Button>
            <Button variant="outline" size="sm" className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <FileText className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
              Evidência
            </Button>
          </div>
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
        <Button variant="outline" className="w-full sm:w-auto transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Salvar Rascunho
        </Button>
        <Button className="w-full sm:w-auto transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Finalizar Auditoria
        </Button>
      </div>
    </div>
  );
}