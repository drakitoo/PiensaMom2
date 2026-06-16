/**
 * Datos mock de pacientes para el sistema RefleAct
 * Simulan adultos mayores registrados en el sistema
 */
export const pacientes = [
  {
    id: 1,
    nombre: "María García López",
    edad: 72,
    genero: "Femenino",
    observaciones: "Presenta leve temblor en mano derecha. Motivación alta.",
    fechaRegistro: "2024-01-15",
    sesiones: 12,
    tiempoPromedio: 485
  },
  {
    id: 2,
    nombre: "José Rodríguez Martínez",
    edad: 68,
    genero: "Masculino",
    observaciones: "Buen estado general. Usa lentes de lectura.",
    fechaRegistro: "2024-01-20",
    sesiones: 8,
    tiempoPromedio: 392
  },
  {
    id: 3,
    nombre: "Carmen Sánchez Pérez",
    edad: 75,
    genero: "Femenino",
    observaciones: "Artritis leve en manos. Requiere calentamiento previo.",
    fechaRegistro: "2024-02-01",
    sesiones: 15,
    tiempoPromedio: 521
  },
  {
    id: 4,
    nombre: "Antonio López Fernández",
    edad: 70,
    genero: "Masculino",
    observaciones: "Excelente coordinación. Muy competitivo.",
    fechaRegistro: "2024-02-10",
    sesiones: 20,
    tiempoPromedio: 345
  },
  {
    id: 5,
    nombre: "Rosa Hernández Díaz",
    edad: 78,
    genero: "Femenino",
    observaciones: "Hipoacusia leve. Requiere instrucciones visuales.",
    fechaRegistro: "2024-02-15",
    sesiones: 6,
    tiempoPromedio: 612
  },
  {
    id: 6,
    nombre: "Manuel Martín González",
    edad: 65,
    genero: "Masculino",
    observaciones: "Recién ingresado. Sin antecedentes relevantes.",
    fechaRegistro: "2024-03-01",
    sesiones: 3,
    tiempoPromedio: 428
  },
  {
    id: 7,
    nombre: "Francisca Ruiz Moreno",
    edad: 80,
    genero: "Femenino",
    observaciones: "Visión reducida. Usar estímulos de alto contraste.",
    fechaRegistro: "2024-03-05",
    sesiones: 10,
    tiempoPromedio: 589
  },
  {
    id: 8,
    nombre: "Pedro Jiménez Torres",
    edad: 73,
    genero: "Masculino",
    observaciones: "Diabetes controlada. Excelente progreso.",
    fechaRegistro: "2024-03-10",
    sesiones: 14,
    tiempoPromedio: 402
  }
]

/**
 * Datos mock de sesiones de medición
 */
