import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateSessionInput } from '../schemas/session.schema';
// import { verify } from 'jsonwebtoken';
import CreateSessionsService from '../services/session.service';
// import config from '../config/config';

export default async function createSession(
  request: Request<{}, {}, CreateSessionInput['body']>,
  response: Response
): Promise<Response> {
  const { body } = request;

  const createSessionService = new CreateSessionsService();

  const token = await createSessionService.create({
    ...body,
  });

  return response.status(StatusCodes.CREATED).json(token);
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
