import { DataTypes } from 'sequelize'

const PlantillaInformeModel = (sq) => {
  sq.define(
    'PlantillaInforme',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "Ecografía Abdominal Completa - Normal"
      },
      // Usamos JSONB para permitir que el doctor guarde estructuras complejas
      // o secciones personalizadas (Hígado, Páncreas, Riñones por separado)
      cuerpoPlantilla: {
        type: DataTypes.JSONB,
        allowNull: false,
        comment: 'Contiene los hallazgos segmentados por secciones',
      },
      conclusionPredefinida: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      recomendacionesPredefinidas: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Para saber si esta plantilla es la que debe cargarse por defecto
      esPrincipal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // --- RELACIONES ---
      ServicioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Servicios', key: 'id' },
      },
      DoctorId: {
        type: DataTypes.UUID,
        allowNull: true, // Null = Plantilla Global de la Clínica
        references: { model: 'Usuarios', key: 'id' },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'PlantillasInformes',
      timestamps: true,
      paranoid: true, // Si el doctor borra una plantilla, no queremos perder los informes viejos que la usaron
    }
  )
}

export default PlantillaInformeModel
