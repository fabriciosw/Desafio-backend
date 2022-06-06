import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User.Entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public findById(id: number): Promise<User | undefined> {
    const user = this.findOne({ where: { id } });
    return user;
  }

  public findByCPF(cpf: number): Promise<User | undefined> {
    const user = this.findOne({ where: { cpf } });
    return user;
  }
}
