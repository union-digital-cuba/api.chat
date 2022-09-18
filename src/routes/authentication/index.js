import express from 'express'
import { AuthenticationBLL } from '../../logic/authentication'

export const AuthenticationRoutes = express.Router()

/**
 * @swagger
 * /health:
 *  get:
 *    description: Check the health of the system
 *    responses:
 *      '200':
 *        description: Get the health of the system, 'It works!' if the system is healthy of course
 */
AuthenticationRoutes.post('/user/login', AuthenticationBLL.Login)

/**
 * @swagger
 * /version:
 *  get:
 *    description: Get the version of the system
 *    responses:
 *      '200':
 *        description: Get the version of the system
 */
AuthenticationRoutes.post('/user/register', AuthenticationBLL.Register)
