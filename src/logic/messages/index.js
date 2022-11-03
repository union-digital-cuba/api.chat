import { MessageService } from '../../services/messages'
import { UserService } from '../../services/user'
import { GroupService } from '../../services/group'
import { Console } from '../../utils/console'
import { MessageType } from '../../utils/enums'

const MessageUtils = {
  GetMessages: async ({ messages, sender, receiver, type }) => {
    try {
      const messagesToReturn = messages.map((m) => {
        return {
          ...m.toJSON(),
          sender: { id: sender.id, username: sender.username, image: sender.image },
          receiver: {
            id: receiver.id,
            name: type === MessageType.User ? receiver.username : receiver.name,
            image: receiver.image,
          },
        }
      })
      return messagesToReturn
    } catch (error) {
      Console.Error(`MessageUtils - GetMessages => ${error.message}`)
      throw Error(error)
    }
  },
  GetMessage: async ({ message, sender, receiver, type }) => {
    try {
      const messageToReturn = {
        ...message.toJSON(),
        sender: { id: sender.id, username: sender.username, image: sender.image },
        receiver: {
          id: receiver.id,
          name: type === MessageType.User ? receiver.username : receiver.name,
          image: receiver.image,
        },
      }
      return messageToReturn
    } catch (error) {
      Console.Error(`MessageUtils - GetMessage => ${error.message}`)
      throw Error(error)
    }
  },
}

export const MessagesBLL = {
  GetAllFromTo: async (req, res) => {
    try {
      const { sender, receiver, type } = req.query
      const messages = await MessageService.GetAllFromTo({ sender, receiver, type })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver =
        type === MessageType.User ? await UserService.GetOneById(receiver) : await GroupService.GetById(receiver)

      const messagesToReturn = await MessageUtils.GetMessages({
        messages,
        sender: userSender,
        receiver: anyReceiver,
        type: type,
      })

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetAllFromTo => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetGroupLastConversation: async (req, res) => {
    try {
      const { sender, receiver } = req.body
      const messages = await MessageService.GetGroupLastConversation({ groupId: receiver, max: 100 })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver = await GroupService.GetById(receiver)

      const messagesToReturn = await MessageUtils.GetMessages({
        messages,
        sender: userSender,
        receiver: anyReceiver,
        type: MessageType.Group,
      })

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetGroupLastConversation => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetUserLastConversation: async (req, res) => {
    try {
      const { sender, receiver } = req.body

      const conversation = await MessageService.GetConversation(sender, receiver)
      const messages = await MessageService.GetUserLastConversation({ conversation, max: 100 })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver = await UserService.GetOneById(receiver)

      const messagesToReturn = await MessageUtils.GetMessages({
        messages,
        sender: userSender,
        receiver: anyReceiver,
        type: MessageType.User,
      })

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetUserLastConversation => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetOneFromTo: async (req, res) => {
    try {
      const { sender, receiver, type } = req.query
      const message = await MessageService.GetOne({ sender, receiver, type })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver =
        type === MessageType.User ? await UserService.GetOneById(receiver) : await GroupService.GetById(receiver)

      const messageToReturn = await MessageUtils.GetMessages({
        message,
        sender: userSender,
        receiver: anyReceiver,
        type: type,
      })

      return res.status(200).json({ statusCode: 200, response: messageToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetOneFromTo => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  Insert: async (req, res) => {
    try {
      const { message, sender, receiver, type, date } = req.body
      const created = await MessageService.Insert({ message, sender, receiver, type, date })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver =
        type === MessageType.User ? await UserService.GetOneById(receiver) : await GroupService.GetById(receiver)

      const messageToReturn = await MessageUtils.GetMessage({
        message: created,
        sender: userSender,
        receiver: anyReceiver,
        type: type,
      })

      return res.status(200).json({ statusCode: 200, response: messageToReturn })
    } catch (error) {
      Console.Error(`AvatarsBLL - SetAvatar => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
