import { System } from '../../model/models'
import { Console } from '../../utils/console'

export const SystemService = {
  Seed: async () => {
    try {
      const defaultSystem = await System.findOne({ where: { default: true } })
      if (!defaultSystem) {
        const system = {
          default: true,
        }
        const created = await System.create(system)
        await created.save()

        return true
      }
      return false
    } catch (error) {
      Console.Error(`SystemService -> Seed -> ${error.message}`)
      throw Error(error.message)
    }
  },
}
