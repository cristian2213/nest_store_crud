import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Provider } from '../entities/provider.entity';

interface SchemaProduct {
  id: number;
  name: string;
  price: number;
  provider: Provider;
}

@Entity()
export class Product implements SchemaProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Provider, (provider) => provider.products)
  provider: Provider;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
