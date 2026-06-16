/**
 * Servicio para gestión de pacientes
 * En producción, esto se conectaría a una API real
 */
import { pacientes as mockPacientes } from '../data/mockData'

let pacientes = [...mockPacientes]

export const pacientesService = {
  /**
   * Obtiene todos los pacientes
   */
  getAll: () => {
    return Promise.resolve([...pacientes])
  },

  /**
   * Obtiene un paciente por ID
   */
  getById: (id) => {
    const paciente = pacientes.find(p => p.id === id)
    return Promise.resolve(paciente || null)
  },

  /**
   * Crea un nuevo paciente
   */
  create: (data) => {
    const newPaciente = {
      id: Math.max(...pacientes.map(p => p.id)) + 1,
      ...data,
      fechaRegistro: new Date().toISOString().split('T')[0],
      sesiones: 0,
      tiempoPromedio: 0
    }
    pacientes.push(newPaciente)
    return Promise.resolve(newPaciente)
  },

  /**
   * Actualiza un paciente existente
   */
  update: (id, data) => {
    const index = pacientes.findIndex(p => p.id === id)
    if (index !== -1) {
      pacientes[index] = { ...pacientes[index], ...data }
      return Promise.resolve(pacientes[index])
    }
    return Promise.reject(new Error('Paciente no encontrado'))
  },

  /**
   * Elimina un paciente
   */
  delete: (id) => {
    const index = pacientes.findIndex(p => p.id === id)
    if (index !== -1) {
      pacientes.splice(index, 1)
      return Promise.resolve(true)
    }
    return Promise.reject(new Error('Paciente no encontrado'))
  },

  /**
   * Busca pacientes por nombre
   */
  search: (query) => {
    const results = pacientes.filter(p => 
      p.nombre.toLowerCase().includes(query.toLowerCase())
    )
    return Promise.resolve(results)
  }
}
