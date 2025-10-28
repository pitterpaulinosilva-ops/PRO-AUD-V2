/**
 * Constantes centralizadas do sistema AuditaPro V2
 * Contém objetos de cores, opções de filtro e configurações globais
 */

// Cores para diferentes status
export const STATUS_COLORS = {
  planejada: 'bg-blue-100 text-blue-800',
  em_andamento: 'bg-yellow-100 text-yellow-800',
  concluida: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
  ativo: 'bg-green-100 text-green-800',
  inativo: 'bg-gray-100 text-gray-800',
  aberta: 'bg-red-100 text-red-800',
  fechada: 'bg-green-100 text-green-800'
} as const;

// Cores para tipos de auditoria
export const TIPO_COLORS = {
  interna: 'bg-blue-100 text-blue-800',
  externa: 'bg-purple-100 text-purple-800',
  certificacao: 'bg-green-100 text-green-800',
  seguimento: 'bg-orange-100 text-orange-800'
} as const;

// Cores para prioridades
export const PRIORIDADE_COLORS = {
  alta: 'bg-red-100 text-red-800',
  media: 'bg-yellow-100 text-yellow-800',
  baixa: 'bg-green-100 text-green-800'
} as const;

// Cores para categorias
export const CATEGORIA_COLORS = {
  qualidade: 'bg-blue-100 text-blue-800',
  meio_ambiente: 'bg-green-100 text-green-800',
  seguranca: 'bg-red-100 text-red-800',
  ti: 'bg-purple-100 text-purple-800',
  financeiro: 'bg-yellow-100 text-yellow-800',
  rh: 'bg-orange-100 text-orange-800'
} as const;

// Opções de filtro para auditorias
export const STATUS_AUDITORIA_OPTIONS = [
  { value: 'todos', label: 'Todos os Status' },
  { value: 'planejada', label: 'Planejada' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'concluida', label: 'Concluída' },
  { value: 'cancelada', label: 'Cancelada' }
] as const;

export const TIPO_AUDITORIA_OPTIONS = [
  { value: 'todos', label: 'Todos os Tipos' },
  { value: 'interna', label: 'Interna' },
  { value: 'externa', label: 'Externa' },
  { value: 'certificacao', label: 'Certificação' },
  { value: 'seguimento', label: 'Seguimento' }
] as const;

// Opções de filtro para checklists
export const CATEGORIA_OPTIONS = [
  { value: 'todos', label: 'Todas as Categorias' },
  { value: 'qualidade', label: 'Qualidade' },
  { value: 'meio_ambiente', label: 'Meio Ambiente' },
  { value: 'seguranca', label: 'Segurança' },
  { value: 'ti', label: 'TI' },
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'rh', label: 'RH' }
] as const;

// Opções de filtro para prioridades
export const PRIORIDADE_OPTIONS = [
  { value: 'todos', label: 'Todas as Prioridades' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' }
] as const;

// Opções de filtro para não conformidades
export const NC_STATUS_OPTIONS = [
  { value: 'todos', label: 'Todos os Status' },
  { value: 'aberta', label: 'Aberta' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'fechada', label: 'Fechada' }
] as const;

export const NC_TIPO_OPTIONS = [
  { value: 'todos', label: 'Todos os Tipos' },
  { value: 'nao_conformidade', label: 'Não Conformidade' },
  { value: 'plano_correcao', label: 'Plano de Correção' }
] as const;

// Configurações de paginação
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_VISIBLE_PAGES: 5
} as const;

// Configurações de busca
export const SEARCH_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
  MAX_RESULTS: 100
} as const;

// Configurações de upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_FILES_PER_UPLOAD: 5
} as const;