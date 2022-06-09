import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../schemas/user.schema';
import {
  createUserService,
  deleteUserService,
  editUserService,
  listUsersService,
} from '../services/user.services';

export async function createUser(
  request: Request<{}, {}, CreateUserInput['body']>,
  response: Response
) {
  const { body } = request;

  const message = await createUserService(body);

  return response.status(StatusCodes.CREATED).json(message);
}

export async function listUsers(request: Request, response: Response) {
  const data = await listUsersService();
  response.status(StatusCodes.OK).json(data);
}

export async function editUser(
  request: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  response: Response
) {
  const { params } = request;
  const { body } = request;

  await editUserService(params.id, body);

  response.status(StatusCodes.OK).json('User updated');
}

export async function deleteUser(
  request: Request<DeleteUserInput['params'], {}, {}>,
  response: Response
) {
  const { params } = request;

  await deleteUserService(params.id);

  return response.status(StatusCodes.OK).json('User deleted');
}
