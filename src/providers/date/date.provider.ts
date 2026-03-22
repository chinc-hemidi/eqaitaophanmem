import { Injectable } from '@nestjs/common';

@Injectable()
export class DateProvider {
  now(): Date {
    return new Date();
  }
}
