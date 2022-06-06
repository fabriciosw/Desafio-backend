import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserRepository from '../database/repositories/user.repository';
import config from '../config/config';
import ApiError from '../utils/apiError.utils';

export async function createUser(request: Request, response: Response) {
  const { name, cpf, birthDate, password, obs } = request.body;

  const usersRepository = getCustomRepository(UserRepository);

  const hashedPassword = await bcrypt.hash(password, config.saltWorkFactor);

  const user = usersRepository.create({
    name,
    cpf,
    birthDate,
    // mes-dia-ano
    password: hashedPassword,
    obs,
  });

  await usersRepository.save(user);

  return response.status(StatusCodes.CREATED).json(user);
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

export async function editUser(request: Request, response: Response) {
  const { id } = request.params;
  const { obs, permission } = request.body;

  const usersRepository = getCustomRepository(UserRepository);

  const user = await usersRepository.findById(parseInt(id, 10));

  if (!user)
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      true,
      'There is no user with that id'
    );

  await usersRepository.save({
    ...user,
    obs,
    permission,
  });

  response.status(StatusCodes.OK).json('ok');
}

export async function deleteUser(request: Request, response: Response) {
  const { id } = request.params;
  const usersRepository = getCustomRepository(UserRepository);

  const user = await usersRepository.findById(parseInt(id, 10));

  if (!user)
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      true,
      'There is no user with that id'
    );

  await usersRepository.remove(user);

  return response.status(StatusCodes.OK).json('User deleted');
}
