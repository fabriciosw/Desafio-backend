import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import config from './config';
import logger from './logger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Desafio API Docs',
      version,
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [{ url: `http://localhost:${config.port}` }],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/config/swaggerComponents.yml',
    './src/routes/**/*.ts',
    './src/schemas/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, url: string, port: number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info(`Documentação disponível em http://${url}:${port}/docs`);
}

export default swaggerDocs;
