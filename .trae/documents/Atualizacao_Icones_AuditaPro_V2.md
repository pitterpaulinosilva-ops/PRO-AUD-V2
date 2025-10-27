# Documento de Requisitos - Atualização de Ícones AuditaPro V2

## 1. Visão Geral do Projeto

O AuditaPro V2 é uma aplicação moderna de gestão de auditorias que utiliza React com TypeScript e a biblioteca Lucide React para ícones. Este documento define os requisitos para atualização e modernização do sistema de ícones, mantendo a identidade visual e melhorando a experiência do usuário.

**Objetivo**: Modernizar o sistema de ícones mantendo consistência visual, funcionalidade e acessibilidade em todas as resoluções e dispositivos.

## 2. Análise do Estado Atual

### 2.1 Biblioteca Atual
- **Biblioteca Principal**: Lucide React
- **Estilo**: Ícones outline com traço consistente
- **Tamanhos Padrão**: 16px, 20px, 24px
- **Cores Principais**: 
  - Azul primário: `#2563eb`
  - Verde: `#16a34a`
  - Cinza: `#6b7280`, `#374151`
  - Vermelho: `#dc2626`

### 2.2 Inventário de Ícones por Contexto

#### Sidebar/Navegação Principal
| Ícone Atual | Componente | Contexto | Estado |
|-------------|------------|----------|---------|
| Home | Dashboard | Navegação principal | Ativo/Inativo |
| ClipboardList | Auditorias | Navegação principal | Ativo/Inativo |
| FileText | Checklists | Navegação principal | Ativo/Inativo |
| Play | Executar Auditorias | Navegação principal | Ativo/Inativo |
| AlertTriangle | Não Conformidades | Navegação principal | Ativo/Inativo |
| BarChart | Relatórios | Navegação principal | Ativo/Inativo |
| Settings | Configurações | Navegação principal | Ativo/Inativo |

#### Header/Controles
| Ícone Atual | Função | Contexto | Estados |
|-------------|---------|----------|---------|
| Menu/X | Toggle Mobile | Header mobile | Normal/Ativo |
| PanelLeftOpen/PanelLeftClose | Toggle Desktop | Header desktop | Expandido/Colapsado |
| Bell | Notificações | Header | Normal/Com notificação |
| BarChart3 | Logo | Branding | Fixo |

#### Ações/Funcionalidades
| Categoria | Ícones | Contexto | Estados |
|-----------|--------|----------|---------|
| Status | CheckCircle, XCircle, AlertCircle, Clock | Indicadores | Sucesso/Erro/Aviso/Pendente |
| Ações | Plus, Edit, Trash2, Eye, Search | Botões de ação | Normal/Hover/Disabled |
| Navegação | ArrowLeft, ChevronLeft, ChevronRight | Navegação | Normal/Hover |
| Mídia | Camera, FileText, Download | Upload/Download | Normal/Loading |
| Usuário | User, Lock, Shield | Perfil/Segurança | Normal/Ativo |

## 3. Requisitos de Atualização

### 3.1 Identidade Visual e Coesão
- **R001**: Manter o estilo outline da Lucide React para consistência
- **R002**: Preservar a hierarquia visual existente (primário, secundário, terciário)
- **R003**: Manter a paleta de cores atual do projeto
- **R004**: Garantir que novos ícones sigam o mesmo peso de traço (1.5px-2px)

### 3.2 Modernização e Tendências
- **R005**: Atualizar para versões mais recentes dos ícones Lucide React
- **R006**: Implementar ícones com melhor legibilidade em telas de alta densidade
- **R007**: Adicionar variações filled para estados ativos quando apropriado
- **R008**: Considerar micro-animações sutis para transições de estado

### 3.3 Funcionalidade e Usabilidade
- **R009**: Manter a semântica visual de cada ícone (não alterar significado)
- **R010**: Garantir contraste mínimo de 3:1 com o fundo
- **R011**: Preservar a funcionalidade de tooltip em ícones colapsados
- **R012**: Manter acessibilidade com aria-labels apropriados

### 3.4 Consistência de Estilo
- **R013**: Padronizar tamanhos: 16px (pequeno), 20px (médio), 24px (grande)
- **R014**: Manter espaçamento consistente entre ícone e texto (12px)
- **R015**: Aplicar border-radius consistente em containers de ícones (6px-8px)
- **R016**: Usar a mesma curva de transição para todos os estados (200ms ease-in-out)

### 3.5 Responsividade e Proporções
- **R017**: Garantir legibilidade em dispositivos móveis (mínimo 24px touch target)
- **R018**: Implementar escalonamento automático baseado em viewport
- **R019**: Otimizar para telas Retina/HiDPI (SVG nativo)
- **R020**: Manter proporções 1:1 para todos os ícones

### 3.6 Estados Visuais
- **R021**: Implementar estado normal com opacidade 100%
- **R022**: Estado hover com mudança de cor e/ou opacidade (85%)
- **R023**: Estado ativo com cor primária e background destacado
- **R024**: Estado disabled com opacidade reduzida (40%)
- **R025**: Estado loading com animação sutil quando aplicável

## 4. Especificações Técnicas

### 4.1 Implementação de Estados

#### Estados de Navegação (Sidebar)
```css
/* Estado Normal */
.nav-icon {
  color: #6b7280;
  transition: color 200ms ease-in-out;
}

/* Estado Hover */
.nav-icon:hover {
  color: #374151;
}

/* Estado Ativo */
.nav-icon.active {
  color: #2563eb;
}

/* Estado Colapsado */
.nav-icon.collapsed {
  width: 24px;
  height: 24px;
}
```

