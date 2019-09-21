import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GameEntity } from '../game/game.entity';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('double precision')
  rating: number;

  @OneToMany(
    type => GameEntity,
    game => game.player1OfTeam1 || game.player2OfTeam1 || game.player1OfTeam2 || game.player2OfTeam2,
  )
  games: GameEntity[];

  @CreateDateColumn()
  created: Date;
}
