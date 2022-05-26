import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import io from 'socket.io'
import http from 'http'
import { start } from './model/orm'

import { version, description, author } from '../package.json'
import { consoleInfo } from './utils/handleConsole'
import { systemRoutes } from './routes/routesSystem'

// cargando puertos de configuracion
const PORT = process.env.PORT || 3000
const SERVER = process.env.SERVER || 'localhost'

// extendiendo de https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Event Checker',
      description: description,
      contact: {
        name: author,
      },
      servers: [`http://${SERVER}:${PORT}`, `https://api-event-checker.herokuapp.com`],
    },
  },
  apis: ['src/routes/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const app = express()

// cargando las variables de entorno
dotenv.config()

// configurando express
app.set('port', PORT)
app.set('json spaces', 2)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(systemRoutes)

app.use(express.static('dist'))

const socketHttp = http.createServer(app)
const socketServer = io(socketHttp, {
  transports: ['polling'],
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    cors: {
      origin: 'http://localhost:3000',
    },
  },
})

const startSequelize = async () => {
  await start()
}

app.listen(PORT, () => {
  startSequelize()
  consoleInfo(`API v${version}, Server Started at: http://${SERVER}:${PORT} ☕`)
})

export { socketServer }
