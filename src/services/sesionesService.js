/**
 * Servicio para gestión de sesiones
 * En producción, esto se conectaría a una API real
 */
import { sesiones as mockSesiones } from '../data/mockData'

let sesiones = [...mockSesiones]

export const sesionesService = {
  /**
   * Obtiene todas las sesiones
   */
  getAll: () => {
    return Promise.resolve([...sesiones])
  },

  /**
   * Obtiene sesiones por paciente
   */
  getByPaciente: (pacienteId) => {
    const results = sesiones.filter(s => s.pacienteId === pacienteId)
    return Promise.resolve(results)
  },

  /**
   * Obtiene las últimas N sesiones
   */
  getRecent: (limit = 5) => {
    const sorted = [...sesiones]
      .filter(s => s.estado === 'completada')
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, limit)
    return Promise.resolve(sorted)
  },

  /**
   * Crea una nueva sesión
   */
  create: (data) => {
    const newSesion = {
      id: Math.max(...sesiones.map(s => s.id)) + 1,
      ...data,
      estado: 'pendiente',
      tiempoReaccion: 0,
      intentos: 0,
      aciertos: 0
    }
    sesiones.push(newSesion)
    return Promise.resolve(newSesion)
  },

  /**
   * Actualiza una sesión existente
   */
  update: (id, data) => {
    const index = sesiones.findIndex(s => s.id === id)
    if (index !== -1) {
      sesiones[index] = { ...sesiones[index], ...data }
      return Promise.resolve(sesiones[index])
    }
    return Promise.reject(new Error('Sesión no encontrada'))
  },

  /**
   * Obtiene estadísticas de sesiones
   */
  getStats: () => {
    const completadas = sesiones.filter(s => s.estado === 'completada')
    const totalTiempo = completadas.reduce((sum, s) => sum + s.tiempoReaccion, 0)
    const mejorTiempo = Math.min(...completadas.map(s => s.tiempoReaccion))
    
    return Promise.resolve({
      total: sesiones.length,
      completadas: completadas.length,
      pendientes: sesiones.filter(s => s.estado === 'pendiente').length,
      tiempoPromedio: Math.round(totalTiempo / completadas.length),
      mejorTiempo
    })
  }
}
