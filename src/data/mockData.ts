// Dados mockados para testes locais do AuditaPro V2

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  avatar?: string;
}

export interface Norma {
  id: string;
  nome: string;
  descricao?: string;
}

export interface Checklist {
  id: string;
  nome: string;
  descricao: string;
  norma_id: string;
  categoria: string;
  versao: string;
  ativo: boolean;
  status: 'ativo' | 'inativo' | 'rascunho';
  dataCreacao: string;
  ultimaAtualizacao: string;
  perguntas: Pergunta[];
}

export interface Pergunta {
  id: string;
  texto: string;
  tipo: 'multipla_escolha' | 'sim_nao' | 'texto_livre' | 'numerica' | 'data' | 'arquivo' | 'avaliacao' | 'conformidade';
  obrigatoria: boolean;
  peso: number;
  categoria: string;
  opcoes?: string[];
  valor_minimo?: number;
  valor_maximo?: number;
  permite_evidencia: boolean;
  observacoes?: string;
}

export interface Auditoria {
  id: string;
  titulo: string;
  descricao: string;
  checklistId: string;
  checklist: string;
  auditor: string;
  auditorId: string;
  local: string;
  dataInicio: string;
  dataFim?: string;
  status: 'planejada' | 'em_andamento' | 'concluida' | 'cancelada';
  prioridade: 'baixa' | 'media' | 'alta';
  departamento: string;
}

export interface AuditoriaExecucao {
  id: string;
  auditoriaId: string;
  titulo: string;
  checklist: string;
  auditor: string;
  local: string;
  dataInicio: string;
  status: 'em_andamento' | 'pausada' | 'finalizada';
  progresso: number;
  perguntas: Pergunta[];
  respostas: Resposta[];
  fotos: Foto[];
  evidencias: Evidencia[];
}

export interface Resposta {
  perguntaId: string;
  valor: string | number;
  observacoes?: string;
  dataResposta: string;
}

export interface Foto {
  id: string;
  url: string;
  nome: string;
  perguntaId: string;
  dataUpload: string;
  tamanho: number;
}

export interface Evidencia {
  id: string;
  url: string;
  nome: string;
  tipo: string;
  perguntaId: string;
  dataUpload: string;
  tamanho: number;
}

export interface AuditoriaFinalizada {
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

export interface NaoConformidade {
  id: string;
  titulo: string;
  descricao: string;
  auditoriaId: string;
  auditoria: string;
  perguntaId: string;
  pergunta: string;
  gravidade: 'baixa' | 'media' | 'alta' | 'critica';
  status: 'aberta' | 'em_tratamento' | 'fechada';
  responsavel: string;
  prazoCorrecao: string;
  dataIdentificacao: string;
  dataFechamento?: string;
  acaoCorretiva?: string;
  evidencias: string[];
}

// DADOS MOCKADOS

export const usuarios: Usuario[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@empresa.com',
    cargo: 'Auditor Sênior',
    departamento: 'Qualidade'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    cargo: 'Coordenadora de Auditoria',
    departamento: 'Qualidade'
  },
  {
    id: '3',
    nome: 'Pedro Oliveira',
    email: 'pedro.oliveira@empresa.com',
    cargo: 'Auditor Júnior',
    departamento: 'Qualidade'
  }
];

