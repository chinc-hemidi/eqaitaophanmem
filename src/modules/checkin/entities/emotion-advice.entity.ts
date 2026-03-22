import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { EmotionZoneEntity } from '@/modules/emotion-zone/entities/emotion-zone.entity';

@Entity({ name: 'emotion_advices' })
@Index(['emotionZoneId', 'isActive'])
@Unique(['emotionZoneId', 'message'])
export class EmotionAdviceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  emotionZoneId!: number;

  @Column({ type: 'varchar', length: 300 })
  message!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => EmotionZoneEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'emotionZoneId' })
  emotionZone!: EmotionZoneEntity;
}
