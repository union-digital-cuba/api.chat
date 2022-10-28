import express from 'express'
import { GroupBLL } from '../../logic/groups'

export const GroupsRoutes = express.Router()

/**
 * @swagger
 * /groups:
 *  get:
 *    description: Get all groups
 *    responses:
 *      '200':
 *        description: Get all groups
 */
GroupsRoutes.get('/groups', GroupBLL.GetAll)

/**
 * @swagger
 * /groups/public:
 *  get:
 *    description: Get all groups public
 *    responses:
 *      '200':
 *        description: Get all groups public
 */
GroupsRoutes.get('/groups/public', GroupBLL.GetAllPublic)

/**
 * @swagger
 * /groups/user:
 *  get:
 *    description: Get all groups where user belong
 *    responses:
 *      '200':
 *        description: Get all groups where user belong
 */
GroupsRoutes.get('/groups/user', GroupBLL.GetAllByUserId)

/**
 * @swagger
 * /group:
 *  get:
 *    description: Get group
 *    responses:
 *      '200':
 *        description: Get group
 */
GroupsRoutes.get('/group', GroupBLL.GetById)

/**
 * @swagger
 * /group/create:
 *  post:
 *    description: Create new Group
 *    responses:
 *      '200':
 *        description: Create new Group
 */
GroupsRoutes.post('/group/create', GroupBLL.Create)

/**
 * @swagger
 * /group/join:
 *  get:
 *    description: Create relationship between User and Group
 *    responses:
 *      '200':
 *        description: Create relationship between User and Group
 */
GroupsRoutes.post('/group/join', GroupBLL.AddUserInGroup)

/**
 * @swagger
 * /group:
 *  delete:
 *    description: Create relationship between User and Group
 *    responses:
 *      '200':
 *        description: Create relationship between User and Group
 */
GroupsRoutes.delete('/group', GroupBLL.Delete)
