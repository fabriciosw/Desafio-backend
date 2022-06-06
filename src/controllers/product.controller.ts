import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateProductInput } from '../schemas/product.schema';

import { createProduct } from '../services/product.service';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = res.locals;

  const { body } = req;

  const product = await createProduct({ ...body });

  res.status(StatusCodes.CREATED).json(product);
}
