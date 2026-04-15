import { DataTypes } from 'sequelize'
import { GASTOS } from '../data/index.data.js'

const GastoModel = (sq) => {
  sq.define(
    'Gasto',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      categoria: {
        type: DataTypes.ENUM,
        values: GASTOS,
        allowNull: false,
      },
    },
    {
      tableName: 'Gastos',
      timestamps: true,
    }
  )
}

export default GastoModel
