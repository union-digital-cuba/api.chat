import { Group } from '../../model/models'
import { Console } from '../../utils/console'
import { getCurrentDate } from '../../utils/dates'
import { GroupType } from '../../utils/enums'

export const GroupService = {
  Seed: async () => {
    try {
      var publicGroup = await Group.findOne({ where: { id: 0 } })

      if (!publicGroup) {
        const publicGroup = {
          id: 0,
          name: 'Taberna',
          image: '',
          type: GroupType.Public,
          createdBy: 0,
          date: getCurrentDate(),
        }
        const created = await Group.create(publicGroup)
        await created.save()

        return created
      }
    } catch (error) {
      Console.Error(`GroupService -> Seed -> ${error.message}`)
      throw Error(error.message)
    }
  },
  GetAll: async () => {},
  GetAllPublic: async () => {},
  GetByUserId: async () => {},
  GetById: async () => {},
  Create: async () => {},
  Delete: async () => {},
}
