import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmotionZoneEntity } from '@/modules/emotion-zone/entities/emotion-zone.entity';
import { AdminCheckinController } from './controllers/admin-checkin.controller';
import { PublicCheckinController } from './controllers/public-checkin.controller';
import { CheckinPointEntity } from './entities/checkin-point.entity';
import { EmotionCheckinEntity } from './entities/emotion-checkin.entity';
import { CheckinService } from './services/checkin.service';
import { CheckinStatService } from './services/checkin-stat.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckinPointEntity, EmotionCheckinEntity, EmotionZoneEntity])],
  controllers: [PublicCheckinController, AdminCheckinController],
  providers: [CheckinService, CheckinStatService],
  exports: [CheckinService, CheckinStatService, TypeOrmModule],
})
export class CheckinModule {}
