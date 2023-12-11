import express, { Express } from 'express'
import morganMiddleware from './middlewares/morganMiddleware'
import usersRoutes from './v1/routes/users'
import regionsRoutes from './v1/routes/regions'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import cors from 'cors'

const app: Express = express()

app.use(express.json())

app.use(cors())

app.use(morganMiddleware)

app.use('/api/v1/', usersRoutes)
app.use('/api/v1/', regionsRoutes)

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { app }