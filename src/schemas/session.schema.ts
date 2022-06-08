import { object, string, InferType } from 'yup';

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
    cpf: string().defined('CPF is required').length(14),
    password: string().defined('Password is required'),
  }).defined(),
};

export const createSessionSchema = object({
  ...payload,
});

export type CreateSessionInput = InferType<typeof createSessionSchema>;
