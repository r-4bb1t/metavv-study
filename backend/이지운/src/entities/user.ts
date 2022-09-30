import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  password!: string;

  @Column('text')
  username!: string;
}
