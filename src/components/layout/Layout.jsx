import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

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
 * Estructura principal de la aplicación con Sidebar y Navbar
 */
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  
  const pageTitle = pageTitles[location.pathname] || 'RefleAct'

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <Navbar 
          pageTitle={pageTitle} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-4 lg:p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="px-4 py-3 text-center text-xs text-gray-500 border-t border-gray-200 bg-white">
          RefleAct v1.0.0 - Sistema de Medición de Reflejos - Proyecto Universitario
        </footer>
      </div>
    </div>
  )
}

export default Layout
