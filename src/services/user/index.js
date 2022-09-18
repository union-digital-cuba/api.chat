import { User } from '../../model/models'
import { Console } from '../../utils/handleConsole'

export const UserService = {
  Login: async (username, password) => {
    try {
      const user = await User.findOne({
        where: { username: username, password: password },
      })

      Console.Info(`User ${username} has been logged`)

      return user
    } catch (error) {
      Console.Error(`LoginUser -> ${error.message}`)
      throw new Error(error)
    }
  },
  Register: async (user) => {
    try {
      const { username } = user
      const created = await User.create(user)

      Console.Info(`User ${username} has been registered`)

      await created.save()
      return created
    } catch (error) {
      Console.Error(`RegisterUser -> ${error.message}`)
      throw new Error(error)
    }
  },

  GetAll: async () => {
    try {
      return await User.findAll()
    } catch (error) {
      Console.Error(`getAllUsers -> ${error.message}`)
      throw new Error(error)
    }
  },

  GetOne: async (id) => {
    try {
      const row = await User.findOne({
        where: { id: id },
      })
      return row | null
    } catch (error) {
      Console.Error(`getUser -> ${error.message}`)
      throw new Error(error)
    }
  },

  Delete: async (id) => {
    try {
      const row = await User.findOne({ where: { id: id } })
      if (!row) throw new Error(`user not found: ${id}`)

      await row.destroy()
      Console.Info(`client ${row.id} has been disable...`)

      return true
    } catch (error) {
      Console.Error(`DeshabilitarCliente -> ${error.message}`)
      throw new Error(error)
    }
  },
}
