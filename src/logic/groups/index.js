import { GroupService } from '../../services/group'
import { Console } from '../../utils/console'

export const GroupBLL = {
  GetAll: async (req, res) => {
    try {
      const groups = await GroupService.GetAll()
      return res.status(200).json({ statusCode: 200, response: groups })
    } catch (error) {
      Console.Error(`GroupBLL - GetAll => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetAllPublic: async (req, res) => {
    try {
      const groups = await GroupService.GetAllPublic()
      return res.status(200).json({ statusCode: 200, response: groups })
    } catch (error) {
      Console.Error(`UsersBLL - GetAllPublic => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetAllByUserId: async (req, res) => {
    try {
      const { id } = req.query
      const groups = await GroupService.GetAllByUserId(id)
      return res.status(200).json({ statusCode: 200, response: groups })
    } catch (error) {
      Console.Error(`GroupBLL - GetAllByUserId => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetById: async (req, res) => {
    try {
      const { id } = req.query
      const group = await GroupService.GetById(id)
      return res.status(200).json({ statusCode: 200, response: group })
    } catch (error) {
      Console.Error(`GroupBLL - GetAllById => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  Create: async (req, res) => {
    try {
      const group = req.body
      const created = await GroupService.Create(group)
      return res.status(200).json({ statusCode: 200, response: created })
    } catch (error) {
      Console.Error(`GroupBLL - Create => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  AddUsersInGroup: async (req, res) => {
    try {
      const { groupId } = req.query
      const { usersIds } = req.body

      await GroupService.AddUsersInGroup(usersIds, groupId)
      return res.status(200).json({ statusCode: 200, response: 'OK' })
    } catch (error) {
      Console.Error(`GroupBLL - AddUserInGroup => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  Delete: async (req, res) => {
    try {
      const { id } = req.params

      const group = await GroupService.Delete(id)
      return res.status(200).json({ statusCode: 200, response: group })
    } catch (error) {
      Console.Error(`GroupBLL - Delete => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
