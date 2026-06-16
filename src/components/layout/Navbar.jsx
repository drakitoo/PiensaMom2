import { FiMenu, FiBell, FiUser } from 'react-icons/fi'

/**
 * Componente Navbar
 * Barra de navegación superior con diseño minimalista
 */
function Navbar({ pageTitle, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        {/* Botón menú móvil y título */}
        <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg lg:hidden transition-colors"
            aria-label="Abrir menú de navegación"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-gray-900 truncate">{pageTitle}</h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-1 lg:gap-2">
          {/* Notificaciones */}
          <button 
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Ver notificaciones"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>

          {/* Perfil de usuario */}
          <button 
            className="flex items-center gap-2 p-2 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
            aria-label="Menú de usuario"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block group-hover:text-gray-900">Dr. Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
