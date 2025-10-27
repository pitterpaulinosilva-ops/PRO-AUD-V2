// Tipos principais do sistema AuditaPro V2

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  perfil: 'admin' | 'gestor' | 'auditor' | 'auditado';
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Auditoria {
  id: string;
  nome: string;
  codigo: string;
  tipo: 'interna' | 'externa';
  escopo: string;
  objetivos: string;
  data_programada: string;
  auditor_id: string;
  setor_id: string;
  checklist_id: string;
  status: 'planejada' | 'em_andamento' | 'concluida' | 'cancelada';
  created_at: string;
  updated_at: string;
  auditor?: Usuario;
  setor?: Setor;
  checklist?: Checklist;
}

export interface Checklist {
  id: string;
  nome: string;
  versao: string;
  norma_id: string;
  descricao?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
  norma?: Norma;
  perguntas?: Pergunta[];
}

export interface Pergunta {
  id: string;
  checklist_id: string;
  texto: string;
  tipo_resposta: 'conforme' | 'nao_conforme' | 'supera' | 'parcialmente_conforme' | 'nao_se_aplica' | 'escala' | 'multipla_escolha';
  requisito_norma?: string;
  ordem: number;
  obrigatoria: boolean;
  opcoes_resposta?: string[];
  created_at: string;
}

export interface ExecucaoAuditoria {
  id: string;
  auditoria_id: string;
  auditor_id: string;
  data_inicio: string;
  data_fim?: string;
  status: 'iniciada' | 'em_andamento' | 'finalizada';
  observacoes_gerais?: string;
  created_at: string;
  auditoria?: Auditoria;
  auditor?: Usuario;
  respostas?: Resposta[];
}

export interface Resposta {
  id: string;
  execucao_id: string;
  pergunta_id: string;
  resposta: string;
  observacoes?: string;
  evidencias?: string;
  created_at: string;
  pergunta?: Pergunta;
}

export interface NaoConformidade {
  id: string;
  execucao_id: string;
  pergunta_id: string;
  descricao: string;
  classificacao: 'critica' | 'maior' | 'menor';
  status: 'aberta' | 'em_tratamento' | 'fechada';
  setor_afetado_id: string;
  acao_corretiva?: string;
  prazo_correcao?: string;
  responsavel_id?: string;
  created_at: string;
  updated_at: string;
  execucao?: ExecucaoAuditoria;
  pergunta?: Pergunta;
  setor_afetado?: Setor;
  responsavel?: Usuario;
}

export interface Setor {
  id: string;
  nome: string;
  codigo: string;
  descricao?: string;
  setor_pai_id?: string;
  created_at: string;
  setor_pai?: Setor;
  subsetores?: Setor[];
}

export interface Norma {
  id: string;
  nome: string;
  codigo: string;
  versao: string;
  descricao?: string;
  ativa: boolean;
  created_at: string;
}

// Tipos para Dashboard
export interface KPIData {
  total_auditorias: number;
  auditorias_pendentes: number;
  taxa_conformidade: number;
  nao_conformidades_abertas: number;
  nao_conformidades_fechadas: number;
}

export interface GraficoTendencia {
  mes: string;
  auditorias: number;
  conformidades: number;
  nao_conformidades: number;
  parcialmente_conformes: number;
}

export interface IndicadorSetor {
  setor: string;
  percentual_conformidade: number;
  total_auditorias: number;
}

export interface DesempenhoAuditor {
  auditor: string;
  total_auditorias: number;
  media_tempo: number;
  taxa_conformidade: number;
}

export interface Alerta {
  id: string;
  tipo: 'auditoria_vencimento' | 'nao_conformidade_critica' | 'acao_atrasada';
  titulo: string;
  descricao: string;
  prioridade: 'alta' | 'media' | 'baixa';
  data_limite?: string;
  link?: string;
}

// Tipos para formulários
export interface NovaAuditoriaForm {
  nome: string;
  codigo: string;
  tipo: 'interna' | 'externa';
  escopo: string;
  objetivos: string;
  data_programada: string;
  auditor_id: string;
  setor_id: string;
  checklist_id: string;
}

export interface NovoChecklistForm {
  nome: string;
  versao: string;
  norma_id: string;
  descricao?: string;
}

export interface NovaPerguntaForm {
  texto: string;
  tipo_resposta: Pergunta['tipo_resposta'];
  requisito_norma?: string;
  obrigatoria: boolean;
  opcoes_resposta?: string[];
}