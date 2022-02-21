import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // @Column({ type: 'string' })
  // public name?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '手机号码',
  })
  public mobile: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'varchar',
    nullable: false,
    comment: '账号密码',
  })
  public password: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    comment: '创建时间',
  })
  public createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    comment: '更新时间',
  })
  public updateDate: Date;
}
