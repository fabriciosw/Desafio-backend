import { Router } from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  listUsers,
} from '../../controllers/user.controller';

const routes = Router();

/**
 * @openapi
 * '/api/products/{productId}':
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

routes.route('/').post(createUser);
routes.route('/').get(listUsers);
routes.route('/:id').put(editUser);
routes.route('/:id').delete(deleteUser);

export default routes;
