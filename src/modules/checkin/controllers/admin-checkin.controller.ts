import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { CheckinStatsQueryDto } from '../dto/checkin-stats-query.dto';
import { CreateCheckinPointDto } from '../dto/create-checkin-point.dto';
import { CheckinService } from '../services/checkin.service';
import { CheckinStatService } from '../services/checkin-stat.service';

@Controller('admin/checkins')
export class AdminCheckinController {
  constructor(
    private readonly checkinService: CheckinService,
    private readonly checkinStatService: CheckinStatService,
  ) {}

  @Post('points')
  createPoint(@Body() dto: CreateCheckinPointDto) {
    return this.checkinService.createPoint(dto);
  }

  @Get('points')
  getPoints() {
    return this.checkinService.findPoints();
  }

  @Patch('points/:id/toggle')
  togglePoint(@Param('id', ParseIntPipe) id: number) {
    return this.checkinService.togglePoint(id);
  }

  @Get('export')
  @Header('Content-Type', 'text/csv')
  async exportCsv(@Query() query: CheckinStatsQueryDto, @Res() response: Response): Promise<void> {
    const csvContent = await this.checkinStatService.exportCsv(query);
    const fileName = `emotion-checkins-${new Date().toISOString().slice(0, 10)}.csv`;

    response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    response.send(csvContent);
  }
}
