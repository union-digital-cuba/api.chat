import express from 'express'
import cors from 'cors'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import socket from 'socket.io'
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
import { MessagesRoutes } from './routes/messages'
import { MessageType } from './utils/enums'

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
app.use('/api', MessagesRoutes)

app.use(express.static('dist'))

const httpServer = http.createServer(app)

const StartSequelize = async () => {
  await ORMFunctions.Start()
  await Loader()
}

httpServer.listen(PORT, SERVER, () => {
  StartSequelize()
  Console.Info(`API v${version}, Server Started at: http://${SERVER}:${PORT} ☕`)
})

//! SOCKET IO
const io = socket(httpServer, {
  // transports: ['polling'],
  // pingInterval: 10000,
  // pingTimeout: 5000,
  cors: {
    origin: FRONTHOST,
    credentials: true,
    // methods: ['GET', 'POST'],
  },
  autoConnect: false,
})

global.onlineUsers = new Map()
global.onlineGroups = new Map()

io.on('connection', (socket) => {
  Console.Log('🔌 Socket: Connection has been made...')
  global.chatSocket = socket

  //? Disconnect from system...
  socket.on('disconnect', (user) => {
    Console.Log(`🔌 Socket: Disconnection ${user.id}...`)
    global.onlineUsers.delete(user.id)
  })

  //? Add user to alls groups
  socket.on('add-user', (user) => {
    Console.Log(`🔌 Socket: ${socket.id} - Add user ${user.username}...`)
    global.onlineUsers.set(user.id, socket.id)
  })

  //? Addd group to all groups
  socket.on('join', (groupId) => {
    Console.Log(`🔌 Socket: ${socket.id} - Add group...`)
    global.onlineGroups.set(groupId, socket.id)
  })

  //? Send message to group or user
  socket.on('send-message', (data) => {
    Console.Log(`🔌 Socket: Try to Send Message...`)

    const socketToSend =
      data.type === MessageType.Group
        ? global.onlineGroups.get(data.receiver.id)
        : global.onlineUsers.get(data.receiver.id)

    console.log(socketToSend)

    if (socketToSend) {
      Console.Log(`🔌 Socket: ${socketToSend} - Send message to...`)
      io.to(socketToSend).emit('message', data)
      // socket.to(socketToSend).emit('message-recieve', data)
    }
  })
})
