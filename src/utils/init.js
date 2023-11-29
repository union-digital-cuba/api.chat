import { GroupService } from '../services/group'
import { SystemService } from '../services/system'
import { UserService } from '../services/user'
import { Console } from './console'

const Loader = async () => {
  try {
    if (await SystemService.Seed()) Console.Info('The initial configuration for System...⚙️')
    if (await GroupService.Seed()) Console.Info('The initial configuration for Groups...🎃')
    if (await UserService.Seed()) Console.Info('The initial configuration for Users...👥')

    Console.Info(`Intialize database...🚀`)
  } catch (error) {
    Console.Error(`Loader -> ${error.message}`)
  }
}

export { Loader }
