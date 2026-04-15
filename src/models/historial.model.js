import { DataTypes } from 'sequelize'

const HistorialClinicoModel = (sq) => {
  sq.define(
    'HistorialClinico',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // Motivo por el cual el paciente se hace el eco
      motivoConsulta: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Lo que el doctor observa durante el examen
      hallazgos: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // La conclusión o diagnóstico médico
      conclusion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // Sugerencias adicionales del médico
      recomendaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Para guardar las rutas de las imágenes de la ecografía (ej: en S3)
      imagenesUrls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      // --- LLAVES FORÁNEAS ---
      PacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Pacientes', key: 'id' },
      },
      DoctorId: {
        type: DataTypes.UUID,
        allowNull: false, // El médico que firma el reporte
        references: { model: 'Usuarios', key: 'id' },
      },
      TurnoId: {
        type: DataTypes.UUID,
        allowNull: true, // Relación con el turno para trazabilidad
        references: { model: 'Turnos', key: 'id' },
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
      tableName: 'HistorialesClinicos',
      timestamps: true, // createdAt será la fecha del informe
      indexes: [
        { fields: ['EmpresaId'] },
        { fields: ['SucursalId'] },
        { fields: ['TurnoId'] },
        { fields: ['DoctorId'] },
        { fields: ['PacienteId'] },
      ],
    }
  )
}

export default HistorialClinicoModel
