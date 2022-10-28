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
 *    description: Get all users of the specific group by id
 *    responses:
 *      '200':
 *        description: Get all users of the specific group by id
 */
UsersRoutes.get('/users/group', UsersBLL.GetUsersByGroup)
