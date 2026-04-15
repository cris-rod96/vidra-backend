import { DataTypes } from 'sequelize'

const ConfiguracionPantallaModel = (sq) => {
  sq.define(
    'ConfiguracionPantalla',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      urlVideoPublicidad: {
        type: DataTypes.STRING, // Link de YouTube o video informativo
        allowNull: true,
      },
      mensajeScroll: {
        type: DataTypes.STRING, // "Favor estar atentos a su llamado..."
        allowNull: true,
      },
      colorPrimario: {
        type: DataTypes.STRING, // Hexadecimal del branding de la clínica
        defaultValue: '#007bff',
      },
      mostrarLogo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      // --- RELACIONES ---
      SucursalId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true, // Una configuración por sucursal
        references: { model: 'Sucursales', key: 'id' },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'ConfiguracionesPantallas',
      timestamps: true,
    }
  )
}

export default ConfiguracionPantallaModel
