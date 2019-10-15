import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PlayerEntity } from '../player/player.entity';
import { UserEntity } from '../user/user.entity';

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

  @ManyToMany(type => PlayerEntity, players => players.firstTeam)
  @JoinTable()
  firstTeam: PlayerEntity[];

  @ManyToMany(type => PlayerEntity, players => players.secondTeam)
  @JoinTable()
  secondTeam: PlayerEntity[];

  @Column({
    type: 'enum',
    enum: Team,
  })
  winner: Team;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => UserEntity, user => user.games, { nullable: false })
  createdBy: UserEntity;
}
