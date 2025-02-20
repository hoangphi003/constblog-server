import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  imageurl: string;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  createAt: Date;

  @CreateDateColumn({ name: 'update_at', type: 'timestamp' })
  updateAt: Date;
}
