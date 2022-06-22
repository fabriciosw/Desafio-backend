import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
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
    const decodedToken = verify(
      token,
      config.jwtSecret as Secret
    ) as JwtPayload;
    if (decodedToken.auth === 'true') {
      return next();
    }
    return response.status(StatusCodes.UNAUTHORIZED).json('UNAUTHORIZED');
  } catch (error) {
    throw new AppError('Invalid JWT Token.', StatusCodes.UNAUTHORIZED);
  }
}
