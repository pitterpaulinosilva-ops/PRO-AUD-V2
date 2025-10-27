import { Button } from '@/components/ui/button';
import { Menu, Bell, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

export function Header() {
  const { toggle, isDesktop, isCollapsed, isOpen } = useSidebar();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Toggle button - responsive behavior */}
      <button
        type="button"
        onClick={toggle}
        className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={
          isDesktop 
            ? (isCollapsed ? "Expandir sidebar" : "Colapsar sidebar")
            : (isOpen ? "Fechar sidebar" : "Abrir sidebar")
        }
      >
        <span className="sr-only">
          {isDesktop 
            ? (isCollapsed ? "Expandir sidebar" : "Colapsar sidebar")
            : (isOpen ? "Fechar sidebar" : "Abrir sidebar")
          }
        </span>
        
        {/* Different icons based on device and state */}
        {isDesktop ? (
          isCollapsed ? (
            <PanelLeftOpen className="h-6 w-6 transition-all duration-200 ease-in-out" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-6 w-6 transition-all duration-200 ease-in-out" aria-hidden="true" />
          )
        ) : (
          <Menu className="h-6 w-6 transition-all duration-200 ease-in-out" aria-hidden="true" />
        )}
      </button>

      {/* Separator - only show on mobile/tablet */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Bell className="h-5 w-5 transition-all duration-200 ease-in-out" />
            <span className="sr-only">Notificações</span>
          </Button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          {/* User profile */}
          <div className="flex items-center gap-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
            <span className="hidden lg:flex lg:items-center">
              <span className="ml-2 text-sm font-medium leading-6 text-gray-900">
                Usuário
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}