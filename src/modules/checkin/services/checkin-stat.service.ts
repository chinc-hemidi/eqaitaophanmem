import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { normalizeDateRange } from '@/common/utils/date-range.util';
import { EmotionZoneEntity } from '@/modules/emotion-zone/entities/emotion-zone.entity';
import { CheckinStatsQueryDto } from '../dto/checkin-stats-query.dto';
import { EmotionCheckinEntity } from '../entities/emotion-checkin.entity';

export interface DashboardSummary {
  totalCheckins: number;
  emotions: Array<{
    code: string;
    name: string;
    color: string;
    count: number;
    percentage: number;
  }>;
  dailyTrend: Array<{ date: string; count: number }>;
}

@Injectable()
export class CheckinStatService {
  constructor(
    @InjectRepository(EmotionCheckinEntity)
    private readonly emotionCheckinRepository: Repository<EmotionCheckinEntity>,
    @InjectRepository(EmotionZoneEntity)
    private readonly emotionZoneRepository: Repository<EmotionZoneEntity>,
  ) {}

  async getDashboardSummary(query: CheckinStatsQueryDto): Promise<DashboardSummary> {
    const range = normalizeDateRange(query.from, query.to);
    const builder = this.emotionCheckinRepository
      .createQueryBuilder('checkin')
      .leftJoinAndSelect('checkin.emotionZone', 'emotionZone')
      .leftJoinAndSelect('checkin.checkinPoint', 'checkinPoint')
      .where('checkin.createdAt BETWEEN :from AND :to', {
        from: range.from,
        to: range.to,
      });

    if (query.pointCode) {
      builder.andWhere('checkinPoint.code = :pointCode', { pointCode: query.pointCode });
    }

    const checkins = await builder.getMany();
    const totalCheckins = checkins.length;

    const emotionZones = await this.emotionZoneRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', id: 'ASC' },
    });

    const emotionCountMap = new Map<number, number>();
    const dailyCountMap = new Map<string, number>();

    for (const checkin of checkins) {
      emotionCountMap.set(
        checkin.emotionZoneId,
        (emotionCountMap.get(checkin.emotionZoneId) ?? 0) + 1,
      );

      const dateKey = checkin.createdAt.toISOString().slice(0, 10);
      dailyCountMap.set(dateKey, (dailyCountMap.get(dateKey) ?? 0) + 1);
    }

    const emotions = emotionZones.map((zone) => {
      const count = emotionCountMap.get(zone.id) ?? 0;
      const percentage = totalCheckins === 0 ? 0 : Number(((count / totalCheckins) * 100).toFixed(2));

      return {
        code: zone.code,
        name: zone.name,
        color: zone.color,
        count,
        percentage,
      };
    });

    const dailyTrend = Array.from(dailyCountMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalCheckins,
      emotions,
      dailyTrend,
    };
  }

  async exportCsv(query: CheckinStatsQueryDto): Promise<string> {
    const range = normalizeDateRange(query.from, query.to);

    const builder = this.emotionCheckinRepository
      .createQueryBuilder('checkin')
      .leftJoinAndSelect('checkin.emotionZone', 'emotionZone')
      .leftJoinAndSelect('checkin.checkinPoint', 'checkinPoint')
      .where('checkin.createdAt BETWEEN :from AND :to', {
        from: range.from,
        to: range.to,
      })
      .orderBy('checkin.createdAt', 'DESC');

    if (query.pointCode) {
      builder.andWhere('checkinPoint.code = :pointCode', { pointCode: query.pointCode });
    }

    const rows = await builder.getMany();

    const header = ['id', 'checkin_point_code', 'emotion_code', 'emotion_name', 'note', 'created_at'];
    const lines = rows.map((item) => {
      const escapedNote = (item.note ?? '').replace(/\"/g, '""');
      return [
        item.id,
        item.checkinPoint?.code ?? '',
        item.emotionZone?.code ?? '',
        item.emotionZone?.name ?? '',
        `"${escapedNote}"`,
        item.createdAt.toISOString(),
      ].join(',');
    });

    return [header.join(','), ...lines].join('\n');
  }
}
