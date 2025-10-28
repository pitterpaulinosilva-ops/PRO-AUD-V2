import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import {
  BarChart3,
  ClipboardCheck,
  FileText,
  PlayCircle,
  AlertOctagon,
  Settings,
  Home,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Gerenciar Auditorias', href: '/auditorias', icon: ClipboardCheck },
  { name: 'Checklists', href: '/checklists', icon: FileText },
  { name: 'Executar Auditorias', href: '/execucao', icon: PlayCircle },
  { name: 'Não Conformidades', href: '/nao-conformidades', icon: AlertOctagon },
  { name: 'Relatórios', href: '/relatorios', icon: BarChart3 },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
];

export const Sidebar = React.memo(() => {
  const location = useLocation();
  const { 
    isOpen, 
    isCollapsed, 
    isMobile, 
    isTablet, 
    isDesktop, 
    close, 
    expand, 
    collapse 
  } = useSidebar();
  
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mínima distância para considerar um swipe
  const minSwipeDistance = 50;

  // Debounced hover handlers para desktop
  const handleMouseEnter = useCallback(() => {
    if (!isDesktop || !isCollapsed) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      expand();
    }, 100); // Pequeno delay para evitar hover acidental
  }, [isDesktop, isCollapsed, expand]);

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      collapse();
    }, 300); // Delay maior para dar tempo do usuário navegar
  }, [isDesktop, collapse]);

  // Cleanup de timers
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Focus management otimizado para acessibilidade
  useEffect(() => {
    if (isOpen && (isMobile || isTablet) && sidebarRef.current) {
      const firstFocusableElement = sidebarRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusableElement) {
        // Pequeno delay para garantir que o elemento esteja visível
        setTimeout(() => {
          firstFocusableElement.focus();
        }, 100);
      }
    }
  }, [isOpen, isMobile, isTablet]);

  // Touch handlers otimizados para mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe && (isMobile || isTablet)) {
      close();
    }
    
    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, isMobile, isTablet, close]);

  // Memoizar navegação para evitar re-renders desnecessários
  const navigationList = useMemo(() => {
    return navigation.map((item) => {
      const Icon = item.icon;
      const isActive = location.pathname === item.href || 
                      (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
      
      return (
        <li key={item.href}>
          <Link
            to={item.href}
            onClick={isMobile || isTablet ? close : undefined}
            className={cn(
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out",
              isActive
                ? "bg-blue-100 text-blue-900 shadow-sm border border-blue-200"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm",
              isDesktop && isCollapsed ? "justify-center px-3" : "px-2",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            )}
            title={isDesktop && isCollapsed ? item.name : undefined}
          >
            <Icon
              className={cn(
                "flex-shrink-0 transition-all duration-200 ease-in-out",
                isActive 
                  ? "text-blue-600 scale-105" 
                  : "text-gray-400 group-hover:text-gray-600 group-hover:scale-105",
                isDesktop && isCollapsed ? "h-6 w-6" : "mr-3 h-5 w-5"
              )}
            />
            {(!isDesktop || !isCollapsed) && item.name}
          </Link>
        </li>
      );
    });
  }, [location.pathname, isDesktop, isCollapsed, isMobile, isTablet, close]);

  // Renderização para desktop
  if (isDesktop) {
    return (
      <div
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-start"
          )}>
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">AuditaPro</h1>
                <p className="text-xs text-gray-500">V2.0</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigationList}
          </ul>
        </nav>

        {/* Toggle button - Collapse/Expand */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          {!isCollapsed ? (
            <button
              onClick={collapse}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ChevronLeft className="w-4 h-4 mr-2 transition-all duration-200 ease-in-out" />
              Recolher
            </button>
          ) : (
            <button
              onClick={expand}
              className="flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Expandir sidebar"
            >
              <ChevronRight className="w-4 h-4 transition-all duration-200 ease-in-out" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Renderização para mobile/tablet (overlay)
  if ((isMobile || isTablet) && isOpen) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity duration-300"
          onClick={close}
          aria-hidden="true"
        />
        
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">AuditaPro</h1>
                <p className="text-xs text-gray-500">V2.0</p>
              </div>
            </div>
            <button
              onClick={close}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Fechar sidebar"
            >
              <X className="w-6 h-6 transition-all duration-200 ease-in-out" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <ul className="space-y-1">
              {navigationList}
            </ul>
          </nav>
        </div>
      </>
    );
  }

  return null;
});