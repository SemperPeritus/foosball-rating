import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PlayerEntity } from '../player/player.entity';

export enum Team {
  first = 1,
  second = 2,
}

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToMany(type => PlayerEntity, players => players.games)
  @JoinTable()
  players: PlayerEntity[];

  @Column({
    type: 'enum',
    enum: Team,
  })
  winner: Team;

  @CreateDateColumn()
  created: Date;
}
