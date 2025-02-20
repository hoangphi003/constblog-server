import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  mail: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 200 })
  avatar: string;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @CreateDateColumn({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;
}
