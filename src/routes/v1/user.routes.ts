import { Router } from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  listUsers,
} from '../../controllers/user.controller';
import validateAdmin from '../../middlewares/validateAdmin';
import validateUser from '../../middlewares/validateUser';

const routes = Router();

/**
 * @openapi
 *
 * '/api/users/{userId}':
 *  get:
 *     tags:
 *     - Products
 *     summary: Get a single product by the productId
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: productId
 *        in: path
 *        description: The id of the product
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

routes.route('/').post(validateAdmin, createUser).get(validateUser, listUsers);

routes
  .route('/:id')
  .put(validateAdmin, editUser)
  .delete(validateAdmin, deleteUser);

export default routes;
