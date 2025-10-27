import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

function LayoutContent() {
  const { isDesktop, isCollapsed, isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Dynamic main content area */}
      <div 
        className={`
          transition-all duration-300 ease-in-out
          ${isDesktop 
            ? (isCollapsed ? 'lg:pl-16' : 'lg:pl-64') 
            : 'lg:pl-0'
          }
        `}
      >
        <Header />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Backdrop is now handled by the Sidebar component */}
    </div>
  );
}

export function Layout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}