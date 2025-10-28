import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, FileText, Download, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { carregarAuditoriaFinalizada, inicializarDadosLocais, Pergunta } from '@/data/mockData';

interface Foto {
  id: string;
  url: string;
  nome: string;
  perguntaId: string;
}

interface Evidencia {
  id: string;
  url: string;
  nome: string;
  tipo: string;
  perguntaId: string;
}

interface Resposta {
  perguntaId: string;
  valor: string | number;
  observacoes?: string;
}

interface AuditoriaFinalizada {
  id: string;
  titulo: string;
  checklist: string;
  auditor: string;
  local: string;
  dataFinalizacao: string;
  score: number;
  totalPerguntas: number;
  perguntasRespondidas: number;
  perguntasConformes: number;
  perguntasNaoConformes: number;
  respostas: Resposta[];
  fotos: Foto[];
  evidencias: Evidencia[];
  perguntas: Pergunta[];
}

export function ResultadoAuditoria() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [auditoria, setAuditoria] = useState<AuditoriaFinalizada | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarResultadoAuditoria = (auditoriaId: string) => {
      try {
        const auditoriaEncontrada = carregarAuditoriaFinalizada(auditoriaId);
        
        if (auditoriaEncontrada) {
          setAuditoria(auditoriaEncontrada);
        } else {
          toast.error('Auditoria não encontrada');
          navigate('/auditorias');
        }
      } catch (error) {
        console.error('Erro ao carregar auditoria:', error);
        toast.error('Erro ao carregar dados da auditoria');
      } finally {
        setLoading(false);
      }
    };

    inicializarDadosLocais();
    if (id) {
      carregarResultadoAuditoria(id);
    }
  }, [id, navigate]);



  const getStatusColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusText = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Satisfatório';
    return 'Insatisfatório';
  };

  const getResposta = (perguntaId: string) => {
    return auditoria?.respostas.find(r => r.perguntaId === perguntaId);
  };

  const getFotosPergunta = (perguntaId: string) => {
    return auditoria?.fotos.filter(f => f.perguntaId === perguntaId) || [];
  };

  const getEvidenciasPergunta = (perguntaId: string) => {
    return auditoria?.evidencias.filter(e => e.perguntaId === perguntaId) || [];
  };

  const gerarRelatorio = () => {
    toast.info('Funcionalidade de relatório será implementada em breve');
  };

  const voltarParaExecucao = () => {
    navigate('/execucao');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando resultado da auditoria...</p>
        </div>
      </div>
    );
  }

  if (!auditoria) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Auditoria não encontrada</p>
          <Button onClick={voltarParaExecucao} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Execução
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={voltarParaExecucao}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resultado da Auditoria</h1>
            <p className="text-gray-600">{auditoria.titulo}</p>
          </div>
        </div>
        <Button onClick={gerarRelatorio}>
          <FileText className="h-4 w-4 mr-2" />
          Gerar Relatório
        </Button>
      </div>

      {/* Resumo da Auditoria */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumo da Auditoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full ${getStatusColor(auditoria.score)} flex items-center justify-center mx-auto mb-2`}>
                <span className="text-2xl font-bold text-white">{auditoria.score}%</span>
              </div>
              <p className="text-sm text-gray-600">Score Final</p>
              <Badge variant={auditoria.score >= 80 ? 'default' : auditoria.score >= 60 ? 'secondary' : 'destructive'}>
                {getStatusText(auditoria.score)}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{auditoria.perguntasRespondidas}</div>
              <p className="text-sm text-gray-600">de {auditoria.totalPerguntas}</p>
              <p className="text-xs text-gray-500">Perguntas Respondidas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{auditoria.perguntasConformes}</div>
              <p className="text-sm text-gray-600">Conformes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{auditoria.perguntasNaoConformes}</div>
              <p className="text-sm text-gray-600">Não Conformes</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Checklist:</strong> {auditoria.checklist}</p>
              <p><strong>Auditor:</strong> {auditoria.auditor}</p>
            </div>
            <div>
              <p><strong>Local:</strong> {auditoria.local}</p>
              <p><strong>Data de Finalização:</strong> {new Date(auditoria.dataFinalizacao).toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes das Respostas */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes das Respostas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {auditoria.perguntas.map((pergunta, index) => {
              const resposta = getResposta(pergunta.id);
              const fotos = getFotosPergunta(pergunta.id);
              const evidencias = getEvidenciasPergunta(pergunta.id);

              return (
                <div key={pergunta.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {index + 1}. {String(pergunta.texto)}
                      </h3>
                      {pergunta.obrigatoria && (
                        <Badge variant="outline" className="text-xs">
                          Obrigatória
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {resposta ? (
                        pergunta.tipo === 'sim_nao' ? (
                          resposta.valor === 'sim' ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Conforme
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="h-3 w-3 mr-1" />
                              Não Conforme
                            </Badge>
                          )
                        ) : (
                          <Badge variant="secondary">
                            Respondida
                          </Badge>
                        )
                      ) : (
                        <Badge variant="outline">
                          Não Respondida
                        </Badge>
                      )}
                    </div>
                  </div>

                  {resposta && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Resposta:</strong> {resposta.valor}
                      </p>
                      {resposta.observacoes && (
                        <p className="text-sm text-gray-600">
                          <strong>Observações:</strong> {resposta.observacoes}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Fotos */}
                  {fotos.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Fotos:</p>
                      <div className="flex flex-wrap gap-2">
                        {fotos.map((foto) => (
                          <div key={foto.id} className="relative">
                            <img
                              src={foto.url}
                              alt={foto.nome}
                              className="w-20 h-20 object-cover rounded-lg border"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute -top-2 -right-2 h-6 w-6 p-0"
                              onClick={() => window.open(foto.url, '_blank')}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Evidências */}
                  {evidencias.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Evidências:</p>
                      <div className="space-y-2">
                        {evidencias.map((evidencia) => (
                          <div key={evidencia.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{evidencia.nome}</span>
                              <Badge variant="outline" className="text-xs">
                                {evidencia.tipo}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(evidencia.url, '_blank')}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Baixar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}