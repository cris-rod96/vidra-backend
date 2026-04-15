import { DataTypes } from 'sequelize'
import { TIPOS_SANGRE } from '../data/index.data.js'

const PacienteModel = (sq) => {
  sq.define(
    'Paciente',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // --- DATOS CLÍNICOS PERMANENTES ---
      tipoSangre: {
        type: DataTypes.ENUM,
        values: TIPOS_SANGRE,
        allowNull: true,
      },
      alergias: {
        type: DataTypes.TEXT,
        allowNull: true, // Ej: "Penicilina, AINES, Mariscos"
      },
      antecedentesPatologicos: {
        type: DataTypes.TEXT,
        allowNull: true, // Ej: "Diabetes tipo 2, Hipertensión"
      },
      antecedentesFamiliares: {
        type: DataTypes.TEXT,
        allowNull: true, // Ej: "Madre con cáncer de mama"
      },
      medicacionHabitual: {
        type: DataTypes.TEXT,
        allowNull: true, // Medicamentos que toma siempre
      },
      // --- CONTACTO DE EMERGENCIA (Vital en clínicas) ---
      contactoEmergenciaNombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactoEmergenciaTelefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentescoEmergencia: {
        type: DataTypes.STRING,
        allowNull: true, // Ej: "Cónyuge", "Hijo"
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- RELACIONES ---
      PersonaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Personas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Empresas',
          key: 'id',
        },
      },
    },
    {
      tableName: 'Pacientes',
      timestamps: true,
      paranoid: true, // Para no borrar el historial médico asociado por error
    }
  )
}

export default PacienteModel
