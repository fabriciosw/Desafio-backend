import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret, verify } from 'jsonwebtoken';
import config from '../config/config';
import AppError from '../utils/AppError';

export default function validateAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  try {
    // não consegui tipar de forma que ele reconhecesse o decodedToken.auth, por isso usei any
    const decodedToken: any = verify(token, config.jwtSecret as Secret);

    if (decodedToken.auth === 'true') {
      return next();
    }
    return response.status(StatusCodes.UNAUTHORIZED).json('UNAUTHORIZED');
  } catch (error) {
    throw new AppError('Invalid JWT Token.', StatusCodes.UNAUTHORIZED);
  }
}
