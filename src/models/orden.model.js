import { DataTypes } from 'sequelize'

const OrdenLaboratorioModel = (sq) => {
  sq.define(
    'OrdenLaboratorio',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      codigoOrden: {
        type: DataTypes.STRING, // Ej: LAB-2026-0001
        allowNull: false,
        unique: true,
      },
      estado: {
        type: DataTypes.ENUM('Pendiente', 'Muestra Tomada', 'En Proceso', 'Finalizada', 'Anulada'),
        defaultValue: 'Pendiente',
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- RELACIONES ---
      PacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Pacientes', key: 'id' },
      },
      DoctorSolicitanteId: {
        type: DataTypes.UUID, // El doctor que pidió los exámenes
        allowNull: true,
        references: { model: 'Usuarios', key: 'id' },
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
      tableName: 'OrdenesLaboratorio',
      timestamps: true,
      indexes: [
        {
          fields: ['PacienteId'],
        },
        {
          fields: ['DoctorSolicitanteId'],
        },
        {
          fields: ['SucursalId'],
        },
        {
          fields: ['EmpresaId'],
        },
      ],
    }
  )
}

export default OrdenLaboratorioModel
