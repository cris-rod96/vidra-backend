import { DataTypes } from 'sequelize'

const ServicioModel = (sq) => {
  sq.define(
    'Servicio',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false, // Ej: "Ecografía Abdominal"
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // --- FINANZAS ---
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      aplicaIva: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Por defecto servicios médicos son 0% en Ecuador
      },
      // --- LÓGICA DE NEGOCIO ---
      categoria: {
        type: DataTypes.ENUM('Ecografía', 'Laboratorio', 'Consulta', 'Procedimiento', 'Otro'),
        allowNull: false,
      },
      duracionEstimada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20, // En minutos
      },
      // Para la pantalla de turnos, define si este servicio genera un ticket
      generaTurno: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      // --- SEGMENTACIÓN ---
      // idsSucursales: Lo mantenemos como ARRAY si usas Postgres,
      // pero asegúrate de que tu DB sea PostgreSQL.
      idsSucursales: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
      },
      estaActivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      // --- RELACIONES ---
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
      tableName: 'Servicios',
      timestamps: true,
      paranoid: true, // Si eliminan un servicio, no queremos romper los reportes de ventas antiguos
    }
  )
}

export default ServicioModel
