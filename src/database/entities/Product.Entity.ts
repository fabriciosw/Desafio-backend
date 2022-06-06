import { Column, Entity } from 'typeorm';
import Base from './Base.Entity';

@Entity('products')
export default class Product extends Base {
  @Column({ length: 100 })
  public title: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ length: 400, nullable: true })
  public description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  public price: number;
}
