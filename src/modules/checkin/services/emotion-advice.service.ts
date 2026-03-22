import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DEFAULT_EMOTION_ADVICES } from '@/common/constants/emotion-advices.constant';
import { EmotionCode } from '@/common/enums/emotion-code.enum';
import { EmotionZoneEntity } from '@/modules/emotion-zone/entities/emotion-zone.entity';
import { EmotionAdviceEntity } from '../entities/emotion-advice.entity';

@Injectable()
export class EmotionAdviceService {
  constructor(
    @InjectRepository(EmotionAdviceEntity)
    private readonly emotionAdviceRepository: Repository<EmotionAdviceEntity>,
    @InjectRepository(EmotionZoneEntity)
    private readonly emotionZoneRepository: Repository<EmotionZoneEntity>,
  ) {}

  async seedDefault(): Promise<void> {
    const emotionZones = await this.emotionZoneRepository.find({
      where: { isActive: true },
      select: ['id', 'code'],
    });

    const zoneByCode = new Map(emotionZones.map((zone) => [zone.code, zone.id]));
    const adviceRows: Array<Pick<EmotionAdviceEntity, 'emotionZoneId' | 'message' | 'isActive'>> =
      [];

    for (const emotionCode of Object.values(EmotionCode)) {
      const emotionZoneId = zoneByCode.get(emotionCode);
      if (!emotionZoneId) {
        continue;
      }

      for (const message of DEFAULT_EMOTION_ADVICES[emotionCode]) {
        adviceRows.push({ emotionZoneId, message, isActive: true });
      }
    }

    if (adviceRows.length > 0) {
      await this.emotionAdviceRepository
        .createQueryBuilder()
        .insert()
        .into(EmotionAdviceEntity)
        .values(adviceRows)
        .orIgnore()
        .execute();
    }
  }

  async getRandomByEmotionZoneId(emotionZoneId: number, take = 1): Promise<string[]> {
    const advices = await this.emotionAdviceRepository.find({
      where: { emotionZoneId, isActive: true },
      select: ['message'],
    });

    if (advices.length === 0) {
      return [];
    }

    const allMessages = advices.map((item) => item.message);
    const cleanMessages = allMessages.filter((message) => !this.looksCorrupted(message));
    const messages = cleanMessages.length > 0 ? cleanMessages : allMessages;
    const limitedTake = Math.max(1, Math.min(take, messages.length));

    for (let index = messages.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [messages[index], messages[swapIndex]] = [messages[swapIndex], messages[index]];
    }

    return messages.slice(0, limitedTake);
  }

  private looksCorrupted(message: string): boolean {
    return /[ÃÂÆÄ]|áº|á»|â€¦|â€”|â€œ|â€/.test(message);
  }
}
