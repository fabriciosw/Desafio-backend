import { object, string, InferType, date, boolean } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const create = {
  body: object({
    name: string().defined('Name is required').max(120),
    cpf: string().defined('CPF is required').length(11),
    birthDate: date().defined('Birth date is required'),
    password: string().defined('Password is required'),
    obs: string().defined('Obs is required').max(500).default('-'),
    permission: boolean().defined('Permission is required'),
  }).defined(),
};

const edit = {
  body: object({
    obs: string().defined('Obs is required').max(500).default('-'),
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
