import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Play, FileText, Users, Calendar } from 'lucide-react';

export function DetalhesAuditoria() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados mockados
  const auditoria = {
    id: id,
    titulo: 'Auditoria ISO 9001 - Setor Produção',
    tipo: 'interna',
    status: 'planejada',
    data_inicio: '2024-02-15',
    data_fim: '2024-02-16',
    auditor_lider: 'João Silva',
    setor: 'Produção',
    norma: 'ISO 9001:2015',
    progresso: 0,
    escopo: 'Auditoria dos processos de produção conforme requisitos da ISO 9001:2015',
    objetivos: 'Verificar conformidade dos processos produtivos',
    criterios: 'Requisitos da norma ISO 9001:2015 seções 7 e 8'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/auditorias')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{auditoria.titulo}</h1>
            <p className="text-muted-foreground">Detalhes da auditoria</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/auditorias/${id}/editar`)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          {auditoria.status === 'planejada' && (
            <Button onClick={() => navigate(`/execucao/${id}`)}>
              <Play className="mr-2 h-4 w-4" />
              Executar
            </Button>
          )}
        </div>
      </div>

      {/* Informações Básicas */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge
                  variant={
                    auditoria.status === 'Concluída'
                      ? 'default'
                      : auditoria.status === 'Em Andamento'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {auditoria.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tipo</label>
              <p className="mt-1">Auditoria Interna</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Norma</label>
              <p className="mt-1">{auditoria.norma}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Setor</label>
              <p className="mt-1">{auditoria.setor}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cronograma
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Data de Início</label>
              <p className="mt-1">{new Date(auditoria.data_inicio).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Data de Fim</label>
              <p className="mt-1">{new Date(auditoria.data_fim).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Progresso</label>
              <div className="mt-1 flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${auditoria.progresso}%` }}
                  />
                </div>
                <span className="text-sm">{auditoria.progresso}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipe e Escopo */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Equipe Auditora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Auditor Líder</label>
              <p className="mt-1 font-medium">{auditoria.auditor_lider}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Escopo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{auditoria.escopo}</p>
          </CardContent>
        </Card>
      </div>

      {/* Objetivos e Critérios */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Objetivos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{auditoria.objetivos}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critérios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{auditoria.criterios}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}