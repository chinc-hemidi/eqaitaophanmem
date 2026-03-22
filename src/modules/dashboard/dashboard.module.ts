import { Module } from '@nestjs/common';

import { CheckinModule } from '@/modules/checkin/checkin.module';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [CheckinModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
