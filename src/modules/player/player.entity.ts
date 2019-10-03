import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GameEntity } from '../game/game.entity';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('double precision')
  rating: number;

  @ManyToMany(type => GameEntity, game => game.players)
  games: GameEntity[];

  @CreateDateColumn()
  created: Date;
}