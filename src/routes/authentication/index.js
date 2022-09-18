import express from 'express'
import { SystemBLL } from '../../logic'

export const authenticationRoutes = express.Router()

/**
 * @swagger
 * /health:
 *  get:
 *    description: Check the health of the system
 *    responses:
 *      '200':
 *        description: Get the health of the system, 'It works!' if the system is healthy of course
 */
authenticationRoutes.get('/login', SystemBLL.healthCheck)

/**
 * @swagger
 * /version:
 *  get:
 *    description: Get the version of the system
 *    responses:
 *      '200':
 *        description: Get the version of the system
 */
authenticationRoutes.get('/register', SystemBLL.getHome)
