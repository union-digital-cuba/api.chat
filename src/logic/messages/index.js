import { MessageService } from '../../services/messages'
import { UserService } from '../../services/user'
import { GroupService } from '../../services/group'
import { Console } from '../../utils/console'
import { MessageType } from '../../utils/enums'

export const MessagesBLL = {
  GetAllFromTo: async (req, res) => {
    try {
      const { sender, receiver, type } = req.query
      const messages = await MessageService.GetAllFromTo({ sender, receiver, type })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver =
        type === MessageType.User ? await UserService.GetOneById(receiver) : await GroupService.GetById(receiver)

      const messagesToReturn = messages.map((m) => {
        return {
          ...m,
          sender: { id: userSender.id, username: userSender.username, image: userSender.image },
          receiver: {
            id: anyReceiver.id,
            name: type === MessageType.User ? anyReceiver.username : anyReceiver.name,
            image: anyReceiver.image,
          },
        }
      })

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetAllFromTo => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetGroupLastConversation: async (req, res) => {
    try {
      const { userId, groupId } = req.query
      const messages = await MessageService.GetGroupLastConversation({ groupId, max: 100 })

      const userSender = await UserService.GetOneById(userId)
      const anyReceiver = await GroupService.GetById(groupId)

      const messagesToReturn = messages.map((m) => {
        return {
          ...m,
          sender: { id: userSender.id, username: userSender.username, image: userSender.image },
          receiver: {
            id: anyReceiver.id,
            name: anyReceiver.name,
            image: anyReceiver.image,
          },
        }
      })

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetGroupLastConversation => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetUserLastConversation: async (req, res) => {
    try {
      const { sender, receiver } = req.query

      const conversation = await MessageService.GetConversation(sender, receiver)
      const messages = await MessageService.GetUserLastConversation({ conversation, max: 100 })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver = await UserService.GetOneById(receiver)

      const messagesToReturn = messages.map((m) => {
        return {
          ...m,
          sender: { id: userSender.id, username: userSender.username, image: userSender.image },
          receiver: {
            id: anyReceiver.id,
            name: anyReceiver.username,
            image: anyReceiver.image,
          },
        }
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

      const messagesToReturn = {
        ...message,
        sender: { id: userSender.id, username: userSender.username, image: userSender.image },
        receiver: {
          id: anyReceiver.id,
          name: type === MessageType.User ? anyReceiver.username : anyReceiver.name,
          image: anyReceiver.image,
        },
      }

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
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

      const messagesToReturn = {
        ...created,
        sender: { id: userSender.id, username: userSender.username, image: userSender.image },
        receiver: {
          id: anyReceiver.id,
          name: type === MessageType.User ? anyReceiver.username : anyReceiver.name,
          image: anyReceiver.image,
        },
      }

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`AvatarsBLL - SetAvatar => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
