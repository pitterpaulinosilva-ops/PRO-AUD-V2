import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  AlertOctagon,

  CalendarPlus,
  ArrowRight
} from 'lucide-react';

// Dados mockados para demonstração
const kpiData = {
  total_auditorias: 156,
  auditorias_pendentes: 23,
  taxa_conformidade: 87.5,
  nao_conformidades_abertas: 18,
  nao_conformidades_fechadas: 142
};

const tendenciaData = [
  { mes: 'Jan', auditorias: 12, conformidades: 10, nao_conformidades: 2, parcialmente_conformes: 1 },
  { mes: 'Fev', auditorias: 15, conformidades: 13, nao_conformidades: 1, parcialmente_conformes: 1 },
  { mes: 'Mar', auditorias: 18, conformidades: 16, nao_conformidades: 1, parcialmente_conformes: 1 },
  { mes: 'Abr', auditorias: 14, conformidades: 12, nao_conformidades: 2, parcialmente_conformes: 0 },
  { mes: 'Mai', auditorias: 20, conformidades: 17, nao_conformidades: 2, parcialmente_conformes: 1 },
  { mes: 'Jun', auditorias: 16, conformidades: 14, nao_conformidades: 1, parcialmente_conformes: 1 }
];

const setoresData = [
  { setor: 'RH', percentual_conformidade: 92, total_auditorias: 25 },
  { setor: 'Finanças', percentual_conformidade: 88, total_auditorias: 32 },
  { setor: 'TI', percentual_conformidade: 85, total_auditorias: 28 },
  { setor: 'Produção', percentual_conformidade: 83, total_auditorias: 45 }
];

const auditoresData = [
  { name: 'João Silva', value: 35, color: '#2563eb' },
  { name: 'Maria Santos', value: 28, color: '#16a34a' },
  { name: 'Pedro Costa', value: 22, color: '#ea580c' },
  { name: 'Ana Oliveira', value: 15, color: '#eab308' }
];

const alertas = [
  {
    id: '1',
    tipo: 'auditoria_vencimento',
    titulo: 'Auditoria ISO 9001 - Setor Produção',
    descricao: 'Vence em 3 dias',
    prioridade: 'alta',
    data_limite: '2024-01-15'
  },
  {
    id: '2',
    tipo: 'nao_conformidade_critica',
    titulo: 'NC Crítica - Segurança do Trabalho',
    descricao: 'Requer ação imediata',
    prioridade: 'alta'
  },
  {
    id: '3',
    tipo: 'acao_atrasada',
    titulo: 'Ação Corretiva em Atraso',
    descricao: 'Prazo vencido há 5 dias',
    prioridade: 'media'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Visão geral das auditorias e conformidades
          </p>
        </div>
        <Button className="transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <CalendarPlus className="mr-2 h-4 w-4 transition-all duration-200 ease-in-out" />
          Nova Auditoria
        </Button>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 transition-all duration-200 ease-in-out hover:bg-primary/20 hover:scale-105">
                  <ClipboardCheck className="h-5 w-5 text-primary transition-all duration-200 ease-in-out hover:scale-105" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Auditorias
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {kpiData.total_auditorias}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary/10 transition-all duration-200 ease-in-out hover:bg-secondary/20 hover:scale-105">
                  <Clock3 className="h-5 w-5 text-secondary transition-all duration-200 ease-in-out hover:scale-105" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Auditorias Pendentes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {kpiData.auditorias_pendentes}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 transition-all duration-200 ease-in-out hover:bg-primary/20 hover:scale-105">
                  <CheckCircle2 className="h-5 w-5 text-primary transition-all duration-200 ease-in-out hover:scale-105" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Taxa de Conformidade
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {kpiData.taxa_conformidade}%
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10 transition-all duration-200 ease-in-out hover:bg-destructive/20 hover:scale-105">
                  <AlertOctagon className="h-5 w-5 text-destructive transition-all duration-200 ease-in-out hover:scale-105" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    NCs Abertas
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {kpiData.nao_conformidades_abertas}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Tendência */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Auditorias</CardTitle>
            <CardDescription>
              Evolução mensal das auditorias realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tendenciaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="auditorias" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Auditorias"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conformidades vs Não Conformidades</CardTitle>
            <CardDescription>
              Comparativo mensal de resultados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tendenciaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conformidades" fill="#16a34a" name="Conformidades" />
                <Bar dataKey="nao_conformidades" fill="#dc2626" name="Não Conformidades" />
                <Bar dataKey="parcialmente_conformes" fill="#ea580c" name="Parcialmente Conformes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores por Setor e Desempenho dos Auditores */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conformidade por Setor</CardTitle>
            <CardDescription>
              Percentual de conformidade por departamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {setoresData.map((setor) => (
                <div key={setor.setor} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{setor.setor}</span>
                    <span className="text-sm text-muted-foreground">
                      ({setor.total_auditorias} auditorias)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${setor.percentual_conformidade}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{setor.percentual_conformidade}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desempenho dos Auditores</CardTitle>
            <CardDescription>
              Distribuição de auditorias por auditor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={auditoresData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {auditoresData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {auditoresData.map((auditor) => (
                <div key={auditor.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: auditor.color }}
                  />
                  <span className="text-sm">{auditor.name}</span>
                  <span className="text-sm text-muted-foreground">({auditor.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Críticos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-orange-500 transition-all duration-200 ease-in-out hover:scale-105" />
            Alertas Críticos
          </CardTitle>
          <CardDescription>
            Itens que requerem atenção imediata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={alerta.prioridade === 'alta' ? 'destructive' : 'secondary'}
                  >
                    {alerta.prioridade === 'alta' ? 'Alta' : 'Média'}
                  </Badge>
                  <div>
                    <p className="font-medium">{alerta.titulo}</p>
                    <p className="text-sm text-muted-foreground">{alerta.descricao}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <ArrowRight className="h-4 w-4 transition-all duration-200 ease-in-out" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}