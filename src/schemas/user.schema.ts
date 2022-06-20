import { object, string, InferType, date, boolean } from 'yup';

/**
 * @openapi
 * components:
 *   error:
 *     InvalidJWT:
 *        properties:
 *            status:
 *              type: number
 *              example: 401
 *            message:
 *              type: string
 *              example: Invalid JWT Token. / JWT Token is missing.
 *     CpfDuplicated:
 *        properties:
 *            status:
 *              type: number
 *              example: 409
 *            message:
 *              type: string
 *              example: There's already an user with that CPF
 *   schemas:
 *     getUsers:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              example: 0
 *            name:
 *              type: string
 *              example: "Fabricio"
 *            birthDate:
 *              type: string
 *              example: "2003-07-06T03:00:00.000Z"
 *            obs:
 *              type: string
 *              example: "Fullstack dev"
 *            cpf:
 *              type: string
 *              example: "111.111.111-11"
 *            permission:
 *              type: boolean
 *              example: true
 *     createUser:
 *       type: object
 *       required:
 *        - name
 *        - cpf
 *        - birthDate
 *        - password
 *        - permission
 *       properties:
 *         name:
 *           type: string
 *           example: "Fabricio"
 *         cpf:
 *           type: string
 *           example: "111.111.111-11"
 *         birthDate:
 *           type: string
 *           example: "07/06/2003"
 *         password:
 *           type: string
 *           example: "12345"
 *         obs:
 *           type: string
 *           example: "Fullstack dev"
 *         permission:
 *           type: boolean
 *           example: true
 *     editUser:
 *       type: object
 *       required:
 *        - permission
 *       properties:
 *         obs:
 *           type: string
 *           example: "Trainne"
 *         permission:
 *           type: boolean
 *           example: false
 */

const create = {
  body: object({
    name: string().defined('Name is required').max(120),
    cpf: string()
      .defined('CPF is required')
      .length(14)
      .matches(/(\d\d\d)\.(\d\d\d)\.(\d\d\d)-(\d\d)/, 'CPF format is invalid'),
    birthDate: date().defined('Birth date is required'),
    password: string().defined('Password is required'),
    obs: string().max(500),
    permission: boolean().defined('Permission is required'),
  }).defined(),
};

const edit = {
  body: object({
    obs: string().max(500),
    permission: boolean().defined('Permission is required'),
  }).defined(),
};

const params = {
  params: object({ id: string().defined('productId is required') }),
};

export const createUserSchema = object({
  ...create,
});

export const updateUserSchema = object({
  ...edit,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export type CreateUserInput = InferType<typeof createUserSchema>;
export type UpdateUserInput = InferType<typeof updateUserSchema>;
export type DeleteUserInput = InferType<typeof deleteUserSchema>;
