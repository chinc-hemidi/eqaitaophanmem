import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check(): { status: 'ok'; time: string } {
    return {
      status: 'ok',
      time: new Date().toISOString(),
    };
  }
}
