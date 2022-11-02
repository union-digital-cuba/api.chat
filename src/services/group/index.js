import { GetMultiAvatar } from '../../api/multiavatar'
import { Group, System, User, User_Group } from '../../model/models'
import { Console } from '../../utils/console'
import { HelperDate } from '../../utils/dates'
import { GroupType } from '../../utils/enums'

export const GroupService = {
  Seed: async () => {
    try {
      var publicGroup = await Group.findOne({ where: { id: 0 } })

      const image = await GetMultiAvatar('public')

      if (!publicGroup) {
        const publicGroup = {
          id: 0,
          name: 'Taberna',
          image: image,
          type: GroupType.Public,
          createdBy: 0,
          date: HelperDate.getNowUTCtoSQL(),
        }
        const created = await Group.create(publicGroup)
        await created.save()

        var defaultSystem = await System.findOne({ where: { default: true } })
        defaultSystem.groupInit = true
        await defaultSystem.save()

        return true
      }

      return false
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
      const groups = await Group.findAll({ include: { model: User, where: { id: id } } })

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
        const newGroup = { ...group, date: HelperDate.getNowUTCtoSQL() }

        const created = await Group.create(newGroup)
        await created.save()

        return created
      }
    } catch (error) {
      Console.Error(`GroupService -> Create -> ${error.message}`)
      throw Error(error.message)
    }
  },
  AddUsersInGroup: async (usersIds, groupId) => {
    try {
      const findGroup = await Group.findOne({ where: { id: groupId } })
      if (!findGroup) throw Error('Group do not exist...')

      var amount = findGroup.amount

      for (const userId of usersIds) {
        const findUser = await User.findOne({ where: { id: userId } })
        if (!findUser) throw Error('User do not exist...')

        const relation = { userId: userId, groupId: groupId }
        const created = await User_Group.create(relation)
        await created.save()

        Console.Info(`Added user ${findUser.username} into group ${findGroup.name}`)
        amount++
      }

      findGroup.amount = amount
      await findGroup.save()
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
