const StoreSocket = {
  Rooms: {},
  Users: {},
  Add: ({ name, room, socket }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //adicionar Usuario
    StoreSocket.Users[name] = socket.id

    //adicionar el Socket del usuario al grupo
    const users = StoreSocket.Rooms[room] || new Map()
    StoreSocket.Rooms[room] = users.set(name, socket.id)

    // StoreSocket.Rooms[room].users[StoreSocket.Socket.id] = name
    socket.join(room)
  },
  Remove: ({ name, room, socket }) => {
    const current = StoreSocket.Rooms[room]
    current.delete(name)

    socket.leave(room)
  },
  GetActiveUsersInRoom: (room) => {
    return StoreSocket.Rooms[room]
  },
}

export default StoreSocket
