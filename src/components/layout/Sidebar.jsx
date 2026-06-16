import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiActivity, 
  FiBarChart2, 
  FiSettings,
  FiZap,
  FiX
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
 * Navegación lateral fija con diseño minimalista
 */
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          border-r border-gray-100
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center justify-center w-9 h-9 bg-slate-900 rounded-lg">
              <FiZap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 tracking-tight">PiensaMom</h1>
              <p className="text-xs text-gray-400">Sistema de Pacientes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 lg:hidden"
            aria-label="Cerrar menú"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-3" role="navigation" aria-label="Navegación principal">
          <ul className="space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-slate-50 text-slate-900 border-l-2 border-slate-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Información del dispositivo */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div>
              <p className="text-xs font-medium text-gray-700">Estado</p>
              <p className="text-xs text-gray-500">Sistema operativo</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
