import { Log, Persona, Usuario } from '../../lib/db.lib.js'
import { authUtils } from '../../utils/index.utils.js'

const login = async (data) => {
  try {
    const { alias, clave, ip, dispositivo } = data
    const usuario = await Usuario.findOne({
      where: {
        alias,
      },
      include: [Persona],
    })
    if (!usuario) return { code: 404, message: 'Usuario no encontrado' }
    if (usuario.estado !== 'Activo')
      return { code: 403, message: 'Esta cuenta se encuentra actualmente suspendida' }

    const log = await Log.findOne({
      where: {
        UsuarioId: usuario.id,
      },
    })

    if (log && log.estado === 'Activo')
      return {
        code: 400,
        message:
          'Ya existe una sesión activa. Cierre sesión en otros dispositivos e intente de nuevo.',
      }

    const claveValida = await authUtils.comparePassword(usuario.clave, clave)
    if (!claveValida) return { code: 401, message: 'Contraseña inválida.' }

    const token = authUtils.generarToken(usuario)
    await Log.create({
      dispositivo,
      ip,
      tokenAsociado: token,
      UsuarioId: usuario.id,
      EmpresaId: usuario.EmpresaId,
      SucursalId: usuario.SucursalId,
    })

    const { clave: claveUsuario, ...dataUsuario } = usuario
    return { code: 200, message: 'Inicio de sesión exitoso', token, user: dataUsuario }
  } catch (error) {
    return { code: 500, message: 'Error en el servidor al iniciar sesión ' }
  }
}

export { login }
