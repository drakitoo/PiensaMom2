import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import BottomNavigation from './BottomNavigation'

/**
 * Mapeo de rutas a títulos de página
 */
const pageTitles = {
  '/dashboard': 'Dashboard',
  '/pacientes': 'Gestión de Pacientes',
  '/sesiones': 'Sesiones de Medición',
  '/estadisticas': 'Estadísticas',
  '/configuracion': 'Configuración'
}

/**
 * Componente Layout
 * Estructura principal minimalista con Sidebar y Navbar
 */
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
  const pageTitle = pageTitles[location.pathname] || 'PiensaMom'

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Visible solo en desktop */}
      <div className="hidden md:block">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar - Visible solo en tablets y desktop */}
        <div className="hidden md:block">
          <Navbar 
            pageTitle={pageTitle} 
            onMenuClick={() => setSidebarOpen(true)} 
          />
        </div>
        
        {/* Header móvil */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3">
          <h1 className="text-lg font-bold text-slate-900">{pageTitle}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
          </p>
        </div>

        {/* Main content - con padding extra en móvil para evitar bottom nav */}
        <main className="flex-1 p-3 md:p-6 bg-slate-50 pb-24 md:pb-6">
          <div className="animate-fade-in max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer - Visible solo en desktop */}
        <footer className="hidden md:block px-4 py-3 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
          <p>PiensaMom Sistema v1.0</p>
        </footer>
      </div>

      {/* Bottom Navigation - Solo en móviles */}
      <BottomNavigation />
    </div>
  )
}

export default Layout
