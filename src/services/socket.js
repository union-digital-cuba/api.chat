import { socketServer } from '../app'
import { consoleInfo } from '../utils/handleConsole'
import { insertMessage } from './message'

//setup event listener
socketServer.on('connection', (socket) => {
  consoleInfo('user connected')

  socket.on('disconnect', function () {
    consoleInfo('user disconnected')
  })

  //Someone is typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('notifyTyping', {
      user: data.user,
      message: data.message,
    })
  })

  //when soemone stops typing
  socket.on('stopTyping', () => {
    socket.broadcast.emit('notifyStopTyping')
  })

  socket.on('chat message', function (sendedBy, sendedTo, message) {
    consoleInfo('message: ' + message)

    //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit('received', { message: message })

    insertMessage({ sendedBy, sendedTo, message })
  })
})
