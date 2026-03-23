import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import type { Request } from 'express';
import { Repository } from 'typeorm';

import { hashClientIdentity } from '@/common/utils/hash.util';
import { EmotionCode } from '@/common/enums/emotion-code.enum';
import { EmotionZoneEntity } from '@/modules/emotion-zone/entities/emotion-zone.entity';
import { CheckinPointEntity } from '../entities/checkin-point.entity';
import { EmotionCheckinEntity } from '../entities/emotion-checkin.entity';
import { CreateCheckinDto } from '../dto/create-checkin.dto';
import { CreateCheckinPointDto } from '../dto/create-checkin-point.dto';
import { EmotionAdviceService } from './emotion-advice.service';

interface CheckinContext {
  clientHash: string;
}

interface PublicCheckinTodayStatus {
  checkedIn: boolean;
  emotionName: string | null;
  advice: string | null;
  checkedAt: Date | null;
}

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(CheckinPointEntity)
    private readonly checkinPointRepository: Repository<CheckinPointEntity>,
    @InjectRepository(EmotionCheckinEntity)
    private readonly emotionCheckinRepository: Repository<EmotionCheckinEntity>,
    @InjectRepository(EmotionZoneEntity)
    private readonly emotionZoneRepository: Repository<EmotionZoneEntity>,
    private readonly configService: ConfigService,
    private readonly emotionAdviceService: EmotionAdviceService,
  ) {}

  async createPoint(dto: CreateCheckinPointDto): Promise<CheckinPointEntity> {
    const code = this.generatePointCode(dto.name);
    const appUrl = this.configService.get<string>('app.appUrl', 'http://localhost:3000');

    const entity = this.checkinPointRepository.create({
      code,
      name: dto.name,
      description: dto.description ?? null,
      activeFrom: dto.activeFrom ? new Date(dto.activeFrom) : null,
      activeTo: dto.activeTo ? new Date(dto.activeTo) : null,
      isActive: dto.isActive ?? true,
      qrUrl: `${appUrl}/checkin/${code}`,
    });

    return this.checkinPointRepository.save(entity);
  }

  findPoints(): Promise<CheckinPointEntity[]> {
    return this.checkinPointRepository.find({ order: { createdAt: 'DESC' } });
  }

  async togglePoint(id: number): Promise<CheckinPointEntity> {
    const point = await this.checkinPointRepository.findOne({ where: { id } });
    if (!point) {
      throw new NotFoundException('Check-in point not found');
    }

    point.isActive = !point.isActive;
    return this.checkinPointRepository.save(point);
  }

  async getPublicPointMetadata(pointCode: string, request: Request): Promise<{
    point: CheckinPointEntity;
    emotionZones: EmotionZoneEntity[];
    todayCheckin: PublicCheckinTodayStatus;
  }> {
    const point = await this.findActivePointByCode(pointCode);
    const emotionZones = await this.emotionZoneRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
    const context = this.getCheckinContext(request);
    const checkinDate = new Date().toISOString().slice(0, 10);

    const todayCheckin = await this.emotionCheckinRepository.findOne({
      where: {
        checkinPointId: point.id,
        clientHash: context.clientHash,
        createdDate: checkinDate,
      },
      relations: { emotionZone: true },
      order: { createdAt: 'DESC' },
    });

    if (!todayCheckin) {
      return {
        point,
        emotionZones,
        todayCheckin: {
          checkedIn: false,
          emotionName: null,
          advice: null,
          checkedAt: null,
        },
      };
    }

    const fallbackAdvice = this.createFallbackAdvices(todayCheckin.emotionZone.name)[0];
    const [advice] = await this.emotionAdviceService.getRandomByEmotionZoneId(
      todayCheckin.emotionZoneId,
      1,
    );

    return {
      point,
      emotionZones,
      todayCheckin: {
        checkedIn: true,
        emotionName: todayCheckin.emotionZone.name,
        advice: advice ?? fallbackAdvice,
        checkedAt: todayCheckin.createdAt,
      },
    };
  }

  async submitCheckin(
    dto: CreateCheckinDto,
    request: Request,
  ): Promise<{
    id: number;
    createdAt: Date;
    emotionCode: EmotionCode;
    emotionName: string;
    advice: string;
    advices: string[];
  }> {
    const point = await this.findActivePointByCode(dto.checkinPointCode);
    const emotion = await this.emotionZoneRepository.findOne({
      where: { code: dto.emotionZoneCode as EmotionCode, isActive: true },
    });

    if (!emotion) {
      throw new NotFoundException('Emotion zone not found');
    }

    const context = this.getCheckinContext(request);
    const checkinDate = new Date().toISOString().slice(0, 10);

    if (this.configService.get<boolean>('app.checkinLimitPerDay', true)) {
      const existed = await this.emotionCheckinRepository.findOne({
        where: {
          checkinPointId: point.id,
          clientHash: context.clientHash,
          createdDate: checkinDate,
        },
      });

      if (existed) {
        throw new BadRequestException('Bạn đã check-in tại điểm này hôm nay.');
      }
    }

    const entity = this.emotionCheckinRepository.create({
      checkinPointId: point.id,
      emotionZoneId: emotion.id,
      clientHash: context.clientHash,
      note: dto.note ?? null,
      createdDate: checkinDate,
    });

    const saved = await this.emotionCheckinRepository.save(entity);
    const randomAdvices = await this.emotionAdviceService.getRandomByEmotionZoneId(emotion.id, 2);
    const advices = this.ensureTwoAdvices(randomAdvices, emotion.name);

    return {
      id: saved.id,
      createdAt: saved.createdAt,
      emotionCode: emotion.code,
      emotionName: emotion.name,
      advice: advices[0],
      advices,
    };
  }

  private async findActivePointByCode(code: string): Promise<CheckinPointEntity> {
    const now = new Date();
    const point = await this.checkinPointRepository.findOne({
      where: { code, isActive: true },
    });

    if (!point) {
      throw new NotFoundException('Check-in point is not active or does not exist');
    }

    if (point.activeFrom && now < point.activeFrom) {
      throw new BadRequestException('Check-in point is not started yet');
    }

    if (point.activeTo && now > point.activeTo) {
      throw new BadRequestException('Check-in point has expired');
    }

    return point;
  }

  private getCheckinContext(request: Request): CheckinContext {
    const clientId = this.extractClientId(request.headers);
    const userAgent = request.headers['user-agent'] ?? '';
    const ip = request.ip ?? request.socket.remoteAddress ?? 'unknown';
    const identity = clientId || `${ip}|${userAgent}|${this.configService.get('DB_NAME', 'app')}`;

    return {
      clientHash: hashClientIdentity(identity),
    };
  }

  private extractClientId(headers: Request['headers']): string | null {
    const raw = headers['x-client-id'];
    const value = Array.isArray(raw) ? raw[0] : raw;
    const normalized = value?.trim();

    if (!normalized) {
      return null;
    }

    return normalized.slice(0, 128);
  }

  private generatePointCode(name: string): string {
    const prefix = name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 8);
    return `${prefix || 'POINT'}-${randomUUID().slice(0, 8)}`;
  }

  private createFallbackAdvices(emotionName: string): [string, string] {
    return [
      `Bạn đang cảm thấy ${emotionName.toLowerCase()} hôm nay. Hãy trọn vẹn với cảm xúc này nhé.`,
      'Dành một nhịp thở sâu và một chút nghỉ ngắn để cơ thể, tâm trí cân bằng lại.',
    ];
  }

  private ensureTwoAdvices(source: string[], emotionName: string): [string, string] {
    const unique = Array.from(new Set(source.map((item) => item.trim()).filter(Boolean)));
    const fallback = this.createFallbackAdvices(emotionName);

    if (unique.length === 0) {
      return fallback;
    }

    if (unique.length === 1) {
      return [unique[0], fallback[1]];
    }

    return [unique[0], unique[1]];
  }
}
