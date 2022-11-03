import { UUIDV4 } from 'sequelize'
import { Op } from 'sequelize'
import { Message } from '../../model/models'
import { Console } from '../../utils/console'
import { MessageType } from '../../utils/enums'

export const MessageService = {
  Insert: async ({ message, type, sender, receiver, date }) => {
    try {
      var exist = await Message.findOne({
        where: {
          [Op.or]: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender },
          ],
        },
      })

      var uuid = !exist ? UUIDV4() : exist.conversation
      const created = await Message.create({ message, type, sender, receiver, date, conversation: uuid })
      await created.save()

      Console.Info(`The message has been created`)

      return created
    } catch (error) {
      Console.Error(`MessageServices - Insert -> ${error.message}`)
      throw new Error(error)
    }
  },
  GetUserLastConversation: async ({ conversation, max }) => {
    try {
      const messages = await Message.findAll({
        where: { conversation: conversation, type: MessageType.User },
        order: [['date', 'DESC']],
        limit: max,
      })

      return messages
    } catch (error) {
      Console.Error(`MessageServices - GetUserLastConversation-> ${error.message}`)
      throw new Error(error)
    }
  },
  GetGroupLastConversation: async ({ groupId, max }) => {
    try {
      return await Message.findAll({
        where: { receive: groupId, type: MessageType.Group },
        order: [['date', 'DESC']],
        limit: max,
      })
    } catch (error) {
      Console.Error(`MessageServices - GetGroupLastConversation-> ${error.message}`)
      throw new Error(error)
    }
  },
  GetConversation: async ({ sender, receiver }) => {
    try {
      const message = await Message.findOne({
        where: { sender: sender, receiver: receiver, type: MessageType.User },
        order: [['date', 'DESC']],
      })
      return message.conversation
    } catch (error) {
      Console.Error(`MessageServices - GetConversation-> ${error.message}`)
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
}
