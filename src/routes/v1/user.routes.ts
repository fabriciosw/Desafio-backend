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
 *             "User created"
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
 *     summary: Edit user's Obs and permission
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
 *             "User updated"
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
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             "User deleted"
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 */

routes
  .route('/')
  .post([validateResource(createUserSchema), validateAdmin], createUser)
  .get(validateUser, listUsers);

routes
  .route('/:id')
  .put([validateResource(updateUserSchema), validateAdmin], editUser)
  .delete([validateResource(deleteUserSchema), validateAdmin], deleteUser);

export default routes;
