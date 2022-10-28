import { GroupService } from '../services/group'
import { Console } from './console'

const Loader = async () => {
  try {
    if (await GroupService.Seed()) Console.Info('The initial configuration for Groups..')
    Console.Info(`Intialize database...🚀`)
  } catch (error) {
    Console.Error(`Loader -> ${error.message}`)
  }
}

export { Loader }
