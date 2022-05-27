import { Message } from '../model/models'
import { consoleError, consoleInfo } from '../utils/handleConsole'

//! insert chat
const insertMessage = async ({ sendedBy, sendedTo, message }) => {
  try {
    const created = await Message.create({ sendedBy, sendedTo, message })
    consoleInfo(`message has been created`)

    await created.save()
    return created
  } catch (error) {
    consoleError(`insertMessage -> ${error.message}`)
    throw new Error(error)
  }
}

//! read messages
const getAllMessages = async () => {
  try {
    return await Message.findAll()
  } catch (error) {
    consoleError(`getAllMessages -> ${error.message}`)
    throw new Error(error)
  }
}

//! read messages by sendedBy
const getMessageBySendedBy = async (sendedBy) => {
  try {
    const rows = await Message.findAll({ where: { sendedBy: sendedBy } })
    return rows
  } catch (error) {
    consoleError(`getMessageBySendedBy -> ${error.message}`)
    throw new Error(error)
  }
}

//! read messages by sendedBy
const getMessageBySendedTo = async (sendedTo) => {
  try {
    const rows = await Message.findAll({ where: { sendedTo: sendedTo } })
    return rows
  } catch (error) {
    consoleError(`getMessageBySendedTo -> ${error.message}`)
    throw new Error(error)
  }
}

export { insertMessage, getAllMessages, getMessageBySendedBy, getMessageBySendedTo }
