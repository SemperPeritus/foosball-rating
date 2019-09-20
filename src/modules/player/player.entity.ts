import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('double precision')
  rating: number;

  @CreateDateColumn()
  created: Date;
}