export const checklists: Checklist[] = [
  {
    id: '1',
    nome: 'Auditoria de Segurança do Trabalho',
    descricao: 'Checklist para auditoria de segurança e saúde ocupacional',
    categoria: 'Segurança',
    versao: '2.1',
    status: 'ativo',
    dataCreacao: '2024-01-15',
    ultimaAtualizacao: '2024-02-10',
    perguntas: [
      {
        id: 'p1',
        texto: 'Os colaboradores estão utilizando EPIs adequados?',
        tipo: 'sim_nao',
        obrigatoria: true,
        categoria: 'EPIs'
      },
      {
        id: 'p2',
        texto: 'As saídas de emergência estão desobstruídas?',
        tipo: 'sim_nao',
        obrigatoria: true,
        categoria: 'Emergência'
      },
      {
        id: 'p3',
        texto: 'Quantos extintores foram verificados?',
        tipo: 'numerico',
        obrigatoria: false,
        categoria: 'Equipamentos',
        valorMinimo: 0,
        valorMaximo: 50
      },
      {
        id: 'p4',
        texto: 'A sinalização de segurança está adequada?',
        tipo: 'sim_nao',
        obrigatoria: true,
        categoria: 'Sinalização'
      },
      {
        id: 'p5',
        texto: 'Os equipamentos de proteção coletiva estão funcionando?',
        tipo: 'sim_nao',
        obrigatoria: true,
        categoria: 'EPCs'
      }
    ]
  },
  {
    id: '2',
    nome: 'Auditoria de Qualidade ISO 9001',
    descricao: 'Checklist baseado nos requisitos da ISO 9001:2015',
    categoria: 'Qualidade',
    versao: '1.5',
    status: 'ativo',
    dataCreacao: '2024-01-20',
    ultimaAtualizacao: '2024-02-05',
    perguntas: [
      {
        id: 'q1',
        texto: 'A documentação do processo está atualizada?',
        tipo: 'sim_nao',
        obrigatoria: true,
        categoria: 'Documentação'
      },
      {
        id: 'q2',
        texto: 'Os registros de qualidade estão sendo mantidos?',
        tipo: 'sim_nao',
        obrigatoria: true,
        categoria: 'Registros'
      },
      {
        id: 'q3',
        texto: 'Quantas não conformidades foram identificadas no último mês?',
        tipo: 'numerico',
        obrigatoria: false,
        categoria: 'Não Conformidades',
        valorMinimo: 0,
        valorMaximo: 100
      }
    ]
  }
];

export const auditorias: Auditoria[] = [
  {
    id: '1',
    titulo: 'Auditoria de Segurança - Fábrica A',
    descricao: 'Auditoria mensal de segurança do trabalho na unidade fabril A',
    checklistId: '1',
    checklist: 'Auditoria de Segurança do Trabalho',
    auditor: 'João Silva',
    auditorId: '1',
    local: 'Fábrica A - Setor Produção',
    dataInicio: '2024-02-15',
    dataFim: '2024-02-15',
    status: 'concluida',
    prioridade: 'alta',
    departamento: 'Produção'
  },
  {
    id: '2',
    titulo: 'Auditoria ISO 9001 - Administrativo',
    descricao: 'Auditoria de qualidade no setor administrativo',
    checklistId: '2',
    checklist: 'Auditoria de Qualidade ISO 9001',
    auditor: 'Maria Santos',
    auditorId: '2',
    local: 'Prédio Administrativo',
    dataInicio: '2024-02-20',
    status: 'em_andamento',
    prioridade: 'media',
    departamento: 'Administrativo'
  },
  {
    id: '3',
    titulo: 'Auditoria de Segurança - Almoxarifado',
    descricao: 'Verificação das condições de segurança no almoxarifado',
    checklistId: '1',
    checklist: 'Auditoria de Segurança do Trabalho',
    auditor: 'Pedro Oliveira',
    auditorId: '3',
    local: 'Almoxarifado Central',
    dataInicio: '2024-02-25',
    status: 'planejada',
    prioridade: 'media',
    departamento: 'Logística'
  }
];

