import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserRepository from '../database/repositories/user.repository';
import config from '../config/config';
import AppError from '../utils/AppError';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../schemas/user.schema';

export async function createUser(
  request: Request<{}, {}, CreateUserInput['body']>,
  response: Response
) {
  const { body } = request;

  const usersRepository = getCustomRepository(UserRepository);

  const hashedPassword = await bcrypt.hash(
    body.password,
    config.saltWorkFactor
  );

  const user = usersRepository.create({
    ...body,
    password: hashedPassword,
  });

  await usersRepository.save(user);

  return response.status(StatusCodes.CREATED).json('User created');
}

export async function listUsers(request: Request, response: Response) {
  const usersRepository = getCustomRepository(UserRepository);

  const users = await usersRepository.find({ order: { created_at: 'ASC' } });

  const data = users.map((user) => {
    const publicData = {
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      obs: user.obs,
      cpf: user.cpf,
      permission: user.permission,
    };

    return publicData;
  });

  response.status(StatusCodes.OK).json(data);
}

export async function editUser(
  request: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  response: Response
) {
  const { params } = request;
  const { body } = request;

  const usersRepository = getCustomRepository(UserRepository);

  const user = await usersRepository.findById(parseInt(params.id, 10));

  if (!user)
    throw new AppError(
      'There is no user with that id',
      StatusCodes.BAD_REQUEST
    );

  await usersRepository.save({
    ...user,
    ...body,
  });

  response.status(StatusCodes.OK).json('User updated');
}

export async function deleteUser(
  request: Request<DeleteUserInput['params'], {}, {}>,
  response: Response
) {
  const { params } = request;
  const usersRepository = getCustomRepository(UserRepository);

  const user = await usersRepository.findById(parseInt(params.id, 10));

  if (!user)
    throw new AppError(
      'There is no user with that id',
      StatusCodes.BAD_REQUEST
    );

  await usersRepository.remove(user);

  return response.status(StatusCodes.OK).json('User deleted');
}
