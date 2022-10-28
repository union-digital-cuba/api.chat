import { Group, User, User_Group } from '../../model/models'
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
  GetAll: async () => {
    try {
      var groups = await Group.findAll()
      return groups
    } catch (error) {
      Console.Error(`GroupService -> GetAll -> ${error.message}`)
      throw Error(error.message)
    }
  },
  GetAllPublic: async () => {
    try {
      var groups = await Group.findAll({ where: { type: GroupType.Public } })
      return groups
    } catch (error) {
      Console.Error(`GroupService -> GetAllPublic -> ${error.message}`)
      throw Error(error.message)
    }
  },
  GetAllByUserId: async (id) => {
    try {
      var groups = await Group.findAll({ include: { model: User_Group, include: { model: User, where: { id: id } } } })
      return groups
    } catch (error) {
      Console.Error(`GroupService -> GetByUserId -> ${error.message}`)
      throw Error(error.message)
    }
  },
  GetById: async (id) => {
    try {
      var group = await Group.findOne({ where: { id: id } })
      return group
    } catch (error) {
      Console.Error(`GroupService -> GetById -> ${error.message}`)
      throw Error(error.message)
    }
  },
  Create: async (group) => {
    try {
      const findGroup = await Group.findOne({ where: { name: group.name } })

      if (!findGroup) {
        const newGroup = { ...group, date: getCurrentDate() }

        const created = await Group.create(newGroup)
        await created.save()

        return created
      }
    } catch (error) {
      Console.Error(`GroupService -> Create -> ${error.message}`)
      throw Error(error.message)
    }
  },
  AddUserInGroup: async (userId, groupId) => {
    try {
      const findGroup = await Group.findOne({ where: { id: groupId } })
      const findUser = await User.findOne({ where: { id: userId } })

      if (!findGroup) throw Error('Group do not exist...')
      if (!findUser) throw Error('User do not exist...')

      const relation = { userId: userId, groupId: groupId }
      const created = await User_Group.create(relation)

      Console.Info(`Added user ${findUser.username} into group ${findGroup.name}`)

      return created
    } catch (error) {
      Console.Error(`GroupService -> Create -> ${error.message}`)
      throw Error(error.message)
    }
  },
  Delete: async (id) => {
    try {
      const findGroup = await Group.findOne({ where: { id: id } })

      if (!findGroup) throw Error('Group do not exist...')

      await findGroup.destroy()
    } catch (error) {
      Console.Error(`GroupService -> Delete -> ${error.message}`)
      throw Error(error.message)
    }
  },
}
