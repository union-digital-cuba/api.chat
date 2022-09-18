import { UserService } from '../../services/user'
import { Console } from '../../utils/handleConsole'

export const UsersBLL = {
  GetAll: async (req, res) => {
    try {
      const users = await UserService.GetAll()
      return res.status(200).json({ statusCode: 200, response: users })
    } catch (error) {
      Console.Error(`GetAll => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
