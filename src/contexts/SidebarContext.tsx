import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  collapse: () => void;
  expand: () => void;
  setAutoCollapse: (enabled: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [autoCollapseEnabled, setAutoCollapseEnabled] = useState(true);
  
  // Refs para controle de timers e debounce
  const autoCollapseTimer = useRef<NodeJS.Timeout | null>(null);
  const resizeDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isInitialized = useRef(false);

  // Função para limpar timer de auto-collapse
  const clearAutoCollapseTimer = useCallback(() => {
    if (autoCollapseTimer.current) {
      clearTimeout(autoCollapseTimer.current);
      autoCollapseTimer.current = null;
    }
  }, []);

  // Detectar tamanho da tela com debounce
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;
    const mobile = width < 768;
    const tablet = width >= 768 && width < 1024;
    const desktop = width >= 1024;

    setIsMobile(mobile);
    setIsTablet(tablet);
    setIsDesktop(desktop);

    // Auto-ajustar sidebar baseado no tamanho da tela apenas na inicialização
    if (!isInitialized.current) {
      if (mobile || tablet) {
        setIsOpen(false);
        setIsCollapsed(false);
      } else if (desktop) {
        setIsOpen(true);
        setIsCollapsed(false);
      }
      isInitialized.current = true;
    }
  }, []);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeDebounceTimer.current) {
      clearTimeout(resizeDebounceTimer.current);
    }
    resizeDebounceTimer.current = setTimeout(checkScreenSize, 150);
  }, [checkScreenSize]);

  // Auto-collapse timer otimizado para desktop
  useEffect(() => {
    clearAutoCollapseTimer();
    
    if (isDesktop && autoCollapseEnabled && isOpen && !isCollapsed) {
      autoCollapseTimer.current = setTimeout(() => {
        setIsCollapsed(true);
      }, 3000);
    }

    return clearAutoCollapseTimer;
  }, [isDesktop, autoCollapseEnabled, isOpen, isCollapsed, clearAutoCollapseTimer]);

  // Event listeners otimizados
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isMobile || isTablet) && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    
    // Verificar tamanho inicial apenas uma vez
    if (!isInitialized.current) {
      checkScreenSize();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      clearAutoCollapseTimer();
      if (resizeDebounceTimer.current) {
        clearTimeout(resizeDebounceTimer.current);
      }
    };
  }, [handleResize, checkScreenSize, isMobile, isTablet, isOpen, clearAutoCollapseTimer]);

  // Controle de scroll do body
  useEffect(() => {
    if ((isMobile || isTablet) && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isTablet, isOpen]);

  const toggle = useCallback(() => {
    clearAutoCollapseTimer();
    if (isMobile || isTablet) {
      setIsOpen(prev => !prev);
    } else {
      setIsCollapsed(prev => !prev);
    }
  }, [isMobile, isTablet, clearAutoCollapseTimer]);

  const open = useCallback(() => {
    clearAutoCollapseTimer();
    setIsOpen(true);
    if (isDesktop) {
      setIsCollapsed(false);
    }
  }, [isDesktop, clearAutoCollapseTimer]);

  const close = useCallback(() => {
    clearAutoCollapseTimer();
    setIsOpen(false);
  }, [clearAutoCollapseTimer]);

  const collapse = useCallback(() => {
    clearAutoCollapseTimer();
    if (isDesktop) {
      setIsCollapsed(true);
    }
  }, [isDesktop, clearAutoCollapseTimer]);

  const expand = useCallback(() => {
    clearAutoCollapseTimer();
    if (isDesktop) {
      setIsCollapsed(false);
    }
  }, [isDesktop, clearAutoCollapseTimer]);

  const setAutoCollapse = useCallback((enabled: boolean) => {
    setAutoCollapseEnabled(enabled);
    if (!enabled) {
      clearAutoCollapseTimer();
    }
  }, [clearAutoCollapseTimer]);

  const value: SidebarContextType = {
    isOpen,
    isCollapsed,
    isMobile,
    isTablet,
    isDesktop,
    toggle,
    open,
    close,
    collapse,
    expand,
    setAutoCollapse,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}