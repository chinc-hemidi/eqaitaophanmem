import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DEFAULT_EMOTION_ZONES } from '@/common/constants/emotion-zones.constant';
import { CreateEmotionZoneDto } from '../dto/create-emotion-zone.dto';
import { EmotionZoneEntity } from '../entities/emotion-zone.entity';

@Injectable()
export class EmotionZoneService {
  constructor(
    @InjectRepository(EmotionZoneEntity)
    private readonly emotionZoneRepository: Repository<EmotionZoneEntity>,
  ) {}

  findAllActive(): Promise<EmotionZoneEntity[]> {
    return this.emotionZoneRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  findAll(): Promise<EmotionZoneEntity[]> {
    return this.emotionZoneRepository.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  async create(dto: CreateEmotionZoneDto): Promise<EmotionZoneEntity> {
    const entity = this.emotionZoneRepository.create({
      ...dto,
      sortOrder: dto.sortOrder ?? 0,
      isActive: true,
    });
    return this.emotionZoneRepository.save(entity);
  }

  async seedDefault(): Promise<void> {
    const count = await this.emotionZoneRepository.count();
    if (count > 0) {
      return;
    }

    const entities = this.emotionZoneRepository.create(
      DEFAULT_EMOTION_ZONES.map((item) => ({
        ...item,
        isActive: true,
      })),
    );

    await this.emotionZoneRepository.save(entities);
  }
}
