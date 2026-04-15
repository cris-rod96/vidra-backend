import { DataTypes } from 'sequelize'

const ExamenModel = (sq) => {
  sq.define(
    'Examen',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombreExamen: {
        type: DataTypes.STRING, // Ej: "Hemograma Completo"
        allowNull: false,
      },
      valorResultado: {
        type: DataTypes.STRING, // Ej: "14.5"
        allowNull: true,
      },
      unidadMedida: {
        type: DataTypes.STRING, // Ej: "mg/dL" o "g/L"
        allowNull: true,
      },
      rangoReferencia: {
        type: DataTypes.STRING, // Ej: "12.0 - 16.0"
        allowNull: true,
      },
      observacionTecnica: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- RELACIONES ---
      OrdenLaboratorioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'OrdenesLaboratorio', key: 'id' },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'Examenes',
      timestamps: true,
    }
  )
}

export default ExamenModel
