import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmotionZoneEntity } from '@/modules/emotion-zone/entities/emotion-zone.entity';
import { AdminCheckinController } from './controllers/admin-checkin.controller';
import { PublicCheckinController } from './controllers/public-checkin.controller';
import { EmotionAdviceEntity } from './entities/emotion-advice.entity';
import { CheckinPointEntity } from './entities/checkin-point.entity';
import { EmotionCheckinEntity } from './entities/emotion-checkin.entity';
import { EmotionAdviceService } from './services/emotion-advice.service';
import { CheckinService } from './services/checkin.service';
import { CheckinStatService } from './services/checkin-stat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CheckinPointEntity,
      EmotionCheckinEntity,
      EmotionZoneEntity,
      EmotionAdviceEntity,
    ]),
  ],
  controllers: [PublicCheckinController, AdminCheckinController],
  providers: [CheckinService, CheckinStatService, EmotionAdviceService],
  exports: [CheckinService, CheckinStatService, EmotionAdviceService, TypeOrmModule],
})
export class CheckinModule {}
