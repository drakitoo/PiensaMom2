/**
 * Componente StatCard
 * Tarjeta para mostrar estadísticas con diseño moderno elegante
 */
function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'indigo' }) {
  const colors = {
    indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600',
    orange: 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600',
    pink: 'bg-gradient-to-br from-pink-50 to-pink-100 text-pink-600'
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/50 p-6 hover:border-indigo-200 transition-all hover:shadow-lg group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent truncate">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-2 truncate">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className={`flex items-center gap-2 mt-4 text-sm ${trend >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
              <span className="font-semibold">{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
              <span className="text-slate-400">vs semana</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg flex-shrink-0 shadow-sm group-hover:shadow-md transition-all ${colors[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
