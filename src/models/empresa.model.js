import { DataTypes } from 'sequelize'
import { ESTADOS } from '../data/index.data.js'

const EmpresaModel = (sq) => {
  sq.define(
    'Empresa',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // RUC es STRING porque puede empezar con 0 y debe tener 13 dígitos
      ruc: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true,
        validate: {
          len: [13, 13],
          isNumeric: true,
        },
      },
      razonSocial: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombreComercial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      direccionMatriz: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      // --- NORMATIVA ECUADOR ---
      regimen: {
        type: DataTypes.ENUM('RIMPE-EMPRENDEDOR', 'RIMPE-NEGOCIO-POPULAR', 'REGIMEN-GENERAL'),
        allowNull: true, // Se llena según el RUC
      },
      obligadoContabilidad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      contribuyenteEspecial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      agenteRetencion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // --- REPRESENTANTE LEGAL ---
      representanteLegalNombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      representanteLegalIdentificacion: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      // --- CONFIGURACIÓN ---
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM,
        values: ESTADOS,
        defaultValue: 'Activo',
      },
    },
    {
      tableName: 'Empresas',
      timestamps: true,
      paranoid: true, // Habilita deletedAt para seguridad de datos contables
    }
  )
}

export default EmpresaModel
