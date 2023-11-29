import { ConvertToBase64 } from '../../utils/avatars'

export const GetMultiAvatar = async (word) => {
  const avatar = await fetch(`https://api.multiavatar.com/${word}`)
  const image = await avatar.text()
  const base64 = ConvertToBase64(image).toString()

  return base64
}
