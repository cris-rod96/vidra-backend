import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { VAR_ENVS } from '../../config/index.config.js'
const hashPasswowrd = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    })
  } catch (error) {
    throw new Error('Error al procesar la seguridad de la clave')
  }
}
const comparePassword = async (hash, password) => {
  try {
    return await argon2.verify(hash, password)
  } catch (error) {
    return false
  }
}

const generarToken = (data) => {
  const payload = {
    id: data.id,
    rol: data.rol,
    EmpresaId: data.EmpresaId,
    SucursalId: data.SucursalId,
    nombre: data.Persona?.nombresCompletos || 'Usuario',
  }
  return jwt.sign(payload, VAR_ENVS.JWT_SECRET, { expiresIn: '8h' })
}

const verificarToken = (token) => {
  try {
    return jwt.verify(token, VAR_ENVS.JWT_SECRET)
  } catch (error) {
    return false
  }
}

export default {
  hashPasswowrd,
  comparePassword,
  generarToken,
  verificarToken,
}
