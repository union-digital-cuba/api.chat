import { GetSVG, GetTakeLocalAvatars } from '../../utils/avatars'
import { Console } from '../../utils/console'

import { UserService } from '../user'

export const AvatarService = {
  GetAvatars: async (amount) => {
    try {
      const avatarsName = GetTakeLocalAvatars(amount)
      const avatarsSVG = avatarsName.map((p) => GetSVG(p))

      Console.Info(`Get ${amount} avatars...`)

      return avatarsSVG
    } catch (error) {
      Console.Error(`GetAvatars -> ${error.message}`)
      throw new Error(error)
    }
  },

  SetAvatar: async (id, image) => {
    try {
      const user = await UserService.GetOneById(id)
      if (!user) throw Error(`Do not exist user with id: ${id}`)

      user.isSetAvatar = true
      user.image = image
      await user.save()

      Console.Info(`Avatar has change...`)

      return user
    } catch (error) {
      Console.Error(`SetAvatar -> ${error.message}`)
      throw new Error(error)
    }
  },
}
