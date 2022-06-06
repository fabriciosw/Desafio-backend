import { createConnection } from 'typeorm';
import * as ormConfig from '../database/ormconfig';
import config from './config';
import logger from './logger';

async function database() {
  try {
    if (config.postgresDb.host) {
      await createConnection(ormConfig);
      logger.info('Postgres connected');
    }
  } catch (error) {
    logger.error('Could not connect to db');
    logger.error(error);
    process.exit(1);
  }
}

export default database;
