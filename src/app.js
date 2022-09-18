import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import { start } from './model/orm'

import { version, description, author } from '../package.json'
import { Console } from './utils/handleConsole'

import { SystemRoutes } from './routes/system'

// cargando puertos de configuracion
const PORT = process.env.PORT || 4000
const SERVER = process.env.SERVER || 'localhost'
const APPNAME = process.env.APPNAME || 'api-event-checker'
const FRONTHOST = process.env.FRONTHOST || 'http://localhost:3000'

// extendiendo de https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Event Checker',
      description: description,
      contact: {
        name: author,
      },
      servers: [`http://${SERVER}:${PORT}`, `https://${APPNAME}.herokuapp.com`],
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
app.use(SystemRoutes)

app.use(express.static('dist'))

const httpServer = http.createServer(app)
const io = new SocketServer(httpServer, {
  // transports: ['polling'],
  // pingInterval: 10000,
  // pingTimeout: 5000,
  cors: {
    origin: FRONTHOST,
    methods: ['GET', 'POST'],
  },
})

// io.on('connection', (socket) => {
//   consoleInfo(`user connected ${socket.id}`)

//   socket.on('send_message', (data) => {
//     socket.emit('receive_message', data)
//   })

//   socket.on('disconnect', function () {
//     consoleInfo('user disconnected')
//   })
// })

const startSequelize = async () => {
  await start()
}

httpServer.listen(PORT, SERVER, () => {
  startSequelize()
  Console.Info(`API v${version}, Server Started at: http://${SERVER}:${PORT} ☕`)
})

export { io }
