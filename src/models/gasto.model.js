import { DataTypes } from 'sequelize'
import { GASTOS, METODOS_PAGO } from '../data/index.data.js'

const GastoModel = (sq) => {
  sq.define(
    'Gasto',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      categoria: {
        type: DataTypes.ENUM,
        values: GASTOS, // Ej: 'Servicios Básicos', 'Arriendo', 'Insumos Médicos', 'Nómina'
        allowNull: false,
      },
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false, // Ej: "Pago de luz mes de Marzo - Sucursal Centro"
      },
      fechaGasto: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      metodoPago: {
        type: DataTypes.ENUM,
        values: METODOS_PAGO, // ['Efectivo', 'Transferencia', 'Tarjeta', 'Caja Chica']
        allowNull: false,
      },
      numeroComprobante: {
        type: DataTypes.STRING, // Factura o recibo del proveedor
        allowNull: true,
      },
      urlComprobante: {
        type: DataTypes.STRING, // Link a Cloudinary/S3 con la foto del documento
        allowNull: true,
      },
      // --- RELACIONES ---
      ProveedorId: {
        type: DataTypes.UUID,
        allowNull: true, // Opcional, por si es un gasto menor sin proveedor registrado
        references: { model: 'Proveedores', key: 'id' },
      },
      SucursalId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Sucursales', key: 'id' },
      },
      UsuarioId: {
        type: DataTypes.UUID,
        allowNull: false, // Quién registró el gasto
        references: { model: 'Usuarios', key: 'id' },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'Gastos',
      timestamps: true,
      paranoid: true, // No queremos borrar registros contables físicamente
    }
  )
}

export default GastoModel
