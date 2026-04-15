import { DataTypes } from 'sequelize'
import { ESTADOS } from '../data/index.data.js'

const LogModel = (sq) => {
  sq.define(
    'Log',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // Para saber si la sesión sigue vigente o fue cerrada/expirada
      estado: {
        type: DataTypes.ENUM,
        values: ESTADOS, // ['Activo', 'Inactivo']
        defaultValue: 'Activo',
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Para guardar información del navegador y S.O. (ej: "Chrome / Windows 11")
      dispositivo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      fechaCierre: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // Opcional: Guardar el token (o su firma) para poder invalidarlo si es necesario
      tokenAsociado: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- RELACIONES ---
      UsuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
      },
      // Es vital para saber de qué sucursal se están conectando sin hacer joins
      SucursalId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Sucursales',
          key: 'id',
        },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Empresas',
          key: 'id',
        },
      },
    },
    {
      tableName: 'Logs',
      timestamps: true,
      indexes: [
        {
          fields: ['EmpresaId'],
        },
        {
          fields: ['UsuarioId'],
        },
        {
          fields: ['SucursalId'],
        },
      ],
    }
  )
}

export default LogModel
