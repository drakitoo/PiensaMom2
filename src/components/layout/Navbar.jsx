import { FiMenu, FiBell, FiUser } from 'react-icons/fi'

/**
 * Componente Navbar
 * Barra de navegación superior con título de página y acciones
 */
function Navbar({ pageTitle, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 lg:px-6">
        {/* Botón menú móvil y título */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg lg:hidden"
            aria-label="Abrir menú de navegación"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
            <p className="text-sm text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Notificaciones */}
          <button 
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            aria-label="Ver notificaciones"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Perfil de usuario */}
          <button 
            className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            aria-label="Menú de usuario"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium hidden sm:block">Dr. Administrador</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
