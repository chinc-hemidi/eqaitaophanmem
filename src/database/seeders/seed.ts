import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { EmotionZoneService } from '@/modules/emotion-zone/services/emotion-zone.service';

async function seed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const emotionZoneService = app.get(EmotionZoneService);
    await emotionZoneService.seedDefault();
    console.log('Seeded default emotion zones.');
  } finally {
    await app.close();
  }
}

void seed();
