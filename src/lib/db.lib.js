import { Sequelize } from 'sequelize'
import { CONFIG } from '../config/index.config.js'
import { models } from '../models/index.models.js'

const sq = new Sequelize(CONFIG.DATABASE_CONFIG.URI, CONFIG.DATABASE_CONFIG.OPTIONS)

models.forEach((m) => m(sq))

const {
  Auditoria,
  Caja,
  ConfiguracionPantalla,
  DetalleReceta,
  Empresa,
  Examen,
  FirmaDigital,
  Gasto,
  HistorialClinico,
  InformeFinal,
  Log,
  MovimientoFinanciero,
  OrdenLaboratorio,
  Paciente,
  Pago,
  Persona,
  PlantillaInforme,
  Producto,
  Proveedor,
  Receta,
  Servicio,
  Sucursal,
  Suscripcion,
  Turno,
  Usuario,
} = sq.models

Usuario.hasMany(Auditoria, { foreignKey: 'UsuarioId' })
Auditoria.belongsTo(Usuario, { foreignKey: 'UsuarioId' })

Sucursal.hasMany(Auditoria, { foreignKey: 'SucursalId' })
Auditoria.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(Auditoria, { foreignKey: 'EmpresaId' })
Auditoria.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Usuario.hasMany(Caja, { foreignKey: 'UsuarioId' })
Caja.belongsTo(Usuario, { foreignKey: 'UsuarioId' })

Sucursal.hasMany(Caja, { foreignKey: 'SucursalId' })
Caja.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(Caja, { foreignKey: 'EmpresaId' })
Caja.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Sucursal.hasMany(ConfiguracionPantalla, { foreignKey: 'SucursalId' })
ConfiguracionPantalla.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(ConfiguracionPantalla, { foreignKey: 'EmpresaId' })
ConfiguracionPantalla.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Receta.hasMany(DetalleReceta, { foreignKey: 'RecetaId' })
DetalleReceta.belongsTo(Receta, { foreignKey: 'RecetaId' })

Producto.hasMany(DetalleReceta, { foreignKey: 'ProductoId' })
DetalleReceta.belongsTo(Producto, { foreignKey: 'ProductoId' })

OrdenLaboratorio.hasOne(Examen, { foreignKey: 'OrdenLaboratorioId' })
Examen.belongsTo(OrdenLaboratorio, { foreignKey: 'OrdenLaboratorioId' })

Usuario.hasOne(FirmaDigital, { foreignKey: 'UsuarioId' })
FirmaDigital.belongsTo(Usuario, { foreignKey: 'UsuarioId' })

Empresa.hasOne(FirmaDigital, { foreignKey: 'EmpresaId' })
FirmaDigital.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Proveedor.hasMany(Gasto, { foreignKey: 'ProveedorId' })
Gasto.belongsTo(Proveedor, { foreignKey: 'ProveedorId' })

Sucursal.hasMany(Gasto, { foreignKey: 'SucursalId' })
Gasto.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Usuario.hasMany(Gasto, { foreignKey: 'UsuarioId' })
Gasto.belongsTo(Usuario, { foreignKey: 'UsuarioId' })

Empresa.hasMany(Gasto, { foreignKey: 'EmpresaId' })
Gasto.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Paciente.hasMany(HistorialClinico, { foreignKey: 'PacienteId' })
HistorialClinico.belongsTo(Paciente, { foreignKey: 'PacienteId' })

Usuario.hasMany(HistorialClinico, { foreignKey: 'DoctorId' })
HistorialClinico.belongsTo(Usuario, { foreignKey: 'DoctorId' })

Sucursal.hasMany(HistorialClinico, { foreignKey: 'SucursalId' })
HistorialClinico.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(HistorialClinico, { foreignKey: 'EmpresaId' })
HistorialClinico.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Paciente.hasMany(InformeFinal, { foreignKey: 'PacienteId' })
InformeFinal.belongsTo(Paciente, { foreignKey: 'PacienteId' })

Usuario.hasMany(InformeFinal, { foreignKey: 'DoctorId' })
InformeFinal.belongsTo(Usuario, { foreignKey: 'DoctorId' })

Empresa.hasMany(InformeFinal, { foreignKey: 'EmpresaId' })
InformeFinal.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Usuario.hasMany(Log, { foreignKey: 'UsuarioId' })
Log.belongsTo(Usuario, { foreignKey: 'UsuarioId' })

Sucursal.hasMany(Log, { foreignKey: 'SucursalId' })
Log.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(Log, { foreignKey: 'EmpresaId' })
Log.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Caja.hasMany(MovimientoFinanciero, { foreignKey: 'CajaId' })
MovimientoFinanciero.belongsTo(Caja, { foreignKey: 'CajaId' })

Usuario.hasMany(MovimientoFinanciero, { foreignKey: 'UsuarioId' })
MovimientoFinanciero.belongsTo(Usuario, { foreignKey: 'UsuarioId' })