export const sesiones = [
  {
    id: 1,
    pacienteId: 1,
    pacienteNombre: "María García López",
    fecha: "2024-03-15",
    hora: "09:30",
    tiempoReaccion: 478,
    intentos: 10,
    aciertos: 8,
    estado: "completada"
  },
  {
    id: 2,
    pacienteId: 2,
    pacienteNombre: "José Rodríguez Martínez",
    fecha: "2024-03-15",
    hora: "10:15",
    tiempoReaccion: 385,
    intentos: 10,
    aciertos: 9,
    estado: "completada"
  },
  {
    id: 3,
    pacienteId: 4,
    pacienteNombre: "Antonio López Fernández",
    fecha: "2024-03-15",
    hora: "11:00",
    tiempoReaccion: 342,
    intentos: 10,
    aciertos: 10,
    estado: "completada"
  },
  {
    id: 4,
    pacienteId: 3,
    pacienteNombre: "Carmen Sánchez Pérez",
    fecha: "2024-03-14",
    hora: "09:45",
    tiempoReaccion: 515,
    intentos: 10,
    aciertos: 7,
    estado: "completada"
  },
  {
    id: 5,
    pacienteId: 5,
    pacienteNombre: "Rosa Hernández Díaz",
    fecha: "2024-03-14",
    hora: "10:30",
    tiempoReaccion: 598,
    intentos: 10,
    aciertos: 6,
    estado: "completada"
  },
  {
    id: 6,
    pacienteId: 1,
    pacienteNombre: "María García López",
    fecha: "2024-03-14",
    hora: "11:15",
    tiempoReaccion: 492,
    intentos: 10,
    aciertos: 8,
    estado: "completada"
  },
  {
    id: 7,
    pacienteId: 6,
    pacienteNombre: "Manuel Martín González",
    fecha: "2024-03-13",
    hora: "09:00",
    tiempoReaccion: 445,
    intentos: 10,
    aciertos: 8,
    estado: "completada"
  },
  {
    id: 8,
    pacienteId: 7,
    pacienteNombre: "Francisca Ruiz Moreno",
    fecha: "2024-03-13",
    hora: "10:00",
    tiempoReaccion: 575,
    intentos: 10,
    aciertos: 7,
    estado: "completada"
  },
  {
    id: 9,
    pacienteId: 8,
    pacienteNombre: "Pedro Jiménez Torres",
    fecha: "2024-03-13",
    hora: "11:30",
    tiempoReaccion: 398,
    intentos: 10,
    aciertos: 9,
    estado: "completada"
  },
  {
    id: 10,
    pacienteId: 2,
    pacienteNombre: "José Rodríguez Martínez",
    fecha: "2024-03-12",
    hora: "09:15",
    tiempoReaccion: 401,
    intentos: 10,
    aciertos: 8,
    estado: "completada"
  },
  {
    id: 11,
    pacienteId: 4,
    pacienteNombre: "Antonio López Fernández",
    fecha: "2024-03-16",
    hora: "10:00",
    tiempoReaccion: 0,
    intentos: 0,
    aciertos: 0,
    estado: "pendiente"
  },
  {
    id: 12,
    pacienteId: 3,
    pacienteNombre: "Carmen Sánchez Pérez",
    fecha: "2024-03-16",
    hora: "11:30",
    tiempoReaccion: 0,
    intentos: 0,
    aciertos: 0,
    estado: "pendiente"
  }
]

/**
 * Datos para gráficos de evolución semanal
 */
export const evolucionSemanal = [
  { dia: "Lun", promedio: 456, sesiones: 5 },
  { dia: "Mar", promedio: 442, sesiones: 6 },
  { dia: "Mié", promedio: 468, sesiones: 4 },
  { dia: "Jue", promedio: 425, sesiones: 7 },
  { dia: "Vie", promedio: 412, sesiones: 8 },
  { dia: "Sáb", promedio: 398, sesiones: 3 },
  { dia: "Dom", promedio: 405, sesiones: 2 }
]

/**
 * Datos de evolución mensual para estadísticas
 */
export const evolucionMensual = [
  { mes: "Ene", promedio: 520, pacientes: 4 },
  { mes: "Feb", promedio: 485, pacientes: 6 },
  { mes: "Mar", promedio: 452, pacientes: 8 }
]

/**
 * Estadísticas generales del sistema
 */
export const estadisticasGenerales = {
  totalPacientes: 8,
  totalSesiones: 88,
  tiempoPromedio: 458,
  mejorTiempo: 298,
  tasaAciertos: 82,
  mejoraPromedio: 12.5
}

/**
 * Datos de rendimiento por paciente para gráficos
 */
export const rendimientoPorPaciente = [
  { nombre: "Antonio L.", tiempoInicial: 420, tiempoActual: 345, mejora: 17.9 },
  { nombre: "José R.", tiempoInicial: 450, tiempoActual: 392, mejora: 12.9 },
  { nombre: "Pedro J.", tiempoInicial: 465, tiempoActual: 402, mejora: 13.5 },
  { nombre: "Manuel M.", tiempoInicial: 480, tiempoActual: 428, mejora: 10.8 },
  { nombre: "María G.", tiempoInicial: 540, tiempoActual: 485, mejora: 10.2 },
  { nombre: "Carmen S.", tiempoInicial: 580, tiempoActual: 521, mejora: 10.2 },
  { nombre: "Francisca R.", tiempoInicial: 650, tiempoActual: 589, mejora: 9.4 },
  { nombre: "Rosa H.", tiempoInicial: 680, tiempoActual: 612, mejora: 10.0 }
]

/**
 * Configuración del sistema
 */
export const configuracionSistema = {
  nombreSistema: "RefleAct",
  version: "1.0.0",
  dispositivo: "ESP32 + LEDs + Pulsadores",
  tiempoMaximoRespuesta: 2000,
  intentosPorSesion: 10,
  intervaloEstimulos: { min: 1000, max: 3000 },
  apiEndpoint: "http://192.168.1.100/api",
  estadoConexion: "desconectado"
}
