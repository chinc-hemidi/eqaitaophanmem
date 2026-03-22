import { Controller, Get, Query } from '@nestjs/common';

import { DashboardQueryDto } from '../dto/dashboard-query.dto';
import { DashboardService } from '../services/dashboard.service';

@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(@Query() query: DashboardQueryDto) {
    return this.dashboardService.getSummary(query);
  }
}
