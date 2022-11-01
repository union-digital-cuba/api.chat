import { Message } from '../../model/models'
import { Console } from '../../utils/console'

export const MessageService = {
  Insert: async ({ message, type, sender, receiver, date }) => {
    try {
      const created = await Message.create({ message, type, sender, receiver, date })
      Console.Info(`The message has been created`)

      await created.save()
      return created
    } catch (error) {
      Console.Error(`MessageServices - Insert -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetAllFromTo: async ({ sender, receiver, type }) => {
    try {
      return await Message.findAll({
        where: { sender: sender, receiver: receiver, type: type },
        order: [['date', 'DESC']],
      })
    } catch (error) {
      Console.Error(`MessageServices - GetAllFromTo-> ${error.message}`)
      throw new Error(error)
    }
  },
  GetOneFromTo: async ({ sender, receiver, type }) => {
    try {
      return await Message.findOne({
        where: { sender: sender, receiver: receiver, type: type },
      })
    } catch (error) {
      Console.Error(`MessageServices - GetOneFromTo-> ${error.message}`)
      throw new Error(error)
    }
  },
  // GetMessageBySendedBy: async (sendedBy) => {
  //   try {
  //     const rows = await Message.findAll({ where: { sendedBy: sendedBy } })
  //     return rows
  //   } catch (error) {
  //     Console.Error(`getMessageBySendedBy -> ${error.message}`)
  //     throw new Error(error)
  //   }
  // },

  // GetMessageBySendedTo: async (sendedTo) => {
  //   try {
  //     const rows = await Message.findAll({ where: { sendedTo: sendedTo } })
  //     return rows
  //   } catch (error) {
  //     Console.Error(`getMessageBySendedTo -> ${error.message}`)
  //     throw new Error(error)
  //   }
  // },
}
