import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'node:path';

import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api')
  getRoot(): { name: string; version: string; status: string } {
    return this.appService.getRoot();
  }

  @Get(['', 'dashboard', 'qr-management', 'thank-you', 'checkin/:pointCode'])
  serveGui(@Res() response: Response): void {
    response.sendFile(join(process.cwd(), 'public', 'gui', 'index.html'));
  }
}
