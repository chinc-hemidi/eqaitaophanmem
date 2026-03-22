import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as QRCode from 'qrcode';
import { Repository } from 'typeorm';

import { CheckinPointEntity } from '@/modules/checkin/entities/checkin-point.entity';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(CheckinPointEntity)
    private readonly checkinPointRepository: Repository<CheckinPointEntity>,
    private readonly configService: ConfigService,
  ) {}

  async generateForPoint(pointCode: string): Promise<{ pointCode: string; url: string; qrDataUrl: string }> {
    const point = await this.checkinPointRepository.findOne({ where: { code: pointCode } });
    if (!point) {
      throw new NotFoundException('Check-in point not found');
    }

    const guiBaseUrl = this.configService.get<string>('app.guiBaseUrl', 'http://localhost:3009');
    const url = `${guiBaseUrl}/checkin/${point.code}`;
    const qrDataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 320,
    });

    point.qrUrl = url;
    await this.checkinPointRepository.save(point);

    return { pointCode: point.code, url, qrDataUrl };
  }
}
