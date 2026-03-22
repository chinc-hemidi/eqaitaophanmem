import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CheckinPointEntity } from '@/modules/checkin/entities/checkin-point.entity';
import { QrController } from './controllers/qr.controller';
import { QrService } from './services/qr.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckinPointEntity])],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}
