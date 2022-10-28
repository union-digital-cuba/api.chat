import express from 'express'
import { AuthenticationBLL } from '../../logic/authentication'

export const AuthenticationRoutes = express.Router()

/**
 * @swagger
 * /user/login:
 *  post:
 *    description: Login in System
 *    responses:
 *      '200':
 *        description: Login in System
 */
AuthenticationRoutes.post('/user/login', AuthenticationBLL.Login)

/**
 * @swagger
 * /user/register:
 *  post:
 *    description: Register in System
 *    responses:
 *      '200':
 *        description: Register in System
 */
AuthenticationRoutes.post('/user/register', AuthenticationBLL.Register)
