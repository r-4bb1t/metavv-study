import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  username!: string;

  @Column('text')
  password!: string;
}