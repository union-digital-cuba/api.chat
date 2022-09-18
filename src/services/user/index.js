import { User } from '../../model/models'
import { Console } from '../../utils/handleConsole'

export const UserService = {
  //! insert user
  InsertUser: async (user) => {
    try {
      const created = await User.create(user)
      Console.Info(`user has been created`)
      await created.save()
      return created
    } catch (error) {
      Console.Error(`insertUser -> ${error.message}`)
      throw new Error(error)
    }
  },

  //! read users
  GetAllUsers: async () => {
    try {
      return await User.findAll()
    } catch (error) {
      Console.Error(`getAllUsers -> ${error.message}`)
      throw new Error(error)
    }
  },

  //! read one user by id
  GetUser: async (id) => {
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

  //! delete one
  DeleteUser: async (id) => {
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
