import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateSessionInput } from '../schemas/session.schema';
import CreateSessionsService from '../services/session.service';

export default async function createSession(
  request: Request<{}, {}, CreateSessionInput['body']>,
  response: Response
): Promise<Response> {
  const { body } = request;

  const createSessionService = new CreateSessionsService();

  const token = await createSessionService.create({
    ...body,
  });

  return response
    .status(StatusCodes.CREATED)
    .json({ message: 'Logged in', token });
}
