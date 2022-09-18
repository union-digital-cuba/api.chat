import express from 'express'
import { UsersBLL } from '../../logic/users'

export const UsersRoutes = express.Router()

/**
 * @swagger
 * /health:
 *  get:
 *    description: Check the health of the system
 *    responses:
 *      '200':
 *        description: Get the health of the system, 'It works!' if the system is healthy of course
 */
UsersRoutes.get('/users', UsersBLL.GetAll)
