export const GASTOS = [
  'Servicios Básicos',
  'Arriendo',
  'Sueldos',
  'Mantenimiento',
  'Insumos Médicos',
  'Marketing',
  'Otros',
]
export const CAJAS_ESTADOS = ['Abierta', 'Cerrada']
export const ESTADOS = ['Activo', 'Inactivo']
export const TIPOS_SANGRE = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
export const METODOS_PAGO = ['Efectivo', 'Transferencia', 'Tarjeta', 'Depósito']
export const ESTADOS_PAGO = ['Pagado', 'Anulado', 'Reembolsado']
export const SEXOS_PERSONA = ['M', 'F', 'OTRO']
export const SUSCRIPCIONES_PLAN = ['Básico', 'Profesional', 'Premium', 'Prueba']
export const ESTADOS_TURNO = [
  'En espera', // El paciente llegó y está en sala
  'Llamando', // El doctor pulsó "Llamar" (parpadea en pantalla)
  'En consulta', // El paciente ya entró con el doctor
  'Finalizado', // La consulta terminó
  'Cancelado', // El paciente se fue o hubo un error
  'Ausente', // Se llamó y no apareció
]
export const ROLES_USUARIO = [
  'SuperAdmin', // Tú (el dueño del SaaS)
  'Administrador', // El dueño de la Empresa
  'Doctor', // Realiza ecografías
  'Recepcionista', // Gestiona turnos y caja
  'Asistente', // Apoyo médico
]
export const TIPOS_MOVIMIENTO = ['Entrada', 'Salida', 'Ajuste']
