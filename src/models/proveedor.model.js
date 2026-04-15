import { DataTypes } from 'sequelize'

const ProveedorModel = (sq) => {
  sq.define(
    'Proveedor',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      ruc: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Empresas',
          key: 'id',
        },
      },
      SucursalId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Sucursales',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
      tableName: 'Proveedores',
      indexes: [{ fields: ['SucursalId'] }, { fields: ['EmpresaId'] }],
    }
  )
}

export default ProveedorModel
