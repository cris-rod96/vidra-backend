import { VAR_ENVS } from './src/config/index.config.js'
import { sq } from './src/lib/db.lib.js'
import server from './src/server.js'

server.listen(VAR_ENVS.PORT, () => {
  console.log(`Servidor a la escucha por el puerto: ${VAR_ENVS.PORT}`)

  sq.sync({
    logging: false,
    force: false,
    alter: true,
  })
    .then((res) => {
      console.info('Base de datos conectada con éxito')
    })
    .catch((err) => {
      console.error(`Error al conectar la base de datos: ${err.message}`)
    })
})
