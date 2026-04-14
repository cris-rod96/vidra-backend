import 'dotenv/config'

const defaultConfigDatabase = {
  logging: false,
  native: false,
  dialect: 'postgres',
}

const { PORT = 3000, NODE_ENV = 'development', DATABASE_URI_PROD, DATABASE_URI_DEV } = process.env

const DATABASE_CONFIG = {
  URI: NODE_ENV === 'development' ? DATABASE_URI_DEV : DATABASE_URI_DEV,
  OPTIONS:
    NODE_ENV === 'development'
      ? { ...defaultConfigDatabase }
      : {
          ...defaultConfigDatabase,
          dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
        },
}

export const VAR_ENVS = {
  PORT,
  NODE_ENV,
}

export const CONFIG = {
  DATABASE_CONFIG,
}
