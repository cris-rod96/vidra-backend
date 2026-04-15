import { DataTypes } from 'sequelize'
import { SEXOS_PERSONA } from '../data/index.data.js'

const PersonaModel = (sq) => {
  sq.define(
    'Persona',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombresCompletos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Validado para Cédula/Pasaporte
      dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      tipoDni: {
        type: DataTypes.ENUM('Cédula', 'Pasaporte', 'RUC'),
        defaultValue: 'Cédula',
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.ENUM,
        values: SEXOS_PERSONA,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Útil para filtros rápidos en recepcion
      ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estaActivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      // Para saber de dónde viene el paciente (Marketing médico)
      comoSeEntero: {
        type: DataTypes.STRING,
        allowNull: true, // Ej: "Facebook", "Recomendación", "Letrero"
      },
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
      tableName: 'Personas',
      timestamps: true,
      paranoid: true, // Seguridad ante borrados accidentales
      indexes: [{ fields: ['EmpresaId'] }],
    }
  )
}

export default PersonaModel
