import { Log, Persona, Usuario } from '../../lib/db.lib.js'
import { authUtils } from '../../utils/index.utils.js'

const login = async (data) => {
  try {
    const { alias, clave, ip, dispositivo } = data

    // 1. Búsqueda con alias
    const usuario = await Usuario.findOne({
      where: { alias },
      include: [Persona],
    })

    if (!usuario) return { code: 404, message: 'Credenciales inválidas' }
    if (usuario.estado !== 'Activo') return { code: 403, message: 'Cuenta suspendida' }

    // 2. Validar contraseña ANTES de tocar los Logs
    const claveValida = await authUtils.comparePassword(usuario.password, clave) // Ojo: ¿es 'clave' o 'password' en tu modelo?
    if (!claveValida) return { code: 401, message: 'Credenciales inválidas' }

    // 3. MATAR SESIONES PREVIAS (Para evitar el bloqueo de "sesión activa")
    // Esto asegura que si se olvidó de cerrar sesión, la nueva entrada sea la válida.
    await Log.update(
      { estado: 'Inactivo', fechaCierre: new Date() },
      {
        where: {
          UsuarioId: usuario.id,
          estado: 'Activo',
        },
      }
    )

    // 4. Generar Token y Nuevo Log
    const token = authUtils.generarToken(usuario)

    await Log.create({
      dispositivo,
      ip,
      tokenAsociado: token,
      UsuarioId: usuario.id,
      EmpresaId: usuario.EmpresaId,
      SucursalId: usuario.SucursalId,
    })

    // 5. Limpiar objeto de respuesta
    const userClean = usuario.get({ plain: true })
    delete userClean.password // Asegúrate de borrar el campo correcto
    delete userClean.clave

    return {
      code: 200,
      message: 'Inicio de sesión exitoso',
      token,
      user: userClean,
    }
  } catch (error) {
    console.error('Login Error:', error)
    return { code: 500, message: 'Error interno del servidor' }
  }
}

export { login }
