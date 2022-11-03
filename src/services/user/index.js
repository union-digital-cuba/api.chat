import { Op } from 'sequelize'
import { GetMultiAvatar } from '../../api/multiavatar'
import { User, User_Group, Group, System } from '../../model/models'
import { Console } from '../../utils/console'
import { HelperDate, DateTime } from '../../utils/dates'

export const UserService = {
  Seed: async () => {
    try {
      const users = [
        { username: 'accarbonell', email: 'accarbonell1987@gmail.com', password: 'secret' },
        { username: 'rebecca', email: 'rebecca@gmail.com', password: 'secret' },
        { username: 'tito', email: 'tito@gmail.com', password: 'secret' },
        { username: 'popi', email: 'popi@gmail.com', password: 'secret' },
      ]

      var saveAny = false
      for (let user of users) {
        const userExist = await User.findOne({ where: { username: user.username } })
        if (!userExist) {
          const image = await GetMultiAvatar(user.username)
          const userWithImage = { ...user, isSetAvatar: true, image: image }

          const created = await User.create(userWithImage)
          await created.save()

          const newRelation = await User_Group.create({ userId: created.id, groupId: 0 })
          await newRelation.save()

          const group = await Group.findOne({ where: { id: 0 } })
          group.amount = group.amount + 1
          await group.save()

          saveAny = true
        }
      }

      if (saveAny) {
        var defaultSystem = await System.findOne({ where: { default: true } })
        defaultSystem.userInit = true
        await defaultSystem.save()

        return true
      }

      return false
    } catch (error) {
      Console.Error(`Seed -> ${error.message}`)
      throw new Error(error)
    }
  },
  Login: async (username, password) => {
    try {
      const user = await User.findOne({
        where: { username: username, password: password },
      })

      if (!user) throw Error(`User ${username} and password *** is not registered`)

      user.activity = HelperDate.getNow().toSQL()
      await user.save()

      Console.Info(`User ${username} has been logged`)

      return user
    } catch (error) {
      Console.Error(`Login -> ${error.message}`)
      throw new Error(error)
    }
  },
  Register: async (user) => {
    try {
      const { username, email } = user

      const someUserWithUsername = await UserService.GetOneByUsername(username)
      if (someUserWithUsername) throw Error(`Exist user with the same username: ${username}`)

      const someUserWithEmail = await UserService.GetOneByEmail(email)
      if (someUserWithEmail) throw Error(`Exist user with the same email: ${email}`)

      const created = await User.create(user)
      await created.save()

      Console.Info(`User ${username} has been registered...`)

      const newRelation = await User_Group.create({ userId: created.id, groupId: 0 })
      await newRelation.save()

      const group = await Group.findOne({ where: { id: 0 } })
      group.amount = group.amount + 1
      await group.save()

      Console.Info(`User ${username} is in Taberna...`)

      return created
    } catch (error) {
      Console.Error(`Register -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetAll: async () => {
    try {
      return await User.findAll()
    } catch (error) {
      Console.Error(`GetAll -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetUsersByGroup: async (groupId, userId) => {
    try {
      const users = await User.findAll({
        where: { isSetAvatar: true, id: { [Op.ne]: userId } },
        include: { model: Group, where: { id: groupId } },
      })
      return users
    } catch (error) {
      Console.Error(`GetUsersByGroup -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetOneById: async (id) => {
    try {
      const user = await User.findOne({
        where: { id: id },
      })
      return user || null
    } catch (error) {
      Console.Error(`GetOneById -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetOneByUsername: async (username) => {
    try {
      const user = await User.findOne({
        where: { username: username },
      })
      return user || null
    } catch (error) {
      Console.Error(`GetOneByUsername -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetOneByEmail: async (email) => {
    try {
      const user = await User.findOne({
        where: { email: email },
      })
      return user || null
    } catch (error) {
      Console.Error(`GetOneByEmail -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetOnlineUsers: async (id) => {
    try {
      const usersFromGroup = await User.findAll({
        include: { model: Group, where: { id: id } },
      })

      const online = usersFromGroup.filter((u) => {
        if (u.activity) {
          const activityDate = DateTime.fromMillis(Date.parse(u.activity)).toUTC()
          const minutes = DateTime.fromMillis(HelperDate.getNow().toMillis() - activityDate.toMillis()).minute
          return minutes <= 5
        }
      })
      return online || []
    } catch (error) {
      Console.Error(`GetOnlineUsers -> ${error.message}`)
      throw new Error(error)
    }
  },
  Delete: async (id) => {
    try {
      const user = await User.findOne({ where: { id: id } })
      if (!user) throw new Error(`User not found: ${id}`)

      await user.destroy()
      Console.Info(`User ${user.username} has been disable...`)

      return true
    } catch (error) {
      Console.Error(`Delete -> ${error.message}`)
      throw new Error(error)
    }
  },
}
