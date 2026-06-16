import { FiTrendingUp, FiTrendingDown, FiTarget, FiClock } from 'react-icons/fi'
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
 * Visualización de gráficos y métricas de rendimiento
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
      {/* Indicadores principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Tiempo Promedio General</span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiClock className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{estadisticasGenerales.tiempoPromedio} ms</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <FiTrendingDown className="w-4 h-4" />
            <span>8.5% mejor que el mes pasado</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Mejor Tiempo Registrado</span>
            <div className="p-2 bg-green-50 rounded-lg">
              <FiTarget className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{estadisticasGenerales.mejorTiempo} ms</p>
          <p className="text-sm text-gray-500 mt-2">Antonio López Fernández</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Tasa de Aciertos</span>
            <div className="p-2 bg-amber-50 rounded-lg">
              <FiTarget className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{estadisticasGenerales.tasaAciertos}%</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <FiTrendingUp className="w-4 h-4" />
            <span>+3% respecto al inicio</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Mejora Promedio</span>
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiTrendingUp className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600">+{estadisticasGenerales.mejoraPromedio}%</p>
          <p className="text-sm text-gray-500 mt-2">Todos los pacientes</p>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolución semanal */}
        <LineChart
          data={evolucionSemanal}
          xKey="dia"
          lines={[
            { key: 'promedio', color: '#2563EB', name: 'Tiempo Promedio (ms)' }
          ]}
          title="Evolución Semanal"
          height={300}
        />

        {/* Evolución mensual */}
        <LineChart
          data={evolucionMensual}
          xKey="mes"
          lines={[
            { key: 'promedio', color: '#22C55E', name: 'Tiempo Promedio (ms)' }
          ]}
          title="Evolución Mensual"
          height={300}
        />
      </div>

      {/* Ranking de pacientes */}
      <BarChart
        data={datosRendimiento}
        xKey="nombre"
        bars={[
          { key: 'tiempoActual', color: '#2563EB', name: 'Tiempo de Reacción (ms)' }
        ]}
        title="Ranking de Pacientes por Tiempo de Reacción"
        height={350}
        layout="vertical"
      />

      {/* Comparativa inicial vs actual */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Progreso Individual: Tiempo Inicial vs Actual
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiempo Inicial
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiempo Actual
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mejora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
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
                    <span className="text-sm font-medium text-green-600">
                      -{(paciente.tiempoInicial - paciente.tiempoActual)} ms
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[100px]">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${paciente.mejora * 5}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-green-600">
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-medium text-blue-900 mb-2">Interpretación de Resultados</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><span className="font-medium text-green-600">Verde:</span> Excelente - Tiempo menor a 400ms</li>
          <li><span className="font-medium text-blue-600">Azul:</span> Bueno - Tiempo entre 400-500ms</li>
          <li><span className="font-medium text-amber-600">Amarillo:</span> Regular - Tiempo entre 500-600ms</li>
          <li><span className="font-medium text-red-600">Rojo:</span> Necesita mejorar - Tiempo mayor a 600ms</li>
        </ul>
      </div>
    </div>
  )
}

export default Estadisticas
