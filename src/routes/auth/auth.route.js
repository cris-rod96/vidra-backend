import { Router } from 'express'
import { authControllers } from '../../controllers/index.controllers.js'
import { authMiddleware } from '../../middlewares/index.middlewares.js'

const authRouter = Router()

authRouter.post('/iniciar-sesion', authControllers.login)
authRouter.patch('/cerrar-sesion', authMiddleware.handleAuth, authControllers.logout)

export default authRouter
