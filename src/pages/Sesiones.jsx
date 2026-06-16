import { useState, useMemo } from 'react'
import { FiFilter, FiCalendar, FiClock, FiTarget, FiActivity } from 'react-icons/fi'
import Badge from '../components/ui/Badge'
import Select from '../components/ui/Select'
import { sesiones as initialSesiones, pacientes } from '../data/mockData'

/**
 * Página de Sesiones
 * Listado y filtrado de sesiones de medición
 */
function Sesiones() {
  const [sesiones] = useState(initialSesiones)
  const [filterEstado, setFilterEstado] = useState('')
  const [filterPaciente, setFilterPaciente] = useState('')

  // Opciones de filtro de estado
  const estadoOptions = [
    { value: 'completada', label: 'Completada' },
    { value: 'pendiente', label: 'Pendiente' }
  ]

  // Opciones de pacientes para filtro
  const pacienteOptions = pacientes.map(p => ({
    value: p.id.toString(),
    label: p.nombre
  }))

  // Filtrar sesiones
  const filteredSesiones = useMemo(() => {
    return sesiones.filter(s => {
      const matchEstado = !filterEstado || s.estado === filterEstado
      const matchPaciente = !filterPaciente || s.pacienteId.toString() === filterPaciente
      return matchEstado && matchPaciente
    }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  }, [sesiones, filterEstado, filterPaciente])

  // Estadísticas rápidas
  const stats = useMemo(() => {
    const completadas = sesiones.filter(s => s.estado === 'completada')
    const pendientes = sesiones.filter(s => s.estado === 'pendiente')
    const totalTiempo = completadas.reduce((sum, s) => sum + s.tiempoReaccion, 0)
    
    return {
      total: sesiones.length,
      completadas: completadas.length,
      pendientes: pendientes.length,
      promedioTiempo: completadas.length > 0 ? Math.round(totalTiempo / completadas.length) : 0
    }
  }, [sesiones])

  // Obtener variante de badge según estado
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'completada':
        return <Badge variant="success">Completada</Badge>
      case 'pendiente':
        return <Badge variant="warning">Pendiente</Badge>
      default:
        return <Badge variant="default">{estado}</Badge>
    }
  }

  // Clasificar tiempo de reacción
  const getTiempoClass = (tiempo) => {
    if (tiempo === 0) return 'text-gray-400'
    if (tiempo < 400) return 'text-green-600 font-semibold'
    if (tiempo < 500) return 'text-blue-600'
    if (tiempo < 600) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiActivity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total Sesiones</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiTarget className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completadas}</p>
              <p className="text-xs text-gray-500">Completadas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <FiCalendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendientes}</p>
              <p className="text-xs text-gray-500">Pendientes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiClock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.promedioTiempo} ms</p>
              <p className="text-xs text-gray-500">Tiempo Promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Estado"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            options={estadoOptions}
            placeholder="Todos los estados"
          />
          <Select
            label="Paciente"
            value={filterPaciente}
            onChange={(e) => setFilterPaciente(e.target.value)}
            options={pacienteOptions}
            placeholder="Todos los pacientes"
          />
        </div>
      </div>

      {/* Tabla de sesiones */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
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
            <tbody className="divide-y divide-gray-200">
              {filteredSesiones.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <FiActivity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No se encontraron sesiones</p>
                  </td>
                </tr>
              ) : (
                filteredSesiones.map((sesion) => (
                  <tr key={sesion.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-500">#{sesion.id.toString().padStart(3, '0')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{sesion.pacienteNombre}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(sesion.fecha).toLocaleDateString('es-ES', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {sesion.hora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getTiempoClass(sesion.tiempoReaccion)}`}>
                        {sesion.tiempoReaccion > 0 ? `${sesion.tiempoReaccion} ms` : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {sesion.estado === 'completada' ? (
                        <span>
                          <span className="font-medium text-gray-900">{sesion.aciertos}</span>
                          <span className="text-gray-400">/{sesion.intentos}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getEstadoBadge(sesion.estado)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer con conteo */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Mostrando <span className="font-medium text-gray-900">{filteredSesiones.length}</span> de{' '}
            <span className="font-medium text-gray-900">{sesiones.length}</span> sesiones
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sesiones
