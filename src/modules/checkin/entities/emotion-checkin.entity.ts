import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EmotionZoneEntity } from '@/modules/emotion-zone/entities/emotion-zone.entity';
import { CheckinPointEntity } from './checkin-point.entity';

@Entity({ name: 'emotion_checkins' })
@Index(['checkinPointId', 'clientHash', 'createdDate'])
export class EmotionCheckinEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  checkinPointId!: number;

  @Column({ type: 'int' })
  emotionZoneId!: number;

  @Column({ type: 'varchar', length: 64 })
  clientHash!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  note!: string | null;

  @Column({ type: 'date' })
  createdDate!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => CheckinPointEntity, (point) => point.checkins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'checkinPointId' })
  checkinPoint!: CheckinPointEntity;

  @ManyToOne(() => EmotionZoneEntity, (zone) => zone.checkins)
  @JoinColumn({ name: 'emotionZoneId' })
  emotionZone!: EmotionZoneEntity;
}
