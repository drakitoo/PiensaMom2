import { FiUsers, FiActivity, FiClock, FiAward } from 'react-icons/fi'
import StatCard from '../components/cards/StatCard'
import LineChart from '../components/charts/LineChart'
import Badge from '../components/ui/Badge'
import { estadisticasGenerales, evolucionSemanal, sesiones } from '../data/mockData'

/**
 * Página Dashboard
 * Vista principal con resumen de estadísticas y actividad reciente
 */
function Dashboard() {
  // Obtener últimas sesiones completadas
  const ultimasSesiones = sesiones
    .filter(s => s.estado === 'completada')
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Tarjetas de estadísticas */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Estadísticas generales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Pacientes Registrados"
            value={estadisticasGenerales.totalPacientes}
            subtitle="Adultos mayores activos"
            icon={FiUsers}
            color="indigo"
            trend={5.2}
          />
          <StatCard
            title="Sesiones Realizadas"
            value={estadisticasGenerales.totalSesiones}
            subtitle="Este mes"
            icon={FiActivity}
            color="teal"
            trend={12.8}
          />
          <StatCard
            title="Tiempo Promedio"
            value={`${estadisticasGenerales.tiempoPromedio} ms`}
            subtitle="Tiempo de reacción"
            icon={FiClock}
            color="orange"
            trend={-8.5}
          />
          <StatCard
            title="Mejor Resultado"
            value={`${estadisticasGenerales.mejorTiempo} ms`}
            subtitle="Récord registrado"
            icon={FiAward}
            color="pink"
          />
        </div>
      </section>

      {/* Gráfico de evolución y tabla de sesiones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de evolución semanal */}
        <section className="lg:col-span-2" aria-labelledby="chart-heading">
          <h2 id="chart-heading" className="sr-only">Evolución semanal</h2>
          <LineChart
            data={evolucionSemanal}
            xKey="dia"
            lines={[
              { key: 'promedio', color: '#1E293B', name: 'Tiempo Promedio (ms)' }
            ]}
            title="Evolución Semanal del Tiempo de Reacción"
            height={320}
          />
        </section>

        {/* Resumen rápido */}
        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="sr-only">Resumen de rendimiento</h2>
          <div className="bg-white rounded-lg border border-gray-100 p-6 h-full">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Resumen</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Tasa de Aciertos</span>
                <span className="text-lg font-bold text-emerald-600">{estadisticasGenerales.tasaAciertos}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Mejora Promedio</span>
                <span className="text-lg font-bold text-blue-600">+{estadisticasGenerales.mejoraPromedio}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Sesiones Hoy</span>
                <span className="text-lg font-bold text-orange-600">{evolucionSemanal[evolucionSemanal.length - 1].sesiones}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Pacientes Activos</span>
                <span className="text-lg font-bold text-violet-600">{estadisticasGenerales.totalPacientes}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Tabla de últimas sesiones */}
      <section aria-labelledby="sessions-heading">
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 id="sessions-heading" className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Últimas Sesiones
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
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hora
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo de Reacción
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aciertos
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ultimasSesiones.map((sesion) => (
                  <tr key={sesion.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {sesion.pacienteNombre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(sesion.fecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {sesion.hora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {sesion.tiempoReaccion} ms
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {sesion.aciertos}/{sesion.intentos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Completada</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
