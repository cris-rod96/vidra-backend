import { DataTypes } from 'sequelize'
import { ESTADOS } from '../data/index.data.js'

const SucursalModel = (sq) => {
  sq.define(
    'Sucursal',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // El SRI asigna 001, 002, etc. Fundamental para reportes y facturación.
      codigoEstablecimiento: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
          len: [3, 3],
          isNumeric: true,
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "Sucursal Kennedy"
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provincia: {
        type: DataTypes.STRING,
        allowNull: false, // Importante para segmentación en Ecuador
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      correoContacto: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      esMatriz: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // Para saber si en esta sucursal se permiten ventas de farmacia o solo consultas
      tieneFarmacia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      estado: {
        type: DataTypes.ENUM,
        values: ESTADOS,
        defaultValue: 'Activo',
      },
      // Relación con la Empresa
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Empresas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'Sucursales',
      timestamps: true,
      paranoid: true, // Soft delete para no perder historial de movimientos de caja de la sucursal
    }
  )
}

export default SucursalModel
