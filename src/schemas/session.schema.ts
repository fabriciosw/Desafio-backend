import { object, string, number, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *        - cpf
 *        - password
 *       properties:
 *         cpf:
 *           type: number
 *         password:
 *           type: string
 */

const payload = {
  body: object({
    cpf: number()
      .defined('CPF is required')
      .typeError('Price must be a number'),
    password: string().defined('Password is required'),
  }).defined(),
};

export const createSessionSchema = object({
  ...payload,
});

export type CreateSessionInput = InferType<typeof createSessionSchema>;
