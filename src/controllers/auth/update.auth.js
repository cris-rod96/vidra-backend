import { authService } from '../../services/index.services.js'

const logout = async (req, res) => {
  try {
    // 1. Extraemos el token directamente del header personalizado
    const token = req.header('x-token')

    /**
     * El ID del usuario sigue viniendo de req.user porque el middleware
     * lo inyectó tras validar ese mismo x-token.
     */
    const usuarioId = req.user.id

    if (!token) {
      return res.status(400).json({
        error: true,
        message: 'No se encontró el token en la petición.',
      })
    }

    // 2. Llamada al servicio
    const { code, message } = await authService.logout(usuarioId, token)

    // 3. Respuesta al cliente
    return res.status(code).json({
      error: code !== 200,
      message,
    })
  } catch (error) {
    console.error(`[Logout Controller Error]: ${error.message}`)

    return res.status(500).json({
      error: true,
      message: 'Ocurrió un error al intentar cerrar la sesión.',
    })
  }
}

export { logout }
