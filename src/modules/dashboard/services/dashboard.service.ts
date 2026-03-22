import { Injectable } from '@nestjs/common';

import { CheckinStatService } from '@/modules/checkin/services/checkin-stat.service';
import { DashboardQueryDto } from '../dto/dashboard-query.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly checkinStatService: CheckinStatService) {}

  getSummary(query: DashboardQueryDto) {
    return this.checkinStatService.getDashboardSummary(query);
  }
}
