import { Router } from 'express';
import createSession from '../../controllers/session.controller';
import validateResource from '../../middlewares/validateResource';
import { createSessionSchema } from '../../schemas/session.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/session/':
 *  post:
 *     tags:
 *     - Session
 *     summary: Login user and create a jwt token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *           example:
 *             cpf: '123.456.789-12'
 *             password: '12345'
 *     body:
 *      - name: cpf
 *        description: The user's cpf
 *        required: true
 *      - name: password
 *        description: The user's password
 *        required: true
 *     responses:
 *       201:
 *         description: Token Created
 *         content:
 *          application/json:
 *              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoidHJ1ZSIsImlhdCI6MTY1NDYxNTMxMiwiZXhwIjoxNjU0NjE2MjEyLCJzdWIiOiIxIn0.kQ32ll3YjJzz8jh2-h6-DOtmxWdQTbsHpROSp8suoOo'
 *       401:
 *         description: Incorrect email/password combination.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/InvalidCredentials'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               example: ["CPF is required", "Password is required"]
 */

routes.route('/').post([validateResource(createSessionSchema)], createSession);

export default routes;
