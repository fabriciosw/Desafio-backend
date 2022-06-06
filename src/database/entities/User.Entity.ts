import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'numeric', precision: 11 })
  public cpf: number;

  @Column()
  public birthDate: Date;

  @Column()
  public password: string;

  @Column({ length: 500 })
  public obs: string;

  @Column()
  public permission: boolean;

  @CreateDateColumn()
  public created_at: Date;
}
