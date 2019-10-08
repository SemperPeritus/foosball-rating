import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { PlayerEntity } from '../player/player.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column('text')
  password: string;

  @OneToOne(type => PlayerEntity, player => player.user, { nullable: false })
  @JoinColumn()
  player: PlayerEntity;

  @CreateDateColumn()
  created: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign({ id, username }, process.env.AUTH_SECRET, { expiresIn: '7d' });
  }

  toResponseObject(isTokenNeeds: boolean = false) {
    const { id, username, player, created, token } = this;
    const response: any = { id, username, player, created };
    if (isTokenNeeds) {
      response.token = token;
    }

    return { id, username, player, created, token };
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
