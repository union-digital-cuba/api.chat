import socket from 'socket.io'

import { Console } from '../../utils/console'
import { Configuration } from '../../env/configuration'
import StoreSocket from './store'

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

      const data = {
        room: undefined,
      }

      //? Disconnect from system...
      socket.on('disconnect', () => {
        // const user = StoreSocket.Remove(socket.id)

        // if (user) {
        //   // io.to(user.room).emit('message', { user: 'System', text: `${user.name} has left.` })
        //   io.to(user.room).emit('room-online', { room: user.room, users: StoreSocket.GetActiveUsersInRoom(user.room) })
        Console.Log(`🔌 Socket: Disconnection...`)
        // }
      })

      //? Add user
      socket.on('new-user', ({ name, room }) => {
        data.room = room
        StoreSocket.Add({ name, room, socket })
        Console.Log(`🔌 Socket: Add user... ${StoreSocket.UserRoom}`)
      })

      //? Add room
      socket.on('join', ({ name, room }) => {
        StoreSocket.Add({ name, room, socket })
        // io.to(user.room).emit('room-online', { room: user.room, users: StoreSocket.GetActiveUsersInRoom(user.room) })
        Console.Log(`🔌 Socket: Joined to Room...${room}`)
      })

      //? Leave room
      socket.on('leave', ({ name, room }) => {
        StoreSocket.Remove({ name, room, socket })
        Console.Log(`🔌 Socket: Leaving the Room... ${room}`)
      })

      //? Send message to group or user
      socket.on('send-message', ({ room, message }) => {
        socket.to(room).emit('message', message)
      })
    })
  },
}

export { Listener }
