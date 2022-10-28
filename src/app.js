import express from 'express'
import cors from 'cors'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import { ORMFunctions } from './model/orm'

import { version, description, author } from '../package.json'
import { Console } from './utils/console'
import { Loader } from './utils/init'
import { Configuration } from './env/configuration'

import { SystemRoutes } from './routes/system'
import { AuthenticationRoutes } from './routes/authentication'
import { UsersRoutes } from './routes/users'
import { AvatarsRoutes } from './routes/avatars'
import { GroupsRoutes } from './routes/groups'

const { SERVER, PORT, APPNAME, FRONTHOST } = Configuration

//cargando variables de configuracion

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

// configurando express
app.set('port', PORT)
app.set('json spaces', 2)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(SystemRoutes)
app.use('/api', AuthenticationRoutes)
app.use('/api', UsersRoutes)
app.use('/api', AvatarsRoutes)
app.use('/api', GroupsRoutes)

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

const StartSequelize = async () => {
  await ORMFunctions.Start()
  await Loader()
}

httpServer.listen(PORT, SERVER, () => {
  StartSequelize()
  Console.Info(`API v${version}, Server Started at: http://${SERVER}:${PORT} ☕`)
})

export { io }
