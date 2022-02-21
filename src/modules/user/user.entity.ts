import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export default class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string;
}
