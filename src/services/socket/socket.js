import socket, { Socket } from 'socket.io'

import { Console } from '../../utils/console'
import { Configuration } from '../../env/configuration'
import StoreSocket from './store'
import { MessageType } from '../../utils/enums'

const { FRONTHOST } = Configuration

const Listener = {
  Socket: (httpServer) => {
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

      StoreSocket.Socket = socket

      //? Disconnect from system...
      socket.on('disconnect', () => {
        const user = StoreSocket.Remove(socket.id)

        if (user) {
          // io.to(user.room).emit('message', { user: 'System', text: `${user.name} has left.` })
          io.to(user.room).emit('room-online', { room: user.room, users: StoreSocket.GetActiveUsersInRoom(user.room) })

          Console.Log(`🔌 Socket: Disconnection...`)
        }
      })

      //? Add room
      socket.on('join', ({ name, room, type }) => {
        const { user } = StoreSocket.Add({ id: socket.id, name, room, type })

        if (user) {
          socket.join(user.room)

          // socket.emit('message', { user: 'System', text: `${user.name}, welcome to room ${user.room}.` })
          // socket.broadcast.to(user.room).emit('user-online', )

          io.to(user.room).emit('room-online', { room: user.room, users: StoreSocket.GetActiveUsersInRoom(user.room) })

          Console.Log(`🔌 Socket: Add room... (${user.id}, ${user.name}, ${user.room}) `)
        }
      })

      //? Send message to group or user
      socket.on('send-message', ({ message }) => {
        const data =
          message.type === MessageType.Group
            ? StoreSocket.GetRoom(message.receiver.name, message.receiver.id)
            : StoreSocket.GetUser(message.receiver.name, message.receiver.id)
        console.log(`Enviado a: (${data?.room},${message.message})`)
        data && socket.to(data.room).emit('message', message)
      })
    })
  },
}

export { Listener }
