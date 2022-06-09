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
 *           example:
 *             id: 0,
 *             name: "Fabricio"
 *             birthDate: "07/06/2003"
 *             obs: "Fullstack dev"
 *             cpf: "111.111.111-11"
 *             permission: true
 *       401:
 *         description: Invalid JWT Token
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
 *           example:
 *            name: "Fabricio"
 *            cpf: "111.111.111-11"
 *            birthDate: "07/06/2003"
 *            password: "12345"
 *            obs: "Fullstack dev"
 *            permission: true
 *     body:
 *      - name: name
 *        description: The user's name
 *        required: true
 *      - name: cpf
 *        description: The user's CPF
 *        required: true
 *      - name: birthDate
 *        description: The user's birth date
 *        required: true
 *      - name: password
 *        description: The user's password
 *        required: true
 *      - name: obs
 *        description: The user's optional info
 *        required: false
 *      - name: permission
 *        description: The user's permission
 *        required: true
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             "User created"
 *       401:
 *         description: Invalid JWT Token
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
 *           example:
 *            obs: "Fullstack dev"
 *            permission: true
 *     body:
 *      - name: obs
 *        description: The user's optional info
 *        required: false
 *      - name: permission
 *        description: The user's permission
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             "User updated"
 *       401:
 *         description: Invalid JWT Token
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
