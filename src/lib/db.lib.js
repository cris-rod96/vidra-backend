import { Sequelize } from 'sequelize'
import { CONFIG } from '../config/index.config.js'
import { models } from '../models/index.models.js'

const sq = new Sequelize(CONFIG.DATABASE_CONFIG.URI, CONFIG.DATABASE_CONFIG.OPTIONS)

models.forEach((m) => m(sq))

export { sq }
