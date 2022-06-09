import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { getCustomRepository } from 'typeorm';
import config from '../config/config';
import UserRepository from '../database/repositories/user.repository';
import AppError from '../utils/AppError';

export async function createUserService(body: {
  name: string;
  cpf: string;
  birthDate: Date;
  password: string;
  permission: boolean;
  obs?: string;
}) {
  const usersRepository = getCustomRepository(UserRepository);

  const userExists = await usersRepository.findByCPF(body.cpf);

  if (userExists) return "There's already an user with this CPF";

  const hashedPassword = await bcrypt.hash(
    body.password,
    config.saltWorkFactor
  );

  const user = usersRepository.create({
    ...body,
    password: hashedPassword,
  });

  await usersRepository.save(user);

  return 'User created';
}

export async function listUsersService() {
  const usersRepository = getCustomRepository(UserRepository);

  const users = await usersRepository.find({ order: { created_at: 'ASC' } });

  const data = users.map((user) => {
    const filteredData = {
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      obs: user.obs,
      cpf: user.cpf,
      permission: user.permission,
    };

    return filteredData;
  });

  return data;
}

export async function editUserService(
  id: string,
  info: { obs?: string; permission: boolean }
) {
  const usersRepository = getCustomRepository(UserRepository);

  const user = await usersRepository.findById(parseInt(id, 10));

  if (!user)
    throw new AppError(
      'There is no user with that id',
      StatusCodes.BAD_REQUEST
    );

  await usersRepository.save({
    ...user,
    ...info,
  });
}

export async function deleteUserService(id: string) {
  const usersRepository = getCustomRepository(UserRepository);

  const user = await usersRepository.findById(parseInt(id, 10));

  if (!user)
    throw new AppError(
      'There is no user with that id',
      StatusCodes.BAD_REQUEST
    );

  await usersRepository.remove(user);
}
