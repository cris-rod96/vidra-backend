import { DataTypes } from 'sequelize'
import { ESTADOS, ROLES_USUARIO } from '../data/index.data.js'

const UsuarioModel = (sq) => {
  sq.define(
    'Usuario',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      clave: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.ENUM,
        values: ROLES_USUARIO,
        allowNull: false,
      },
      // --- SEGURIDAD Y CONTROL ---
      debeCambiarClave: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Útil cuando creas un usuario con clave temporal
      },
      ultimoAcceso: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      intentosFallidos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      estado: {
        type: DataTypes.ENUM,
        values: ESTADOS,
        defaultValue: 'Activo',
      },
      // --- PERFIL MÉDICO (Solo si el rol es Médico) ---
      especialidad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      registroSenescyt: {
        type: DataTypes.STRING,
        allowNull: true, // Vital para la validez de recetas en Ecuador
      },
      firmaDigitalUrl: {
        type: DataTypes.STRING,
        allowNull: true, // Ruta a la imagen de la firma manuscrita para informes
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
      SucursalId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Sucursales',
          key: 'id',
        },
      },
    },
    {
      tableName: 'Usuarios',
      timestamps: true,
      paranoid: true, // IMPORTANTE: No borrar usuarios, solo desactivarlos
    }
  )
}

export default UsuarioModel
