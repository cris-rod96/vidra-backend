import { DataTypes } from 'sequelize'
import { ESTADOS } from '../data/index.data.js'

const ProductoModel = (sq) => {
  sq.define(
    'Producto',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      principioActivo: {
        type: DataTypes.STRING, // Útil para farmacia (ej: Paracetamol)
        allowNull: true,
      },
      codigoBarra: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      concentracion: {
        type: DataTypes.STRING, // Ej: "500mg" o "100ml"
        allowNull: true,
      },
      stockActual: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      stockMinimo: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
      },
      precioVenta: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      esParaVenta: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // true: Farmacia / false: Insumo interno
      },
      estado: {
        type: DataTypes.ENUM,
        values: ESTADOS,
        defaultValue: 'Activo',
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'Productos',
      timestamps: true,
    }
  )
}

export default ProductoModel
