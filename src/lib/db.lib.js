import { Sequelize } from 'sequelize'
import { CONFIG } from '../config/index.config.js'

const sq = new Sequelize(CONFIG.DATABASE_CONFIG.URI, CONFIG.DATABASE_CONFIG.OPTIONS)

export { sq }
