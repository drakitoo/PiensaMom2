/**
 * Componente StatCard
 * Tarjeta para mostrar estadísticas con diseño minimalista elegante
 */
function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'slate' }) {
  const colors = {
    slate: 'bg-slate-50 text-slate-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    violet: 'bg-violet-50 text-violet-600'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5 hover:border-gray-200 transition-all hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 truncate">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-3 text-xs ${trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              <span className="font-medium">{trend >= 0 ? '+' : ''}{trend}%</span>
              <span className="text-gray-400">vs semana</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg flex-shrink-0 ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
