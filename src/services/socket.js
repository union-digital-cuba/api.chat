import socket from 'socket.io'

import { Console } from '../utils/console'
import { MessageType } from '../utils/enums'
import { Configuration } from '../env/configuration'

const { FRONTHOST } = Configuration

const Listener = {
  Socket: (httpServer) => {
    const store = { socket: null, users: new Map(), groups: new Map() }

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

    io.on('connection', (socket) => {
      Console.Log(`🔌 Socket: Connection has been made... ${FRONTHOST}`)
      store.socket = socket

      //? Disconnect from system...
      socket.on('disconnect', (user) => {
        Console.Log(`🔌 Socket: Disconnection ${user.id}...`)
        store.users.delete(user.id)
      })

      //? Add user to alls groups
      socket.on('add-user', (user) => {
        Console.Log(`🔌 Socket: ${socket.id} - Add user ${user.username}...`)
        store.users.set(user.id, socket.id)
      })

      //? Addd group to all groups
      socket.on('join', (groupId) => {
        Console.Log(`🔌 Socket: ${socket.id} - Add group...`)
        store.groups.set(groupId, socket.id)
      })

      //? Send message to group or user
      socket.on('send-message', (data) => {
        Console.Log(`🔌 Socket: Try to Send Message...`)

        const socketToSend =
          data.type === MessageType.Group ? store.groups.get(data.receiver.id) : store.users.get(data.receiver.id)

        if (socketToSend) {
          Console.Log(`🔌 Socket: ${socketToSend} - Send message to...`)
          io.to(socketToSend).emit('message', data)
        }
      })
    })
  },
}

export { Listener }

// import { consoleInfo } from '../utils/handleConsole'
// import { insertMessage } from './message'

// //setup event listener
// socketServer.on('connection', (socket) => {
//   consoleInfo('user connected')

//   socket.on('disconnect', function () {
//     consoleInfo('user disconnected')
//   })

//   //Someone is typing
//   socket.on('typing', (data) => {
//     socket.broadcast.emit('notifyTyping', {
//       user: data.user,
//       message: data.message,
//     })
//   })

//   //when soemone stops typing
//   socket.on('stopTyping', () => {
//     socket.broadcast.emit('notifyStopTyping')
//   })

//   socket.on('chat message', function (sendedBy, sendedTo, message) {
//     consoleInfo('message: ' + message)

//     //broadcast message to everyone in port:5000 except yourself.
//     socket.broadcast.emit('received', { message: message })

//     insertMessage({ sendedBy, sendedTo, message })
//   })
// })
