import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiActivity, 
  FiBarChart2, 
  FiSettings,
  FiStar,
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
 * Navegación lateral moderna con gradientes indigo
 */
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-screen w-72 bg-gradient-to-b from-blue-600 to-blue-700
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col shadow-xl
        `}
      >
        {/* Header */}
        <div className="relative px-8 py-6 border-b border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 bg-white/20 rounded-xl backdrop-blur-sm">
                <FiStar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">PiensaMom</h1>
                <p className="text-xs text-blue-200">Sistema Médico</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg lg:hidden transition-all"
              aria-label="Cerrar menú"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto" role="navigation" aria-label="Navegación principal">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${isActive 
                  ? 'bg-white/20 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/30">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">Sistema Activo</p>
              <p className="text-xs text-blue-200 truncate">Conectado</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
