import { ConnectionOptions } from 'typeorm';
import config from '../config/config';

type Options = ConnectionOptions & { seeds: string[]; factories: string[] };

const options: Options = {
  type: 'postgres',
  host: config.postgresDb.host,
  port: config.postgresDb.port,
  username: config.postgresDb.username,
  password: config.postgresDb.password,
  database: config.postgresDb.database,
  logger: 'advanced-console',
  cli: {
    entitiesDir: './src/database/entities',
    migrationsDir: './src/database/migrations',
  },
  entities: [`${__dirname}/entities/*{.js,.ts}`],
  migrations: [`${__dirname}/migrations/*{.js,.ts}`],
  synchronize: false,
  logging: false,
  seeds: ['./src/database/seeds/**/*{.ts,.js}'],
  factories: ['./src/database/factories/**/*{.ts,.js}'],
};

export = options;