#### Estados de Ação
```css
/* Botão Primário */
.action-icon.primary {
  color: #ffffff;
  background: #2563eb;
}

/* Botão Secundário */
.action-icon.secondary {
  color: #2563eb;
  border: 1px solid #2563eb;
}

/* Estado Disabled */
.action-icon:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
```

### 4.2 Mapeamento de Novos Ícones

#### Atualizações Prioritárias
| Ícone Atual | Novo Ícone Sugerido | Justificativa |
|-------------|---------------------|---------------|
| ClipboardList | ClipboardCheck | Melhor representação de auditoria |
| BarChart | BarChart3 | Versão mais moderna e detalhada |
| AlertTriangle | AlertOctagon | Maior destaque para não conformidades |
| Play | PlayCircle | Melhor visibilidade e contexto |

#### Novos Ícones Necessários
| Função | Ícone Sugerido | Contexto | Prioridade |
|--------|----------------|----------|------------|
| Filtros | Filter | Listas e tabelas | Alta |
| Exportar | Download | Relatórios | Alta |
| Histórico | History | Auditoria | Média |
| Anexos | Paperclip | Documentos | Média |
| Aprovação | CheckCheck | Workflow | Baixa |

### 4.3 Animações e Transições

#### Micro-animações Permitidas
- **Hover**: Mudança suave de cor (200ms)
- **Loading**: Rotação sutil para ícones de carregamento
- **Toggle**: Transição entre estados de sidebar (300ms)
- **Success/Error**: Fade-in para feedback visual

#### Animações Proibidas
- Animações contínuas que distraem
- Transições muito longas (>500ms)
- Efeitos de bounce ou elastic
- Animações que consomem muita CPU

## 5. Guia de Implementação

### 5.1 Fases de Implementação

#### Fase 1: Navegação Principal (Prioridade Alta)
- Atualizar ícones do sidebar
- Implementar estados ativos/inativos
- Testar responsividade

#### Fase 2: Ações e Controles (Prioridade Alta)
- Atualizar ícones de botões
- Implementar estados hover/disabled
- Validar acessibilidade

#### Fase 3: Indicadores e Status (Prioridade Média)
- Atualizar ícones de status
- Implementar feedback visual
- Testar em diferentes contextos

#### Fase 4: Refinamentos (Prioridade Baixa)
- Micro-animações
- Otimizações de performance
- Documentação final

### 5.2 Critérios de Aceitação

#### Funcionalidade
- [ ] Todos os ícones mantêm sua função original
- [ ] Estados visuais funcionam corretamente
- [ ] Responsividade em todos os dispositivos
- [ ] Acessibilidade WCAG 2.1 AA

#### Visual
- [ ] Consistência de estilo em todo o projeto
- [ ] Paleta de cores preservada
- [ ] Proporções adequadas em todas as resoluções
- [ ] Transições suaves entre estados

#### Performance
- [ ] Tempo de carregamento não afetado
- [ ] Animações fluidas (60fps)
- [ ] Sem vazamentos de memória
- [ ] Compatibilidade cross-browser

## 6. Documentação de Mudanças

### 6.1 Registro de Alterações
Todas as mudanças devem ser documentadas incluindo:
- Ícone anterior vs novo ícone
- Justificativa da mudança
- Impacto na usabilidade
- Testes realizados

### 6.2 Guia de Estilo Atualizado
- Paleta de cores para ícones
- Tamanhos e espaçamentos padrão
- Estados visuais e suas aplicações
- Exemplos de uso correto e incorreto

### 6.3 Componentes Afetados
Lista completa dos arquivos que serão modificados:
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Header.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/auditorias/*.tsx`
- `src/pages/checklists/*.tsx`
- E demais páginas com ícones

## 7. Validação e Testes

### 7.1 Testes Visuais
- Verificação em diferentes resoluções (320px a 1920px)
- Teste em dispositivos móveis, tablets e desktop
- Validação de contraste e legibilidade
- Teste com usuários para feedback de usabilidade

### 7.2 Testes Técnicos
- Performance de renderização
- Compatibilidade com navegadores
- Acessibilidade com leitores de tela
- Responsividade em diferentes orientações

### 7.3 Métricas de Sucesso
- Tempo de reconhecimento de ícones < 2 segundos
- Taxa de erro de navegação < 5%
- Satisfação do usuário > 85%
- Performance mantida ou melhorada

## 8. Cronograma e Recursos

### 8.1 Estimativa de Tempo
- **Análise e Planejamento**: 1 dia
- **Implementação Fase 1**: 2 dias
- **Implementação Fase 2**: 2 dias
- **Implementação Fase 3**: 1 dia
- **Testes e Refinamentos**: 1 dia
- **Documentação**: 1 dia

**Total Estimado**: 8 dias úteis

### 8.2 Recursos Necessários
- 1 Desenvolvedor Frontend (React/TypeScript)
- 1 Designer UX/UI (validação visual)
- Acesso à biblioteca Lucide React atualizada
- Ferramentas de teste de acessibilidade

## 9. Considerações Finais

Esta atualização de ícones visa modernizar a interface do AuditaPro V2 mantendo a consistência e funcionalidade existentes. O foco está em melhorar a experiência do usuário através de ícones mais claros, estados visuais bem definidos e melhor responsividade.

A implementação deve ser gradual e bem testada para garantir que não haja regressões na usabilidade ou performance da aplicação.