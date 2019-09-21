import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PlayerEntity } from '../player/player.entity';

export enum Team {
  first = 1,
  second = 2,
}

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => PlayerEntity)
  player1OfTeam1: PlayerEntity;

  @ManyToOne(type => PlayerEntity)
  player2OfTeam1: PlayerEntity;

  @ManyToOne(type => PlayerEntity)
  player1OfTeam2: PlayerEntity;

  @ManyToOne(type => PlayerEntity)
  player2OfTeam2: PlayerEntity;

  @Column({
    type: 'enum',
    enum: Team,
  })
  winner: Team;

  @CreateDateColumn()
  created: Date;
}
