import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiActivity, 
  FiBarChart2, 
  FiSettings
} from 'react-icons/fi'

/**
 * Elementos de navegación del bottom bar
 */
const navItems = [
  { path: '/dashboard', icon: FiHome, label: 'Inicio' },
  { path: '/pacientes', icon: FiUsers, label: 'Pacientes' },
  { path: '/sesiones', icon: FiActivity, label: 'Sesiones' },
  { path: '/estadisticas', icon: FiBarChart2, label: 'Stats' },
  { path: '/configuracion', icon: FiSettings, label: 'Config' }
]

/**
 * Componente BottomNavigation
 * Navegación inferior para dispositivos móviles
 */
function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center py-3 px-2 flex-1
              transition-all duration-200
              ${isActive 
                ? 'text-blue-600 border-t-2 border-blue-600' 
                : 'text-slate-500 hover:text-blue-600'
              }
            `}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavigation
