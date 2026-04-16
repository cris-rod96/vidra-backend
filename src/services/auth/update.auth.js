import { Log } from '../../lib/db.lib.js'

const logout = async (UsuarioId, token) => {
  try {
    // 1. Buscamos el log específico que tenga ese token y esté activo
    const log = await Log.findOne({
      where: {
        UsuarioId,
        tokenAsociado: token,
        estado: 'Activo',
      },
    })

    if (!log) {
      return { code: 404, message: 'No se encontró una sesión activa válida.' }
    }

    // 2. En lugar de borrar (destroy), actualizamos el estado
    // Esto es vital para auditoría médica.
    await log.update({
      estado: 'Inactivo',
      fechaCierre: new Date(),
    })

    return { code: 200, message: 'Cierre de sesión exitoso.' }
  } catch (error) {
    console.error(`[Logout Service Error]: ${error.message}`)
    return { code: 500, message: 'Error interno al procesar el cierre de sesión.' }
  }
}

export { logout }