export const auditoriasExecucao: AuditoriaExecucao[] = [
  {
    id: '2',
    auditoriaId: '2',
    titulo: 'Auditoria ISO 9001 - Administrativo',
    checklist: 'Auditoria de Qualidade ISO 9001',
    auditor: 'Maria Santos',
    local: 'Prédio Administrativo',
    dataInicio: '2024-02-20T08:00:00',
    status: 'em_andamento',
    progresso: 60,
    perguntas: checklists[1].perguntas,
    respostas: [
      {
        perguntaId: 'q1',
        valor: 'sim',
        observacoes: 'Documentação atualizada conforme versão 2.1',
        dataResposta: '2024-02-20T09:15:00'
      },
      {
        perguntaId: 'q2',
        valor: 'não',
        observacoes: 'Alguns registros estão desatualizados',
        dataResposta: '2024-02-20T09:30:00'
      }
    ],
    fotos: [
      {
        id: 'f1',
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3VtZW50YcOnw6NvPC90ZXh0Pjwvc3ZnPg==',
        nome: 'documentacao_processo.jpg',
        perguntaId: 'q1',
        dataUpload: '2024-02-20T09:15:00',
        tamanho: 245760
      }
    ],
    evidencias: [
      {
        id: 'e1',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO4CjIgMCBvYmoKPDwKL0xlbmd0aCAzIDAgUgo+PgpzdHJlYW0KQNC4xOTQgVEQgcmVnaXN0cm9zIGRlIHF1YWxpZGFkZQplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjw8Ci9MZW5ndGggMTAKPj4Kc3RyZWFtCjEwCmVuZHN0cmVhbQplbmRvYmoKCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDIgMCBSCj4+CmVuZG9iagoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+PgplbmRvYmoKCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDEwOSAwMDAwMCBuIAowMDAwMDAwMTU4IDAwMDAwIG4gCjAwMDAwMDAyMTUgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA0Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgoyOTQKJSVFT0Y=',
        nome: 'relatorio_registros.pdf',
        tipo: 'PDF',
        perguntaId: 'q2',
        dataUpload: '2024-02-20T09:30:00',
        tamanho: 512000
      }
    ]
  }
];

export const auditoriasFinalizadas: AuditoriaFinalizada[] = [
  {
    id: '1',
    titulo: 'Auditoria de Segurança - Fábrica A',
    checklist: 'Auditoria de Segurança do Trabalho',
    auditor: 'João Silva',
    local: 'Fábrica A - Setor Produção',
    dataFinalizacao: '2024-02-15T16:30:00',
    score: 85,
    totalPerguntas: 5,
    perguntasRespondidas: 5,
    perguntasConformes: 4,
    perguntasNaoConformes: 1,
    perguntas: checklists[0].perguntas,
    respostas: [
      {
        perguntaId: 'p1',
        valor: 'sim',
        observacoes: 'Todos os colaboradores utilizando EPIs corretamente',
        dataResposta: '2024-02-15T14:15:00'
      },
      {
        perguntaId: 'p2',
        valor: 'sim',
        observacoes: 'Saídas de emergência livres e sinalizadas',
        dataResposta: '2024-02-15T14:30:00'
      },
      {
        perguntaId: 'p3',
        valor: 12,
        observacoes: '12 extintores verificados e dentro da validade',
        dataResposta: '2024-02-15T15:00:00'
      },
      {
        perguntaId: 'p4',
        valor: 'não',
        observacoes: 'Algumas placas de sinalização estão desbotadas',
        dataResposta: '2024-02-15T15:30:00'
      },
      {
        perguntaId: 'p5',
        valor: 'sim',
        observacoes: 'Sistemas de ventilação funcionando adequadamente',
        dataResposta: '2024-02-15T16:00:00'
      }
    ],
    fotos: [
      {
        id: 'f2',
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVQSXM8L3RleHQ+PC9zdmc+',
        nome: 'epis_colaboradores.jpg',
        perguntaId: 'p1',
        dataUpload: '2024-02-15T14:15:00',
        tamanho: 189440
      },
      {
        id: 'f3',
        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbmFsaXphw6fDo288L3RleHQ+PC9zdmc+',
        nome: 'sinalizacao_desbotada.jpg',
        perguntaId: 'p4',
        dataUpload: '2024-02-15T15:30:00',
        tamanho: 167936
      }
    ],
    evidencias: [
      {
        id: 'e2',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO4CjIgMCBvYmoKPDwKL0xlbmd0aCAzIDAgUgo+PgpzdHJlYW0KQNC4xOTQgVEQgcmVsYXTDs3JpbyBkZSBleHRpbnRvcmVzCmVuZHN0cmVhbQplbmRvYmoKCjMgMCBvYmoKPDwKL0xlbmd0aCAxMAo+PgpzdHJlYW0KMTAKZW5kc3RyZWFtCmVuZG9iagoKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCgoyIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCj4+CmVuZG9iagoKeHJlZgowIDQKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMTA5IDAwMDAwIG4gCjAwMDAwMDAxNTggMDAwMDAgbiAKMDAwMDAwMDIxNSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDQKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjI5NAolJUVPRg==',
        nome: 'relatorio_extintores.pdf',
        tipo: 'PDF',
        perguntaId: 'p3',
        dataUpload: '2024-02-15T15:00:00',
        tamanho: 425984
      }
    ]
  }
];

