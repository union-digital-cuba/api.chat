import socket from 'socket.io'

import { Console } from '../utils/console'
import { MessageType } from '../utils/enums'
import { Configuration } from '../env/configuration'

const { FRONTHOST } = Configuration

const Listener = {
  Socket: (httpServer) => {
    const store = { socket: null, users: new Map(), rooms: [] }

    const io = socket(httpServer, {
      // transports: ['polling'],
      // pingInterval: 10000,
      // pingTimeout: 5000,
      cors: {
        origin: [FRONTHOST, '100.100.100.2:3000'],
        credentials: true,
        // methods: ['GET', 'POST'],
      },
      autoConnect: false,
    })

    io.on('connection', (socket) => {
      Console.Log(`🔌 Socket: Connection has been made... ${FRONTHOST}`)

      store.socket = socket

      //? Disconnect from system...
      socket.on('disconnect', () => {
        Console.Log(`🔌 Socket: Disconnection...`)
      })

      //? Add user to alls groups
      socket.on('add-user', (user) => {
        Console.Log(`🔌 Socket: ${socket.id} - Add user ${user.username}...`)
        store.users.set(user.id, { name: user.username, socketId: socket.id })
        // socket.join(socket.id)
      })

      //? Add user to all groups
      socket.on('join', (room) => {
        const current = store.rooms.find((p) => p.id === room.id)
        if (current) {
          const socketId = current.value.find((p) => p === socket.id)
          if (!socketId) current.value.push(socket.id)
        } else {
          store.rooms.push({ id: room.id, value: [socket.id] })
        }

        socket.join(room.id)
        socket.to(room.id).emit('user-joined', socket.id)
        Console.Log(`🔌 Socket: ${room.name} - Add room...`)
      })

      //? Leave user to all groups
      socket.on('leave', () => {
        for (const room of store.rooms) {
          const fitlered = room.value.filter((p) => p !== socket.id)
          room.value = [...fitlered]

          socket.leave(room.id)
          socket.to(room.id).emit('user-left', socket.id)
        }

        Console.Log(`🔌 Socket: ${socket.id} - Leave room...`)
      })

      //? Send message to group or user
      socket.on('send-message', ({ data, type }) => {
        if (type === MessageType.Group) {
          socket.to(data.receiver.id).emit('message', data)
          Console.Log(`🔌 Socket: Send message to group - message: ${data.message}...`)
        } else {
          const { name, socketId } = store.users.get(data.receiver.id)
          socket.to(socketId).emit('message', data)
          Console.Log(`🔌 Socket: Send message to user ${name} - message: ${data.message}...`)
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
