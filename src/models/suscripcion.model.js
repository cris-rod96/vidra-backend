import { DataTypes } from 'sequelize'
import { SUSCRIPCIONES_PLAN } from '../data/index.data.js'

const SuscripcionModel = (sq) => {
  sq.define(
    'Suscripcion',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      plan: {
        type: DataTypes.ENUM,
        values: SUSCRIPCIONES_PLAN, // ['Básico', 'Profesional', 'Enterprise']
        allowNull: false,
      },
      fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // --- LÍMITES DINÁMICOS ---
      limiteSucursales: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      limiteUsuarios: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
      },
      // Útil para controlar costos de AWS/Cloudinary por las imágenes de eco
      limiteAlmacenamientoGB: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 1.0,
      },
      // Para saber si el plan actual incluye firma electrónica ilimitada
      incluyeFirmaDigital: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      estado: {
        type: DataTypes.ENUM('Activa', 'Expirada', 'Suspendida', 'Pendiente_Pago'),
        defaultValue: 'Activa',
      },
      // --- CONTROL DE RENOVACIÓN ---
      autoRenovacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      idPasarelaPago: {
        type: DataTypes.STRING, // ID de suscripción en Kushki, Payphone o Stripe
        allowNull: true,
      },
      // --- RELACIONES ---
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'Suscripciones',
      timestamps: true,
    }
  )
}

export default SuscripcionModel
