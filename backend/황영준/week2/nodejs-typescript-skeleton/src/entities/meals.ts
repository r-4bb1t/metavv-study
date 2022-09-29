import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('meal')
export class Meal {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('text')
  type!: string;

  @Column('text')
  name!: string;

  @Column('text')
  restaurant!: string;

  @Column('int')
  price!: number;
}
