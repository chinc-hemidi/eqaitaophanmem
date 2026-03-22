import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SystemService {
  constructor(private readonly configService: ConfigService) {}

  getInfo() {
    return {
      name: 'emotion-checkin-system',
      env: this.configService.get<string>('app.nodeEnv', 'development'),
      time: new Date().toISOString(),
    };
  }
}