export const naoConformidades: NaoConformidade[] = [
  {
    id: '1',
    titulo: 'Sinalização de Segurança Desbotada',
    descricao: 'Placas de sinalização de segurança estão desbotadas e com baixa visibilidade',
    auditoriaId: '1',
    auditoria: 'Auditoria de Segurança - Fábrica A',
    perguntaId: 'p4',
    pergunta: 'A sinalização de segurança está adequada?',
    gravidade: 'media',
    status: 'aberta',
    responsavel: 'Carlos Maintenance',
    prazoCorrecao: '2024-03-01',
    dataIdentificacao: '2024-02-15T15:30:00',
    evidencias: ['sinalizacao_desbotada.jpg']
  },
  {
    id: '2',
    titulo: 'Registros de Qualidade Desatualizados',
    descricao: 'Alguns registros de qualidade não estão sendo atualizados conforme procedimento',
    auditoriaId: '2',
    auditoria: 'Auditoria ISO 9001 - Administrativo',
    perguntaId: 'q2',
    pergunta: 'Os registros de qualidade estão sendo mantidos?',
    gravidade: 'alta',
    status: 'em_tratamento',
    responsavel: 'Ana Quality',
    prazoCorrecao: '2024-02-28',
    dataIdentificacao: '2024-02-20T09:30:00',
    acaoCorretiva: 'Implementar sistema de lembretes automáticos para atualização de registros',
    evidencias: ['relatorio_registros.pdf']
  }
];

// Funções utilitárias para simular operações de banco de dados

export const salvarAuditoriaFinalizada = (auditoria: AuditoriaFinalizada) => {
  const auditoriasSalvas = localStorage.getItem('auditorias_finalizadas');
  let auditorias: AuditoriaFinalizada[] = [];
  
  if (auditoriasSalvas) {
    auditorias = JSON.parse(auditoriasSalvas);
  }
  
  // Remove auditoria existente se houver
  auditorias = auditorias.filter(a => a.id !== auditoria.id);
  
  // Adiciona nova auditoria
  auditorias.push(auditoria);
  
  localStorage.setItem('auditorias_finalizadas', JSON.stringify(auditorias));
};

export const carregarAuditoriaFinalizada = (id: string): AuditoriaFinalizada | null => {
  const auditoriasSalvas = localStorage.getItem('auditorias_finalizadas');
  
  if (auditoriasSalvas) {
    const auditorias: AuditoriaFinalizada[] = JSON.parse(auditoriasSalvas);
    return auditorias.find(a => a.id === id) || null;
  }
  
  // Se não há dados no localStorage, retorna dados mockados
  return auditoriasFinalizadas.find(a => a.id === id) || null;
};

export const inicializarDadosLocais = () => {
  // Inicializa dados no localStorage se não existirem
  if (!localStorage.getItem('auditorias_finalizadas')) {
    localStorage.setItem('auditorias_finalizadas', JSON.stringify(auditoriasFinalizadas));
  }
  
  if (!localStorage.getItem('auditorias_execucao')) {
    localStorage.setItem('auditorias_execucao', JSON.stringify(auditoriasExecucao));
  }
  
  if (!localStorage.getItem('auditorias')) {
    localStorage.setItem('auditorias', JSON.stringify(auditorias));
  }
  
  if (!localStorage.getItem('checklists')) {
    localStorage.setItem('checklists', JSON.stringify(checklists));
  }
  
  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
  
  if (!localStorage.getItem('nao_conformidades')) {
    localStorage.setItem('nao_conformidades', JSON.stringify(naoConformidades));
  }
};

