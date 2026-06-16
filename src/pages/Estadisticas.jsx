import { FiTrendingUp, FiTrendingDown, FiTarget, FiClock, FiUsers, FiAward } from 'react-icons/fi'
import StatCard from '../components/cards/StatCard'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'
import { 
  evolucionSemanal, 
  evolucionMensual, 
  rendimientoPorPaciente,
  estadisticasGenerales 
} from '../data/mockData'

/**
 * Página de Estadísticas
 * Visualización de gráficos y métricas de rendimiento con diseño minimalista
 */
function Estadisticas() {
  // Preparar datos para el gráfico de rendimiento por paciente
  const datosRendimiento = rendimientoPorPaciente.map(p => ({
    nombre: p.nombre,
    tiempoActual: p.tiempoActual
  }))

  // Datos de comparativa inicial vs actual
  const datosComparativa = rendimientoPorPaciente.map(p => ({
    nombre: p.nombre,
    inicial: p.tiempoInicial,
    actual: p.tiempoActual
  }))

  return (
    <div className="space-y-6">
      {/* Tarjetas de estadísticas principales */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Estadísticas principales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Tiempo Promedio"
            value={`${estadisticasGenerales.tiempoPromedio} ms`}
            subtitle="General de todos"
            icon={FiClock}
            color="indigo"
            trend={-8.5}
          />
          <StatCard
            title="Mejor Tiempo"
            value={`${estadisticasGenerales.mejorTiempo} ms`}
            subtitle="Récord registrado"
            icon={FiTarget}
            color="teal"
          />
          <StatCard
            title="Tasa de Aciertos"
            value={`${estadisticasGenerales.tasaAciertos}%`}
            subtitle="Promedio general"
            icon={FiAward}
            color="orange"
            trend={3}
          />
          <StatCard
            title="Mejora Promedio"
            value={`+${estadisticasGenerales.mejoraPromedio}%`}
            subtitle="De todos los pacientes"
            icon={FiTrendingUp}
            color="pink"
          />
        </div>
      </section>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolución semanal */}
        <div className="bg-white rounded-lg border border-gray-100">
          <LineChart
            data={evolucionSemanal}
            xKey="dia"
            lines={[
              { key: 'promedio', color: '#1E293B', name: 'Tiempo Promedio (ms)' }
            ]}
            title="Evolución Semanal"
            height={300}
          />
        </div>

        {/* Evolución mensual */}
        <div className="bg-white rounded-lg border border-gray-100">
          <LineChart
            data={evolucionMensual}
            xKey="mes"
            lines={[
              { key: 'promedio', color: '#10B981', name: 'Tiempo Promedio (ms)' }
            ]}
            title="Evolución Mensual"
            height={300}
          />
        </div>
      </div>

      {/* Ranking de pacientes */}
      <div className="bg-white rounded-lg border border-gray-100">
        <BarChart
          data={datosRendimiento}
          xKey="nombre"
          bars={[
            { key: 'tiempoActual', color: '#1E293B', name: 'Tiempo de Reacción (ms)' }
          ]}
          title="Ranking de Pacientes por Tiempo de Reacción"
          height={350}
          layout="vertical"
        />
      </div>

      {/* Comparativa inicial vs actual */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Progreso Individual: Inicial vs Actual
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inicial
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mejora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rendimientoPorPaciente.map((paciente, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{paciente.nombre}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {paciente.tiempoInicial} ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {paciente.tiempoActual} ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-emerald-600">
                      -{(paciente.tiempoInicial - paciente.tiempoActual)} ms
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${paciente.mejora * 5}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-emerald-600">
                        +{paciente.mejora}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leyenda informativa */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h4 className="font-medium text-slate-900 mb-3 text-sm uppercase tracking-wide">Interpretación de Resultados</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mt-1 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-900">Excelente</span>
              <p className="text-slate-600 text-xs">Menor a 400ms</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-slate-600 rounded-full mt-1 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-900">Bueno</span>
              <p className="text-slate-600 text-xs">400-500ms</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full mt-1 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-900">Regular</span>
              <p className="text-slate-600 text-xs">500-600ms</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0" />
            <div>
              <span className="font-medium text-slate-900">Mejora Requerida</span>
              <p className="text-slate-600 text-xs">Mayor a 600ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estadisticas
