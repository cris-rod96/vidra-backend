import { DataTypes } from 'sequelize'

const RecetaModel = (sq) => {
  sq.define(
    'Receta',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      indicacionesGenerales: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- RELACIONES ---
      PacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Pacientes', key: 'id' },
      },
      DoctorId: {
        type: DataTypes.UUID,
        allowNull: false,
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
      HistorialClinicoId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'HistorialesClinicos', key: 'id' },
      },
    },
    {
      tableName: 'Recetas',
      timestamps: true,
      paranoid: true,
      indexes: [
        { fields: ['HistorialClinicoId'] },
        { fields: ['EmpresaId'] },
        { fields: ['SucursalId'] },
        { fields: ['DoctorId'] },
        { fields: ['PacienteId'] },
      ],
    }
  )
}

export default RecetaModel
