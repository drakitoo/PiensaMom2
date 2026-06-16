import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiActivity, 
  FiBarChart2, 
  FiSettings,
  FiZap
} from 'react-icons/fi'

/**
 * Elementos de navegación del sidebar
 */
const navItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/pacientes', icon: FiUsers, label: 'Pacientes' },
  { path: '/sesiones', icon: FiActivity, label: 'Sesiones' },
  { path: '/estadisticas', icon: FiBarChart2, label: 'Estadísticas' },
  { path: '/configuracion', icon: FiSettings, label: 'Configuración' }
]

/**
 * Componente Sidebar
 * Navegación lateral fija con enlaces a las diferentes secciones
 */
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl">
            <FiZap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">RefleAct</h1>
            <p className="text-xs text-gray-500">Sistema de Reflejos</p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="p-4" role="navigation" aria-label="Navegación principal">
          <ul className="space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Información del dispositivo */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <div>
              <p className="text-xs font-medium text-gray-700">ESP32</p>
              <p className="text-xs text-gray-500">Desconectado</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
