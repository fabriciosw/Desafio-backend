import { Router } from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  listUsers,
} from '../../controllers/user.controller';
import validateAdmin from '../../middlewares/validateAdmin';
import validateUser from '../../middlewares/validateUser';
import validateResource from '../../middlewares/validateResource';
import {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from '../../schemas/user.schema';

const routes = Router();

/**
 * @openapi
 *
 * '/api/v1/users/':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get info from all users
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/getUsers'
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a new user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUser'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             message: User created
 *             user:
 *              id: 3
 *              name: Fabricio
 *              cpf: 111.111.111-11
 *              birthDate: 06/07/2003
 *              permission: true
 *              obs: Fullstack dev
 *              created_at: 2022-06-20T15:07:49.118Z
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               example: ["Name is required", "CPF is required", "Birth date is required", "Password is required", "Permission is required"]
 *       409:
 *         description: There's already an user with that CPF
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/CpfDuplicated'
 * '/api/v1/users/{userId}':
 *  put:
 *     tags:
 *     - Users
 *     summary: Edit user's obs and permission
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The user's id
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editUser'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             message: "User updated"
 *             update:
 *              permission: false
 *              obs: "ffa"
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               example: ["Permission is required"]
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 *  delete:
 *     tags:
 *     - Users
 *     summary: Delete user
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The user's id
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       204:
 *         description: Deleted
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 */

routes
  .route('/')
  .post([validateAdmin, validateResource(createUserSchema)], createUser)
  .get(validateUser, listUsers);

routes
  .route('/:id')
  .put([validateAdmin, validateResource(updateUserSchema)], editUser)
  .delete([validateAdmin, validateResource(deleteUserSchema)], deleteUser);

export default routes;
