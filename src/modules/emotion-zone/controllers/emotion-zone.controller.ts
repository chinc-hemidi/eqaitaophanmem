import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateEmotionZoneDto } from '../dto/create-emotion-zone.dto';
import { EmotionZoneEntity } from '../entities/emotion-zone.entity';
import { EmotionZoneService } from '../services/emotion-zone.service';

@Controller()
export class EmotionZoneController {
  constructor(private readonly emotionZoneService: EmotionZoneService) {}

  @Get('public/emotion-zones')
  getPublicEmotionZones(): Promise<EmotionZoneEntity[]> {
    return this.emotionZoneService.findAllActive();
  }

  @Get('admin/emotion-zones')
  getAdminEmotionZones(): Promise<EmotionZoneEntity[]> {
    return this.emotionZoneService.findAll();
  }

  @Post('admin/emotion-zones')
  createEmotionZone(@Body() dto: CreateEmotionZoneDto): Promise<EmotionZoneEntity> {
    return this.emotionZoneService.create(dto);
  }
}
