import { request, response } from 'express'
import { authUtils } from '../../utils/index.utils.js'

const handleAuth = (req = request, res = response, next) => {
  try {
    const token = req.header('x-token')
    if (!token)
      return res.status(401).json({
        message: 'Acceso denegado. No se proporcionó un token de seguridad',
      })
    const decoded = authUtils.verificarToken(token)
    if (!decoded)
      return res.status(401).json({
        message: 'Token inválido o expirado. Por favor inicie sesión nuevamente.',
      })

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Error en la validación de seguridad.',
    })
  }
}

const handleRoles = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        error: true,
        message: 'No tienes permisos suficientes para realizar esta acción',
      })
    }
    next()
  }
}

export default {
  handleAuth,
  handleRoles,
}
