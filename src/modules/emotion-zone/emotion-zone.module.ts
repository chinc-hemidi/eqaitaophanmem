import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmotionZoneEntity } from './entities/emotion-zone.entity';
import { EmotionZoneController } from './controllers/emotion-zone.controller';
import { EmotionZoneService } from './services/emotion-zone.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmotionZoneEntity])],
  controllers: [EmotionZoneController],
  providers: [EmotionZoneService],
  exports: [EmotionZoneService, TypeOrmModule],
})
export class EmotionZoneModule {}
