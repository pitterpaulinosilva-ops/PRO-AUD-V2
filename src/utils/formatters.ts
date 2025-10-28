/**
 * Utilitários de formatação centralizados
 * Elimina duplicação de código entre componentes
 */

/**
 * Formata uma data para o padrão brasileiro (dd/mm/aaaa)
 * @param dateString - String da data no formato ISO ou similar
 * @returns Data formatada no padrão brasileiro
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

/**
 * Formata um valor monetário para o padrão brasileiro
 * @param value - Valor numérico
 * @returns Valor formatado como moeda brasileira
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Formata uma porcentagem
 * @param value - Valor numérico (0-100)
 * @returns Valor formatado como porcentagem
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

/**
 * Mapeia status de auditoria para labels legíveis
 * @param status - Status da auditoria
 * @returns Label formatada do status
 */
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    planejada: 'Planejada',
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
    ativa: 'Ativa',
    inativa: 'Inativa',
    rascunho: 'Rascunho',
    publicado: 'Publicado',
    pendente: 'Pendente',
    resolvida: 'Resolvida',
    fechada: 'Fechada'
  };
  return labels[status] || status;
};

/**
 * Mapeia tipos de auditoria para labels legíveis
 * @param tipo - Tipo da auditoria
 * @returns Label formatada do tipo
 */
export const getTipoLabel = (tipo: string): string => {
  const labels: Record<string, string> = {
    interna: 'Interna',
    externa: 'Externa',
    certificacao: 'Certificação',
    fornecedor: 'Fornecedor'
  };
  return labels[tipo] || tipo;
};

/**
 * Mapeia prioridades para labels legíveis
 * @param prioridade - Prioridade da não conformidade
 * @returns Label formatada da prioridade
 */
export const getPrioridadeLabel = (prioridade: string): string => {
  const labels: Record<string, string> = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
    critica: 'Crítica'
  };
  return labels[prioridade] || prioridade;
};

/**
 * Mapeia categorias para labels legíveis
 * @param categoria - Categoria da não conformidade
 * @returns Label formatada da categoria
 */
export const getCategoriaLabel = (categoria: string): string => {
  const labels: Record<string, string> = {
    processo: 'Processo',
    produto: 'Produto',
    sistema: 'Sistema',
    documentacao: 'Documentação',
    treinamento: 'Treinamento',
    equipamento: 'Equipamento',
    ambiente: 'Ambiente',
    seguranca: 'Segurança'
  };
  return labels[categoria] || categoria;
};