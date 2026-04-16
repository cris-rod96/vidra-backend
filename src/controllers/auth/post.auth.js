import { authService } from '../../services/index.services.js'

const login = async (req, res) => {
  try {
    const data = req.body
    const { code, message, token, user } = await authService.login(data)
    res.status(code).json(token ? { message, token, user } : { message })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export { login }
