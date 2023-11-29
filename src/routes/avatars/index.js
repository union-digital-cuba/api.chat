import express from 'express'
import { AvatarsBLL } from '../../logic/avatars'

export const AvatarsRoutes = express.Router()

/**
 * @swagger
 * /avatar:
 *  post:
 *    description: Set avatar
 *    responses:
 *      '200':
 *        description: Set avatar
 */
AvatarsRoutes.post('/avatar', AvatarsBLL.SetAvatar)

/**
 * @swagger
 * /avatars:
 *  get:
 *    description: Get avatars depending of the amount
 *    responses:
 *      '200':
 *        description: Get avatars depending of the amount
 */
AvatarsRoutes.get('/avatars', AvatarsBLL.GetAvatars)
