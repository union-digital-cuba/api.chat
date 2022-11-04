// import { socketServer } from '../app'
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

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callBack) => {
    const { user, error } = addUser({ id: socket.id, name, room })
    if (error) return callBack(error)

    socket.join(user.room)
    socket.emit('message', {
      user: 'Admin',
      text: `Welocome to ${user.room}`,
    })

    socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` })
    callBack(null)

    socket.on('sendMessage', ({ message }) => {
      io.to(user.room).emit('message', {
        user: user.name,
        text: message,
      })
    })
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    // console.log(user)
    io.to(user.room).emit('message', {
      user: 'Admin',
      text: `${user.name} just left the room`,
    })
    // console.log('A disconnection has been made')
  })
})
