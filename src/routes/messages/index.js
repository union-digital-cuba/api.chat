import express from 'express'
import { MessagesBLL } from '../../logic/messages'

export const MessagesRoutes = express.Router()

/**
 * @swagger
 * /message:
 *  post:
 *    description: Insert Message
 *    responses:
 *      '200':
 *        description: Insert Message
 */
MessagesRoutes.post('/message', MessagesBLL.Insert)

/**
 * @swagger
 * /messages:
 *  get:
 *    description: Get All Messages
 *    responses:
 *      '200':
 *        description: Get All Messages
 */
MessagesRoutes.get('/messages', MessagesBLL.GetAllFromTo)

/**
 * @swagger
 * /messages/group:
 *  get:
 *    description: Get All 100 Messages from group
 *    responses:
 *      '200':
 *        description: Get All Messages
 */
MessagesRoutes.post('/messages/group', MessagesBLL.GetGroupLastConversation)

/**
 * @swagger
 * /messages/user:
 *  get:
 *    description: Get All 100 Messages from group
 *    responses:
 *      '200':
 *        description: Get All Messages
 */
MessagesRoutes.post('/messages/user', MessagesBLL.GetUserLastConversation)
