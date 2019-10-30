import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { PlayerEntity } from '../player/player.entity';
import { GameEntity } from '../game/game.entity';

export enum Role {
  FAG = 50,
  NON_VERIFIED_USER = 80,
  USER = 100,
  MODERATOR = 300,
  ADMIN = 700,
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.NON_VERIFIED_USER })
  role: Role;

  @OneToOne(type => PlayerEntity, player => player.user, { nullable: true, eager: true })
  @JoinColumn()
  player: PlayerEntity;

  @ManyToOne(type => PlayerEntity, player => player.usersWants, { nullable: true, eager: true })
  playerWanted: PlayerEntity;

  @ManyToOne(type => UserEntity, user => user.approvedUsers)
  approvedBy: UserEntity;

  @OneToMany(type => UserEntity, user => user.approvedBy)
  approvedUsers: UserEntity[];

  @CreateDateColumn()
  created: Date;

  @OneToMany(type => GameEntity, game => game.createdBy)
  games: GameEntity[];

  @OneToMany(type => PlayerEntity, player => player.createdBy)
  createdPlayers: PlayerEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign({ id, username }, process.env.AUTH_SECRET, { expiresIn: '7d' });
  }

  toResponseObject(isTokenNeeds: boolean = false): Partial<UserEntity> {
    const { id, username, player, playerWanted, role, created, token } = this;
    const response: any = { id, username, player, playerWanted, role, created };
    if (isTokenNeeds) {
      response.token = token;
    }

    return response;
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
