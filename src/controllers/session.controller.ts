import { Request, Response } from 'express';
// import { verify } from 'jsonwebtoken';
import CreateSessionsService from '../services/session.service';
// import config from '../config/config';

export default async function createSession(
  request: Request,
  response: Response
): Promise<Response> {
  const { cpf, password } = request.body;

  const createSessionService = new CreateSessionsService();

  const token = await createSessionService.create({
    cpf,
    password,
  });

  return response.json(token);
}

// public async verify(request: Request, response: Response) {
//   const authHeader = request.headers.authorization;

//   if (!authHeader) {
//     throw new AppError('JWT Token is missing.');
//   }

//   const [, token] = authHeader.split(' ');

//   try {
//     if (!config.jwtSecret)
//       throw new AppError('Não há um jwtSecret definido na env');
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const decodedToken = verify(token, config.jwtSecret);

//     return response.json(true);
//   } catch (error) {
//     return response.json(false);
//   }
// }
