import { Router } from 'express'
import { authControllers } from '../../controllers/index.controllers.js'

const authRouter = Router()

authRouter.post('/iniciar-sesion', authControllers.login)
authRouter.patch('/cerrar-sesion', authControllers.logout)

export default authRouter
