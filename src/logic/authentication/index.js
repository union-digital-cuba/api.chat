import { UserService } from '../../services/user'
import { Console } from '../../utils/handleConsole'

export const AuthenticationBLL = {
  Login: async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await UserService.Login(username, password)

      return res.status(200).json({ statusCode: 200, response: user, message: `${user.username} has Logged In` })
    } catch (error) {
      Console.Error(`Login => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  Register: async (req, res) => {
    const { username, password, email } = req.body
    try {
      const created = await UserService.RegisterUser({ username, password, email })
      return res.status(200).json({ statusCode: 200, response: created })
    } catch (error) {
      Console.Error(`Register => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
