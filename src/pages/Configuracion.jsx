import { useState } from 'react'
import { FiCpu, FiWifi, FiServer, FiSliders, FiRefreshCw, FiSave, FiInfo } from 'react-icons/fi'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import { configuracionSistema as initialConfig } from '../data/mockData'

/**
 * Página de Configuración
 * Ajustes del sistema y conexión con el dispositivo ESP32
 */
function Configuracion() {
  const [config, setConfig] = useState(initialConfig)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  // Manejar cambios en la configuración
  const handleConfigChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  // Manejar cambios en intervalo de estímulos
  const handleIntervaloChange = (type, value) => {
    setConfig(prev => ({
      ...prev,
      intervaloEstimulos: {
        ...prev.intervaloEstimulos,
        [type]: parseInt(value) || 0
      }
    }))
  }

  // Simular prueba de conexión
  const handleTestConnection = async () => {
    setIsTesting(true)
    setTestResult(null)
    
    // Simular delay de conexión
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simular resultado (aleatorio para demostración)
    const success = Math.random() > 0.5
    setTestResult(success ? 'success' : 'error')
    setConfig(prev => ({
      ...prev,
      estadoConexion: success ? 'conectado' : 'desconectado'
    }))
    setIsTesting(false)
  }

  // Guardar configuración
  const handleSave = () => {
    // En producción, esto enviaría los datos a una API
    alert('Configuración guardada correctamente')
  }

  return (
    <div className="space-y-6">
      {/* Información del sistema */}
      <section aria-labelledby="system-info-heading">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiInfo className="w-5 h-5 text-blue-600" />
            </div>
            <h2 id="system-info-heading" className="text-lg font-semibold text-gray-900">
              Información del Sistema
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Nombre del Sistema</p>
              <p className="font-semibold text-gray-900">{config.nombreSistema}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Versión</p>
              <p className="font-semibold text-gray-900">v{config.version}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Dispositivo</p>
              <p className="font-semibold text-gray-900">{config.dispositivo}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estado de conexión */}
      <section aria-labelledby="connection-heading">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <FiWifi className="w-5 h-5 text-green-600" />
            </div>
            <h2 id="connection-heading" className="text-lg font-semibold text-gray-900">
              Conexión con Dispositivo
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FiCpu className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">ESP32</p>
                  <p className="text-sm text-gray-500">Microcontrolador principal</p>
                </div>
              </div>
              <Badge variant={config.estadoConexion === 'conectado' ? 'success' : 'warning'}>
                {config.estadoConexion === 'conectado' ? 'Conectado' : 'Desconectado'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Endpoint de API"
                value={config.apiEndpoint}
                onChange={(e) => handleConfigChange('apiEndpoint', e.target.value)}
                placeholder="http://192.168.1.100/api"
              />
              <div className="flex items-end">
                <Button 
                  onClick={handleTestConnection} 
                  variant="outline"
                  disabled={isTesting}
                  className="w-full"
                >
                  {isTesting ? (
                    <>
                      <FiRefreshCw className="w-4 h-4 animate-spin" />
                      Probando...
                    </>
                  ) : (
                    <>
                      <FiServer className="w-4 h-4" />
                      Probar Conexión
                    </>
                  )}
                </Button>
              </div>
            </div>

            {testResult && (
              <div className={`p-4 rounded-lg ${
                testResult === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm font-medium ${
                  testResult === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {testResult === 'success' 
                    ? 'Conexión exitosa con el dispositivo ESP32'
                    : 'No se pudo establecer conexión. Verifique la dirección IP y que el dispositivo esté encendido.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Parámetros de medición */}
      <section aria-labelledby="params-heading">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FiSliders className="w-5 h-5 text-purple-600" />
            </div>
            <h2 id="params-heading" className="text-lg font-semibold text-gray-900">
              Parámetros de Medición
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Tiempo máximo de respuesta (ms)"
              type="number"
              value={config.tiempoMaximoRespuesta}
              onChange={(e) => handleConfigChange('tiempoMaximoRespuesta', parseInt(e.target.value))}
              min="500"
              max="5000"
            />
            <Input
              label="Intentos por sesión"
              type="number"
              value={config.intentosPorSesion}
              onChange={(e) => handleConfigChange('intentosPorSesion', parseInt(e.target.value))}
              min="5"
              max="30"
            />
            <div className="md:col-span-2 lg:col-span-1">
              <p className="block text-sm font-medium text-gray-700 mb-1.5">
                Intervalo entre estímulos (ms)
              </p>
              <div className="flex items-center gap-3">
                <Input
                  value={config.intervaloEstimulos.min}
                  onChange={(e) => handleIntervaloChange('min', e.target.value)}
                  type="number"
                  min="500"
                  placeholder="Mín"
                />
                <span className="text-gray-400">-</span>
                <Input
                  value={config.intervaloEstimulos.max}
                  onChange={(e) => handleIntervaloChange('max', e.target.value)}
                  type="number"
                  min="1000"
                  placeholder="Máx"
                />
              </div>
            </div>
          </div>

          {/* Descripción de parámetros */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-2">Nota sobre los parámetros</h4>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
              <li><strong>Tiempo máximo:</strong> Si el paciente no responde en este tiempo, se cuenta como fallo.</li>
              <li><strong>Intentos:</strong> Número de estímulos que se presentan en cada sesión.</li>
              <li><strong>Intervalo:</strong> Tiempo aleatorio entre estímulos para evitar anticipación.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Botón guardar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <FiSave className="w-4 h-4" />
          Guardar Configuración
        </Button>
      </div>

      {/* Información técnica */}
      <section aria-labelledby="tech-info-heading">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h3 id="tech-info-heading" className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Información Técnica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Frontend</p>
              <p className="font-medium text-gray-900">React 19 + Vite + TailwindCSS</p>
            </div>
            <div>
              <p className="text-gray-500">Comunicación</p>
              <p className="font-medium text-gray-900">HTTP REST API / WebSocket</p>
            </div>
            <div>
              <p className="text-gray-500">Hardware</p>
              <p className="font-medium text-gray-900">ESP32 + 8 LEDs RGB + 8 Pulsadores</p>
            </div>
            <div>
              <p className="text-gray-500">Protocolo</p>
              <p className="font-medium text-gray-900">WiFi 802.11 b/g/n</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Configuracion
