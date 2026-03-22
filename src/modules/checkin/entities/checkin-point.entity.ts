import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EmotionCheckinEntity } from './emotion-checkin.entity';

@Entity({ name: 'checkin_points' })
export class CheckinPointEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  code!: string;

  @Column({ type: 'varchar', length: 120 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  qrUrl!: string | null;

  @Column({ type: 'datetime', nullable: true })
  activeFrom!: Date | null;

  @Column({ type: 'datetime', nullable: true })
  activeTo!: Date | null;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => EmotionCheckinEntity, (checkin) => checkin.checkinPoint)
  checkins!: EmotionCheckinEntity[];
}
