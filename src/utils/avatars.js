import { GetRandomElementFromList } from './random'
import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'

const listOfAvatarsName = [
  'daniel',
  'elliot',
  'jenny',
  'matthew',
  'molly',
  'steve',
  'berto',
  'indi',
  'jenny',
  'leonard',
  'lili',
  'nancy',
]
const GetRandomAvatarName = () => {
  return GetRandomElementFromList(listOfAvatarsName)
}

const GetTakeLocalAvatars = (amount) => {
  const avatars = []
  while (avatars.length < amount) {
    const name = GetRandomAvatarName()
    if (avatars.indexOf(`${name}.svg`) === -1) avatars.push(`${name}.svg`)
  }
  return avatars
}

const GetSVG = (image) => {
  const option = { encoding: 'utf8', flag: 'r' }
  const imagePath = path.resolve(__dirname, `../assets/images/avatars/${image}`)
  const data = fs.readFileSync(imagePath, option)

  return data
}

const ConvertToBase64 = (data) => {
  const buffer = Buffer.from(data)
  return buffer.toString('base64')
}

export { GetRandomAvatarName, GetTakeLocalAvatars, GetSVG, ConvertToBase64 }
