import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PlayerEntity } from '../player/player.entity';

export enum Team {
  first = 1,
  second = 2,
}

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(type => PlayerEntity)
  @JoinColumn()
  player1OfTeam1: PlayerEntity;

  @OneToOne(type => PlayerEntity)
  @JoinColumn()
  player2OfTeam1: PlayerEntity;

  @OneToOne(type => PlayerEntity)
  @JoinColumn()
  player1OfTeam2: PlayerEntity;

  @OneToOne(type => PlayerEntity)
  @JoinColumn()
  player2OfTeam2: PlayerEntity;

  @Column({
    type: 'enum',
    enum: Team,
  })
  winner: Team;

  @CreateDateColumn()
  created: Date;
}
