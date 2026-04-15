import { DataTypes } from 'sequelize'
import { ESTADOS_TURNO } from '../data/index.data.js'

const TurnoModel = (sq) => {
  sq.define(
    'Turno',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // El número que se ve en pantalla (ej: E-001, A-01)
      numeroTurno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Estados: 'En espera', 'Llamado', 'En atención', 'Finalizado', 'Cancelado'
      estado: {
        type: DataTypes.ENUM,
        values: ESTADOS_TURNO,
        defaultValue: 'En espera',
      },
      prioridad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      motivoConsulta: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- CONTROL DE TIEMPOS (Métricas para el dueño) ---
      horaLlamada: {
        type: DataTypes.DATE,
        allowNull: true, // Cuando el doctor pulsa "Siguiente"
      },
      horaInicioAtencion: {
        type: DataTypes.DATE,
        allowNull: true, // Cuando el paciente entra al consultorio
      },
      horaFinAtencion: {
        type: DataTypes.DATE,
        allowNull: true, // Cuando el doctor guarda el informe
      },
      // --- VINCULACIÓN FINANCIERA ---
      estaPagado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Vital para que el doctor sepa si atender o no
      },
      // --- LLAVES FORÁNEAS ---
      PacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Pacientes', key: 'id' },
      },
      DoctorId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'Usuarios', key: 'id' },
      },
      ServicioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Servicios', key: 'id' },
      },
      SucursalId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Sucursales', key: 'id' },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'Turnos',
      timestamps: true, // createdAt es la hora de creación del turno
      indexes: [
        { fields: ['EmpresaId'] },
        { fields: ['SucursalId'] },
        { fields: ['ServicioId'] },
        { fields: ['DoctorId'] },
        { fields: ['PacienteId'] },
      ],
    }
  )
}

export default TurnoModel
