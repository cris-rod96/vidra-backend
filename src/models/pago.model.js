import { DataTypes } from 'sequelize'
import { ESTADOS_PAGO, METODOS_PAGO } from '../data/index.data.js'

const PagoModel = (sq) => {
  sq.define(
    'Pago',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      metodoPago: {
        type: DataTypes.ENUM,
        values: METODOS_PAGO, // ['Efectivo', 'Transferencia', 'Tarjeta', 'Depósito']
        allowNull: false,
      },
      referenciaComprobante: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM,
        values: ESTADOS_PAGO, // ['Pagado', 'Reembolsado', 'Anulado']
        defaultValue: 'Pagado',
      },
      // --- NUEVOS CAMPOS PARA DESCUENTOS E IMPUESTOS ---
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      iva: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      descuento: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      // --- RELACIONES ---
      TurnoId: {
        type: DataTypes.UUID,
        allowNull: true, // Ahora es opcional si es venta de farmacia
        references: { model: 'Turnos', key: 'id' },
      },
      // Vínculo opcional si el pago viene de una venta directa de productos
      VentaFarmaciaId: {
        type: DataTypes.UUID,
        allowNull: true,
        // references: { model: 'VentasFarmacia', key: 'id' },
      },
      CajaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Cajas', key: 'id' },
      },
      SucursalId: {
        // Importante para reportes rápidos por local
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
      tableName: 'Pagos',
      timestamps: true,
      indexes: [
        { fields: ['EmpresaId'] },
        { fields: ['SucursalId'] },
        { fields: ['CajaId'] },
        { fields: ['TurnoId'] },
      ],
    }
  )
}

export default PagoModel
