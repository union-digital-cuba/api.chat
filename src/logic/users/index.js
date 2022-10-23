import { UserService } from '../../services/user'
import { Console } from '../../utils/handleConsole'

export const UsersBLL = {
  GetAll: async (req, res) => {
    try {
      const users = await UserService.GetAll()
      return res.status(200).json({ statusCode: 200, response: users })
    } catch (error) {
      Console.Error(`UsersBLL - GetAll => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  SetAvatar: async (req, res) => {
    try {
      const { id } = req.query
      const { image } = req.body

      const user = await UserService.SetAvatar(id, image)

      return res.status(200).json({ statusCode: 200, response: user })
    } catch (error) {
      Console.Error(`UsersBLL - SetAvatar => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  Delete: async (req, res) => {
    try {
      const { id } = req.params

      const user = await UserService.Delete(id)
      return res.status(200).json({ statusCode: 200, response: user })
    } catch (error) {
      Console.Error(`UsersBLL - Delete => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
