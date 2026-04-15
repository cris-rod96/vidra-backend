import { DataTypes } from 'sequelize'

const InformeFinalModel = (sq) => {
  sq.define(
    'InformeFinal',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      codigoInforme: {
        type: DataTypes.STRING, // Ej: ECO-2026-105
        allowNull: false,
        unique: true,
      },
      // El contenido final editado por el doctor
      cuerpoInforme: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      conclusion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // Array de URLs de Cloudinary o S3 con las capturas de la eco
      imagenes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      // Datos de la firma electrónica al momento de generar el PDF
      estaFirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fechaFirma: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // --- RELACIONES ---
      TurnoId: {
        type: DataTypes.UUID, // El turno que originó este informe
        allowNull: false,
        references: { model: 'Turnos', key: 'id' },
      },
      PacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Pacientes', key: 'id' },
      },
      DoctorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Usuarios', key: 'id' },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'InformesFinales',
      timestamps: true,
      paranoid: true,
    }
  )
}

export default InformeFinalModel