// Dados mockados para normas
export const normas: Norma[] = [
  { id: '1', nome: 'ISO 9001:2015 - Gestão da Qualidade' },
  { id: '2', nome: 'ISO 14001:2015 - Gestão Ambiental' },
  { id: '3', nome: 'ISO 45001:2018 - Saúde e Segurança' },
  { id: '4', nome: 'ISO 27001:2013 - Segurança da Informação' }
];

// Dados mockados para categorias
export const categorias = [
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

// Funções CRUD para Checklists
export const salvarChecklist = (checklist: Checklist) => {
  const checklistsSalvos = localStorage.getItem('checklists');
  let checklists: Checklist[] = [];
  
  if (checklistsSalvos) {
    checklists = JSON.parse(checklistsSalvos);
  }
  
  // Se é um novo checklist, gera um ID
  if (!checklist.id) {
    checklist.id = `checklist_${Date.now()}`;
  }
  
  // Remove checklist existente se houver
  checklists = checklists.filter(c => c.id !== checklist.id);
  
  // Adiciona checklist atualizado
  checklists.push(checklist);
  
  localStorage.setItem('checklists', JSON.stringify(checklists));
  return checklist;
};

export const carregarChecklists = (): Checklist[] => {
  const checklistsSalvos = localStorage.getItem('checklists');
  
  if (checklistsSalvos) {
    return JSON.parse(checklistsSalvos);
  }
  
  // Se não há dados no localStorage, retorna dados mockados
  return checklists;
};

export const carregarChecklist = (id: string): Checklist | null => {
  const checklists = carregarChecklists();
  return checklists.find(c => c.id === id) || null;
};

export const deletarChecklist = (id: string): boolean => {
  const checklistsSalvos = localStorage.getItem('checklists');
  
  if (checklistsSalvos) {
    let checklists: Checklist[] = JSON.parse(checklistsSalvos);
    const checklistIndex = checklists.findIndex(c => c.id === id);
    
    if (checklistIndex !== -1) {
      checklists.splice(checklistIndex, 1);
      localStorage.setItem('checklists', JSON.stringify(checklists));
      return true;
    }
  }
  
  return false;
};

// Funções CRUD para Auditorias
export const salvarAuditoria = (auditoria: Auditoria) => {
  const auditoriasSalvas = localStorage.getItem('auditorias');
  let auditorias: Auditoria[] = [];
  
  if (auditoriasSalvas) {
    auditorias = JSON.parse(auditoriasSalvas);
  }
  
  // Se é uma nova auditoria, gera um ID
  if (!auditoria.id) {
    auditoria.id = `auditoria_${Date.now()}`;
  }
  
  // Remove auditoria existente se houver
  auditorias = auditorias.filter(a => a.id !== auditoria.id);
  
  // Adiciona auditoria atualizada
  auditorias.push(auditoria);
  
  localStorage.setItem('auditorias', JSON.stringify(auditorias));
  return auditoria;
};

export const carregarAuditorias = (): Auditoria[] => {
  const auditoriasSalvas = localStorage.getItem('auditorias');
  
  if (auditoriasSalvas) {
    return JSON.parse(auditoriasSalvas);
  }
  
  // Se não há dados no localStorage, retorna dados mockados
  return auditorias;
};

export const carregarAuditoria = (id: string): Auditoria | null => {
  const auditorias = carregarAuditorias();
  return auditorias.find(a => a.id === id) || null;
};

export const deletarAuditoria = (id: string): boolean => {
  const auditoriasSalvas = localStorage.getItem('auditorias');
  
  if (auditoriasSalvas) {
    let auditorias: Auditoria[] = JSON.parse(auditoriasSalvas);
    const auditoriaIndex = auditorias.findIndex(a => a.id === id);
    
    if (auditoriaIndex !== -1) {
      auditorias.splice(auditoriaIndex, 1);
      localStorage.setItem('auditorias', JSON.stringify(auditorias));
      return true;
    }
  }
  
  return false;
};