/**
 * Componente Badge reutilizable
 * Para mostrar estados y etiquetas con diseño minimalista
 */
function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-orange-100 text-orange-700',
    danger: 'bg-red-100 text-red-700'
  }

  return (
    <span 
      className={`
        inline-flex items-center px-2 py-1 rounded text-xs font-medium
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
