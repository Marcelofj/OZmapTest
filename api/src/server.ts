import { app } from './app'
import config from './config/default'
import database from './database/mongoDB'
import Logger from './config/logger'

const { app: { hostname, port } } = config

app.listen(port, async () => {
    Logger.info(`Server running at http://${hostname}:${port}/`)
    await database()
})