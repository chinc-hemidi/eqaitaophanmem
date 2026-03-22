import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EmotionCode } from '@/common/enums/emotion-code.enum';
import { EmotionCheckinEntity } from '@/modules/checkin/entities/emotion-checkin.entity';

@Entity({ name: 'emotion_zones' })
export class EmotionZoneEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  code!: EmotionCode;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 20 })
  color!: string;

  @Column({ type: 'int', default: 0 })
  sortOrder!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => EmotionCheckinEntity, (checkin) => checkin.emotionZone)
  checkins!: EmotionCheckinEntity[];
}
