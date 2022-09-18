import { Message } from '../../model/models'
import { Console } from '../../utils/handleConsole'

export const MessageServices = {
  //! insert message
  InsertMessage: async ({ sendedBy, sendedTo, message }) => {
    try {
      const created = await Message.create({ sendedBy, sendedTo, message })
      Console.Info(`message has been created`)

      await created.save()
      return created
    } catch (error) {
      Console.Error(`insertMessage -> ${error.message}`)
      throw new Error(error)
    }
  },

  //! read messages
  GetAllMessages: async () => {
    try {
      return await Message.findAll()
    } catch (error) {
      Console.Error(`getAllMessages -> ${error.message}`)
      throw new Error(error)
    }
  },

  //! read messages by sendedBy
  GetMessageBySendedBy: async (sendedBy) => {
    try {
      const rows = await Message.findAll({ where: { sendedBy: sendedBy } })
      return rows
    } catch (error) {
      Console.Error(`getMessageBySendedBy -> ${error.message}`)
      throw new Error(error)
    }
  },

  //! read messages by sendedBy
  GetMessageBySendedTo: async (sendedTo) => {
    try {
      const rows = await Message.findAll({ where: { sendedTo: sendedTo } })
      return rows
    } catch (error) {
      Console.Error(`getMessageBySendedTo -> ${error.message}`)
      throw new Error(error)
    }
  },
}
