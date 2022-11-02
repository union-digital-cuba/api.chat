import express from 'express'
import { UsersBLL } from '../../logic/users'

export const UsersRoutes = express.Router()

/**
 * @swagger
 * /users:
 *  get:
 *    description: Get all users
 *    responses:
 *      '200':
 *        description: Get all users
 */
UsersRoutes.get('/users', UsersBLL.GetAll)

/**
 * @swagger
 * /users/group:
 *  get:
 *    description: Get all users of the specific group by id
 *    responses:
 *      '200':
 *        description: Get all users of the specific group by id
 */
UsersRoutes.get('/users/group', UsersBLL.GetUsersByGroup)

/**
 * @swagger
 * /users/online-by-group:
 *  get:
 *    description: Get all users of the specific group by id
 *    responses:
 *      '200':
 *        description: Get all users of the specific group by id
 */
UsersRoutes.get('/users/online-by-group', UsersBLL.GetOnlineUsers)
