import { DataTypes } from 'sequelize'

const DetalleRecetaModel = (sq) => {
  sq.define(
    'DetalleReceta',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // Nombre escrito por el doctor (por si el producto no está en el inventario)
      nombreMedicamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dosis: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "500mg"
      },
      frecuencia: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "Cada 8 horas"
      },
      duracion: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "7 días"
      },
      cantidadDespachar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Ej: 2 cajas o 10 tabletas
      },
      indicacionesAdicionales: {
        type: DataTypes.TEXT,
        allowNull: true, // Ej: "Tomar después de las comidas"
      },
      // --- VÍNCULOS ---
      RecetaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Recetas', key: 'id' },
        onDelete: 'CASCADE',
      },
      // Opcional: Si el medicamento existe en tu catálogo de productos
      ProductoId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'Productos', key: 'id' },
      },
    },
    {
      tableName: 'DetallesRecetas',
      timestamps: false,
    }
  )
}

export default DetalleRecetaModel
