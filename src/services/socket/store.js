import { MessageType } from '../../utils/enums'

const StoreSocket = {
  Socket: undefined,
  Users: [],
  Add: ({ id, name, room, type }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const exist = StoreSocket.Users.find((user) => user.room === room && user.name === name)
    if (!exist) {
      const user = { id, name, room, type }
      StoreSocket.Users.push(user)
      return { user }
    }

    return { user: undefined }
  },
  Remove: (id) => {
    const index = StoreSocket.Users.findIndex((user) => user.id === id)

    if (index !== -1) return StoreSocket.Users.splice(index, 1)[0]
  },
  GetUser: (username, id) => {
    const composerRoomName = `${username.trim().toLowerCase()}-${id}`
    return StoreSocket.Users.find((user) => user.room === composerRoomName && user.type === MessageType.User)
  },
  GetRoom: (name, id) => {
    const composerRoomName = `${name.trim().toLowerCase()}-${id}`
    return StoreSocket.Users.find((user) => user.room === composerRoomName && user.type === MessageType.Group)
  },
  GetActiveUsersInRoom: (room) =>
    StoreSocket.Users.filter((user) => user.room === room && user.type === MessageType.Group),
}

export default StoreSocket
