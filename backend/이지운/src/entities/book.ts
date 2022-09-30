import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  type!: string;

  @Column('text')
  name!: string;

  @Column('text')
  author!: string;

  @Column('int')
  price!: number;
}
