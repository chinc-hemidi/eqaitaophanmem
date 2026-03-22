import { Controller, Get, Param } from '@nestjs/common';

import { QrService } from '../services/qr.service';

@Controller('admin/qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get(':pointCode')
  generateQr(@Param('pointCode') pointCode: string) {
    return this.qrService.generateForPoint(pointCode);
  }
}
