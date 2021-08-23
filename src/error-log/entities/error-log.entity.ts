import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface SchemaErrorLog {
  id: number;
  totalRecords: number;
  loads: number;
  erros: number;
  errorLog: string;
  file_path: string;
}

@Entity()
@Index(['createdAt', 'erros'])
export class ErrorLog implements SchemaErrorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    name: 'total_recors',
    nullable: false,
  })
  totalRecords: number;

  @Column({
    type: 'integer',
    name: 'loads',
    nullable: false,
  })
  loads: number;

  @Column({
    type: 'integer',
    name: 'errors',
    nullable: false,
  })
  erros: number;

  @Exclude()
  @Column({
    type: 'text',
    name: 'errorLog',
    nullable: false,
  })
  errorLog: string;

  @Column({
    type: 'varchar',
    name: 'file_path',
    length: 255,
    nullable: false,
  })
  file_path: string;

  @CreateDateColumn({
    type: Date,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: Date,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
