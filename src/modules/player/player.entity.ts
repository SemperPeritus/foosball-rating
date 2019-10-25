import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GameEntity } from '../game/game.entity';
import { UserEntity } from '../user/user.entity';
import { Rating } from '../../shared/constants/rating';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  firstName: string;

  @Column('text', { default: '' })
  secondName: string;

  @Column('double precision', { default: Rating.PLAYER_DEFAULT_RATING })
  rating: number;

  @OneToOne(type => UserEntity, user => user.player)
  user: UserEntity;

  @OneToMany(type => UserEntity, user => user.playerWanted)
  usersWants: UserEntity;

  @ManyToMany(type => GameEntity, game => game.players)
  games: GameEntity[];

  @ManyToMany(type => GameEntity, game => game.firstTeam)
  firstTeam: GameEntity[];

  @ManyToMany(type => GameEntity, game => game.secondTeam)
  secondTeam: GameEntity[];

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => UserEntity, user => user.createdPlayers)
  createdBy: UserEntity;
}
