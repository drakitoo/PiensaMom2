import { useState, useMemo } from 'react'
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Textarea from '../components/ui/Textarea'
import Modal from '../components/ui/Modal'
import Badge from '../components/ui/Badge'
import { pacientes as initialPacientes } from '../data/mockData'

/**
 * Página de Gestión de Pacientes
 * CRUD completo para pacientes del sistema
 */
function Pacientes() {
  const [pacientes, setPacientes] = useState(initialPacientes)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingPaciente, setEditingPaciente] = useState(null)
  const [deletingPaciente, setDeletingPaciente] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    genero: '',
    observaciones: ''
  })

  // Filtrar pacientes por búsqueda
  const filteredPacientes = useMemo(() => {
    if (!searchQuery) return pacientes
    return pacientes.filter(p => 
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [pacientes, searchQuery])

  // Opciones de género
  const generoOptions = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' }
  ]

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingPaciente(null)
    setFormData({ nombre: '', edad: '', genero: '', observaciones: '' })
    setIsModalOpen(true)
  }

  // Abrir modal para editar
  const handleEdit = (paciente) => {
    setEditingPaciente(paciente)
    setFormData({
      nombre: paciente.nombre,
      edad: paciente.edad.toString(),
      genero: paciente.genero,
      observaciones: paciente.observaciones
    })
    setIsModalOpen(true)
  }

  // Confirmar eliminación
  const handleDeleteClick = (paciente) => {
    setDeletingPaciente(paciente)
    setIsDeleteModalOpen(true)
  }

  // Ejecutar eliminación
  const handleDelete = () => {
    if (deletingPaciente) {
      setPacientes(prev => prev.filter(p => p.id !== deletingPaciente.id))
      setIsDeleteModalOpen(false)
      setDeletingPaciente(null)
    }
  }

  // Guardar paciente (crear o actualizar)
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingPaciente) {
      // Actualizar existente
      setPacientes(prev => prev.map(p => 
        p.id === editingPaciente.id 
          ? { ...p, ...formData, edad: parseInt(formData.edad) }
          : p
      ))
    } else {
      // Crear nuevo
      const newPaciente = {
        id: Math.max(...pacientes.map(p => p.id)) + 1,
        ...formData,
        edad: parseInt(formData.edad),
        fechaRegistro: new Date().toISOString().split('T')[0],
        sesiones: 0,
        tiempoPromedio: 0
      }
      setPacientes(prev => [...prev, newPaciente])
    }
    
    setIsModalOpen(false)
    setEditingPaciente(null)
  }

  // Manejar cambios en el formulario
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header con búsqueda y botón agregar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            aria-label="Buscar pacientes"
          />
        </div>
        <Button onClick={handleCreate}>
          <FiPlus className="w-4 h-4" />
          Agregar Paciente
        </Button>
      </div>

      {/* Tabla de pacientes */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edad
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Género
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sesiones
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiempo Prom.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPacientes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <FiUser className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No se encontraron pacientes</p>
                  </td>
                </tr>
              ) : (
                filteredPacientes.map((paciente) => (
                  <tr key={paciente.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FiUser className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{paciente.nombre}</p>
                          <p className="text-xs text-gray-400 max-w-[200px] truncate">{paciente.observaciones}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {paciente.edad} años
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={paciente.genero === 'Masculino' ? 'primary' : 'default'}>
                        {paciente.genero}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {paciente.sesiones}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {paciente.tiempoPromedio > 0 ? `${paciente.tiempoPromedio} ms` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(paciente.fechaRegistro).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(paciente)}
                          className="p-1.5 text-gray-500 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
                          aria-label={`Editar ${paciente.nombre}`}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(paciente)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          aria-label={`Eliminar ${paciente.nombre}`}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear/Editar Paciente */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPaciente ? 'Editar Paciente' : 'Nuevo Paciente'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre completo"
            value={formData.nombre}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
            placeholder="Ej: María García López"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Edad"
              type="number"
              value={formData.edad}
              onChange={(e) => handleInputChange('edad', e.target.value)}
              placeholder="Ej: 72"
              min="60"
              max="120"
              required
            />
            <Select
              label="Género"
              value={formData.genero}
              onChange={(e) => handleInputChange('genero', e.target.value)}
              options={generoOptions}
              required
            />
          </div>
          <Textarea
            label="Observaciones médicas"
            value={formData.observaciones}
            onChange={(e) => handleInputChange('observaciones', e.target.value)}
            placeholder="Notas sobre condiciones médicas, medicamentos, etc."
            rows={3}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editingPaciente ? 'Guardar Cambios' : 'Crear Paciente'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Confirmar Eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Está seguro que desea eliminar al paciente{' '}
            <strong className="text-gray-900">{deletingPaciente?.nombre}</strong>?
          </p>
          <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            Esta acción no se puede deshacer y se perderán todos los datos asociados.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Pacientes