Sucursal.hasMany(MovimientoFinanciero, { foreignKey: 'SucursalId' })
MovimientoFinanciero.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(MovimientoFinanciero, { foreignKey: 'EmpresaId' })
MovimientoFinanciero.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Paciente.hasMany(OrdenLaboratorio, { foreignKey: 'PacienteId' })
OrdenLaboratorio.belongsTo(Paciente, { foreignKey: 'PacienteId' })

Usuario.hasMany(OrdenLaboratorio, { foreignKey: 'DoctorSolicitanteId' })
OrdenLaboratorio.belongsTo(Usuario, { foreignKey: 'DoctorSolicitanteId' })

Sucursal.hasMany(OrdenLaboratorio, { foreignKey: 'SucursalId' })
OrdenLaboratorio.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Persona.hasOne(Paciente, { foreignKey: 'PersonaId' })
Paciente.belongsTo(Persona, { foreignKey: 'PersonaId' })

Empresa.hasMany(Paciente, { foreignKey: 'EmpresaId' })
Paciente.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Turno.hasOne(Pago, { foreignKey: 'TurnoId' })
Pago.belongsTo(Turno, { foreignKey: 'TurnoId' })

Caja.hasMany(Pago, { foreignKey: 'CajaId' })
Pago.belongsTo(Caja, { foreignKey: 'CajaId' })

Sucursal.hasMany(Pago, { foreignKey: 'SucursalId' })
Pago.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(Pago, { foreignKey: 'EmpresaId' })
Pago.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Servicio.hasMany(PlantillaInforme, { foreignKey: 'ServicioId' })
PlantillaInforme.belongsTo(Servicio, { foreignKey: 'ServicioId' })

Usuario.hasMany(PlantillaInforme, { foreignKey: 'DoctorId' })
PlantillaInforme.belongsTo(Usuario, { foreignKey: 'DoctorId' })

Empresa.hasMany(PlantillaInforme, { foreignKey: 'EmpresaId' })
PlantillaInforme.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Empresa.hasMany(Producto, { foreignKey: 'EmpresaId' })
Producto.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Empresa.hasMany(Proveedor, { foreignKey: 'EmpresaId' })
Proveedor.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Sucursal.hasMany(Proveedor, { foreignKey: 'SucursalId' })
Proveedor.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Paciente.hasMany(Receta, { foreignKey: 'PacienteId' })
Receta.belongsTo(Paciente, { foreignKey: 'PacienteId' })

Usuario.hasMany(Receta, { foreignKey: 'DoctorId' })
Receta.belongsTo(Usuario, { foreignKey: 'DoctorId' })

Sucursal.hasMany(Receta, { foreignKey: 'SucursalId' })
Receta.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(Receta, { foreignKey: 'EmpresaId' })
Receta.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

HistorialClinico.hasMany(Receta, { foreignKey: 'HistorialClinicoId' })
Receta.belongsTo(HistorialClinico, { foreignKey: 'HistorialClinicoId' })

Empresa.hasMany(Servicio, { foreignKey: 'EmpresaId' })
Servicio.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Empresa.hasMany(Sucursal, { foreignKey: 'EmpresaId' })
Sucursal.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Empresa.hasOne(Suscripcion, { foreignKey: 'EmpresaId' })
Suscripcion.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Paciente.hasMany(Turno, { foreignKey: 'PacienteId' })
Turno.belongsTo(Paciente, { foreignKey: 'PacienteId' })

Usuario.hasMany(Turno, { foreignKey: 'DoctorId' })
Turno.belongsTo(Usuario, { foreignKey: 'DoctorId' })

Servicio.hasMany(Turno, { foreignKey: 'ServicioId' })
Turno.belongsTo(Servicio, { foreignKey: 'ServicioId' })

Sucursal.hasMany(Turno, { foreignKey: 'SucursalId' })
Turno.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

Empresa.hasMany(Turno, { foreignKey: 'EmpresaId' })
Turno.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Persona.hasOne(Usuario, { foreignKey: 'PersonaId' })
Usuario.belongsTo(Persona, { foreignKey: 'PersonaId' })

Empresa.hasOne(Usuario, { foreignKey: 'EmpresaId' })
Usuario.belongsTo(Empresa, { foreignKey: 'EmpresaId' })

Sucursal.hasOne(Usuario, { foreignKey: 'SucursalId' })
Usuario.belongsTo(Sucursal, { foreignKey: 'SucursalId' })

export {
  Auditoria,
  Caja,
  ConfiguracionPantalla,
  DetalleReceta,
  Empresa,
  Examen,
  FirmaDigital,
  Gasto,
  HistorialClinico,
  InformeFinal,
  Log,
  MovimientoFinanciero,
  OrdenLaboratorio,
  Paciente,
  Pago,
  Persona,
  PlantillaInforme,
  Producto,
  Proveedor,
  Receta,
  Servicio,
  sq,
  Sucursal,
  Suscripcion,
  Turno,
  Usuario,
}
