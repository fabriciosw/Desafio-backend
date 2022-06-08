import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret, verify } from 'jsonwebtoken';
import config from '../config/config';
import AppError from '../utils/AppError';

export default function validateUser(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodedToken = verify(token, config.jwtSecret as Secret);
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.', StatusCodes.UNAUTHORIZED);
  }
}
