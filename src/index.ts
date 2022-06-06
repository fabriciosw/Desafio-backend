import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
import routes from './routes';
import swaggerDocs from './config/swagger';
import deserializeUser from './middlewares/deserializeUser';
import AppError from './utils/AppError';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(deserializeUser);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

app.use(
  (
    error: Error | AppError,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();

  routes(app);

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }
});

export default app;
