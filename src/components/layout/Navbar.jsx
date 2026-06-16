import { FiMenu, FiBell, FiUser, FiArrowRight } from 'react-icons/fi'

/**
 * Componente Navbar
 * Barra de navegación superior moderna con efectos
 */
function Navbar({ pageTitle, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
        {/* Botón menú móvil y título */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg lg:hidden transition-all"
            aria-label="Abrir menú de navegación"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent truncate">
                {pageTitle}
              </h1>
              <FiArrowRight className="w-4 h-4 text-slate-300 hidden sm:block" />
            </div>
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Notificaciones */}
          <button 
            className="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all"
            aria-label="Ver notificaciones"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-br from-pink-500 to-red-500 rounded-full shadow-lg" />
          </button>

          {/* Perfil de usuario */}
          <button 
            className="flex items-center gap-2 p-2 pr-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all group"
            aria-label="Menú de usuario"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block group-hover:text-blue-600">Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
