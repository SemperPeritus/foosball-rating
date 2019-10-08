import { Column, CreateDateColumn, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GameEntity } from '../game/game.entity';
import { UserEntity } from '../user/user.entity';

@Entity('player')
export class PlayerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  name: string;

  @Column('double precision')
  rating: number;

  @OneToOne(type => UserEntity, user => user.player)
  user: UserEntity;

  @ManyToMany(type => GameEntity, game => game.players)
  games: GameEntity[];

  @ManyToMany(type => GameEntity, game => game.firstTeam)
  firstTeam: GameEntity[];

  @ManyToMany(type => GameEntity, game => game.secondTeam)
  secondTeam: GameEntity[];

  @CreateDateColumn()
  created: Date;
}
