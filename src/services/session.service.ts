import { compare } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { Secret, sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import config from '../config/config';
import UsersRepository from '../database/repositories/user.repository';
import AppError from '../utils/AppError';

interface IRequest {
  cpf: string;
  password: string;
}

class CreateSessionsService {
  public async create({ cpf, password }: IRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByCPF(cpf);

    if (!user) {
      throw new AppError(
        'Incorrect email/password combination.',
        StatusCodes.UNAUTHORIZED
      );
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError(
        'Incorrect email/password combination.',
        StatusCodes.UNAUTHORIZED
      );
    }

    const token = sign(
      { auth: `${user.permission}` },
      config.jwtSecret as Secret,
      {
        subject: `${user.id}`,
        expiresIn: config.accessTokenTtl,
      }
    );

    return token;
  }
}

export default CreateSessionsService;
