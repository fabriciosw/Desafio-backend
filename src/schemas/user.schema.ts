import { object, string, InferType, date, boolean } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     getUsers:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *          birthDate:
 *            type: string
 *          obs:
 *            type: string
 *          cpf:
 *            type: string
 *          permission:
 *            type: boolean
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
 *         cpf:
 *           type: string
 *         birthDate:
 *           type: string
 *         password:
 *           type: string
 *         obs:
 *           type: string
 *         permission:
 *           type: boolean
 *     editUser:
 *       type: object
 *       required:
 *        - permission
 *       properties:
 *         obs:
 *           type: string
 *         permission:
 *           type: boolean
 */

const create = {
  body: object({
    name: string().defined('Name is required').max(120),
    cpf: string().defined('CPF is required').length(14), // check format
    birthDate: date().defined('Birth date is required'), // check format
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
