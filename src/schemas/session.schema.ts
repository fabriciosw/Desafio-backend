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
 *           type: string
 *         password:
 *           type: string
 *   error:
 *     InvalidCredentials:
 *       properties:
 *         status:
 *           type: number
 *           example: 401
 *         message:
 *           type: string
 *           example: Incorrect email/password combination.
 */

const payload = {
  body: object({
    cpf: string()
      .defined('CPF is required')
      .length(14)
      .matches(/(\d\d\d)\.(\d\d\d)\.(\d\d\d)-(\d\d)/, 'CPF format is invalid'),
    password: string().defined('Password is required'),
  }).defined(),
};

export const createSessionSchema = object({
  ...payload,
});

export type CreateSessionInput = InferType<typeof createSessionSchema>;
