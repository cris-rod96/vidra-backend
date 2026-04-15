import { DataTypes } from 'sequelize'
import { CAJAS_ESTADOS } from '../data/index.data.js'

const CajaModel = (sq) => {
  sq.define(
    'Caja',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      fechaApertura: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      fechaCierre: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      montoApertura: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      // Lo que el sistema CALCULÓ que debería haber (Suma de pagos + apertura)
      montoEsperado: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      // Lo que el cajero contó FÍSICAMENTE al cerrar
      montoReal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      // La diferencia (Faltante o Sobrante)
      diferencia: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      // Totales desglosados para el reporte de cierre
      totalEfectivo: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      totalTransferencia: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      totalTarjeta: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      // Otros ingresos (ej. cobro de farmacia) o egresos menores
      totalOtrosIngresos: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      totalEgresos: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      estado: {
        type: DataTypes.ENUM,
        values: CAJAS_ESTADOS, // ['Abierta', 'Cerrada', 'Auditada']
        defaultValue: 'Abierta',
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- RELACIONES ---
      UsuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
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
      tableName: 'Cajas',
      timestamps: true,
      indexes: [
        {
          fields: ['SucursalId'],
        },
        {
          fields: ['EmpresaId'],
        },
        {
          fields: ['UsuarioId'],
        },
      ],
    }
  )
}

export default CajaModel
