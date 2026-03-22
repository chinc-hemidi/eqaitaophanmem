import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): { name: string; version: string; status: string } {
    return {
      name: 'emotion-checkin-system',
      version: process.env.npm_package_version ?? '1.0.0',
      status: 'ok',
    };
  }
}
