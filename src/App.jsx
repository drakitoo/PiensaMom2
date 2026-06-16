import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Pacientes from './pages/Pacientes'
import Sesiones from './pages/Sesiones'
import Estadisticas from './pages/Estadisticas'
import Configuracion from './pages/Configuracion'

/**
 * Componente principal de la aplicación RefleAct
 * Maneja el enrutamiento y la estructura general
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pacientes" element={<Pacientes />} />
        <Route path="sesiones" element={<Sesiones />} />
        <Route path="estadisticas" element={<Estadisticas />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>
    </Routes>
  )
}

export default App
