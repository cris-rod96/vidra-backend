import { authService } from '../../services/index.services.js'

const login = async (req, res) => {
  try {
    const loginData = {
      alias: req.body.alias,
      clave: req.body.clave,
      ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      dispositivo: req.headers['user-agent'] || 'Dispositivo desconocido',
    }

    const result = await authService.login(loginData)

    const { code, message, token, user } = result

    if (token) {
      return res.status(code).json({
        error: false,
        message,
        token,
        user,
      })
    }

    return res.status(code).json({
      error: true,
      message,
    })
  } catch (error) {
    console.error(`[Login Controller Error]: ${error.message}`)

    res.status(500).json({
      error: true,
      message: 'Ocurrió un error inesperado en el servidor.',
    })
  }
}

export { login }
