import { DataTypes } from 'sequelize'

const AuditoriaModel = (sq) => {
  sq.define(
    'Auditoria',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      accion: {
        type: DataTypes.STRING, // Ej: "CREATE", "UPDATE", "DELETE", "LOGIN", "DOWNLOAD_REPORT"
        allowNull: false,
      },
      tablaAfectada: {
        type: DataTypes.STRING, // Ej: "Pagos"
        allowNull: false,
      },
      idRegistroAfectado: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      valorAnterior: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      valorNuevo: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      // --- CONTEXTO TÉCNICO ---
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userAgent: {
        type: DataTypes.STRING, // Navegador, dispositivo (ej: "Chrome on Windows", "Mobile App")
        allowNull: true,
      },
      // --- RELACIONES ---
      UsuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Usuarios', key: 'id' },
      },
      // Ayuda a filtrar logs por local sin buscar en el objeto de Usuario
      SucursalId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'Sucursales', key: 'id' },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'Auditorias',
      timestamps: true,
      updatedAt: false, // Inmutabilidad total: un log no se toca
      indexes: [{ fields: ['EmpresaId'] }, { fields: ['SucursalId'] }, { fields: ['UsuarioId'] }],
    }
  )
}

export default AuditoriaModel
