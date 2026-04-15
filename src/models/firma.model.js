import { DataTypes } from 'sequelize'

const FirmaDigitalModel = (sq) => {
  sq.define(
    'FirmaDigital',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      // Ruta del archivo .p12 o .pfx en el servidor (fuera del public folder)
      pathCertificado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // El nombre del emisor (ANF, Security Data, Banco Central, etc.)
      emisor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false, // Es vital para bloquear el proceso si ya caducó
      },
      // PIN/Clave de la firma (SIEMPRE encriptado, nunca en texto plano)
      pinEncriptado: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Guardar usando una clave de cifrado de servidor (AES-256)',
      },
      estaActiva: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      // --- RELACIONES ---
      UsuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true, // Un certificado por médico
        references: { model: 'Usuarios', key: 'id' },
      },
      EmpresaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Empresas', key: 'id' },
      },
    },
    {
      tableName: 'FirmasDigitales',
      timestamps: true,
      paranoid: true, // Importante para auditorías de documentos firmados antiguos
    }
  )
}

export default FirmaDigitalModel
