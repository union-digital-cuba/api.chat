import express from 'express'
import { UsersBLL } from '../../logic/users'

export const UsersRoutes = express.Router()

/**
 * @swagger
 * /health:
 *  get:
 *    description: Get all users
 *    responses:
 *      '200':
 *        description: Get all users
 */
UsersRoutes.get('/users', UsersBLL.GetAll)

/**
 * @swagger
 * /health:
 *  get:
 *    description: Set avatar
 *    responses:
 *      '200':
 *        description: Set avatar
 */
UsersRoutes.post('/user/avatar/', UsersBLL.SetAvatar)
