import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import type { Request } from 'express';

import { CreateCheckinDto } from '../dto/create-checkin.dto';
import { CheckinService } from '../services/checkin.service';

@Controller('public/checkins')
export class PublicCheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Get('points/:pointCode')
  getPointMetadata(@Param('pointCode') pointCode: string) {
    return this.checkinService.getPublicPointMetadata(pointCode);
  }

  @Post('submit')
  submitCheckin(@Body() dto: CreateCheckinDto, @Req() request: Request) {
    return this.checkinService.submitCheckin(dto, request);
  }
}
