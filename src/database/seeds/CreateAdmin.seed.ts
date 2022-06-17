import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../entities/User.Entity';
import config from '../../config/config';

export default class CreateAdmin implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(User).count();
    if (rows <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Ademiro',
            cpf: '123.456.789-12',
            birthDate: '02/29/2020',
            password: await bcrypt.hash('12345', config.saltWorkFactor),
            obs: 'Ademiro master',
            permission: true,
          },
          {
            name: 'Jocas',
            cpf: '222.222.222-44',
            birthDate: '02/29/2020',
            password: await bcrypt.hash('12345', config.saltWorkFactor),
            obs: 'Jocas faxineiro',
            permission: false,
          },
        ])
        .execute();
    }
  }
}
