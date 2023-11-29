import { AvatarService } from '../../services/avatar'
import { Console } from '../../utils/console'

export const AvatarsBLL = {
  GetAvatars: async (req, res) => {
    try {
      const { amount } = req.query
      const avatars = await AvatarService.GetAvatars(amount)
      return res.status(200).json({ statusCode: 200, response: avatars })
    } catch (error) {
      Console.Error(`AvatarsBLL - GetAvatars => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  SetAvatar: async (req, res) => {
    try {
      const { id } = req.query
      const { image } = req.body

      const user = await AvatarService.SetAvatar(id, image)

      return res.status(200).json({ statusCode: 200, response: user })
    } catch (error) {
      Console.Error(`AvatarsBLL - SetAvatar => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
