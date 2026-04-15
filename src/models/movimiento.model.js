import { DataTypes } from 'sequelize'

const MovimientoFinancieroModel = (sq) => {
  sq.define(
    'MovimientoFinanciero',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tipo: {
        type: DataTypes.ENUM('Ingreso', 'Egreso'),
        allowNull: false,
      },
      categoria: {
        type: DataTypes.ENUM(
          'Pago de Turno',
          'Venta Farmacia',
          'Gasto Operativo',
          'Pago de Nómina',
          'Compra de Insumos',
          'Otro'
        ),
        allowNull: false,
      },
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      metodoPago: {
        type: DataTypes.ENUM('Efectivo', 'Transferencia', 'Tarjeta', 'Depósito'),
        allowNull: false,
      },
      referencia: {
        type: DataTypes.STRING, // Ej: Número de factura de luz o # de comprobante
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT, // Ej: "Pago de servicios básicos" o "Venta de medicina"
        allowNull: true,
      },
      // --- SALDOS PARA AUDITORÍA ---
      saldoAnterior: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      saldoPosterior: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      // --- RELACIONES ---
      CajaId: {
        type: DataTypes.UUID,
        allowNull: false, // Todo movimiento financiero vive dentro de una caja abierta
        references: { model: 'Cajas', key: 'id' },
      },
      UsuarioId: {
        type: DataTypes.UUID,
        allowNull: false, // Quién registró el movimiento
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
    },
    {
      tableName: 'MovimientosFinancieros',
      timestamps: true,
      updatedAt: false, // Al igual que el Kardex, el dinero no se edita, se anula o se ajusta
    }
  )
}

export default MovimientoFinancieroModel
