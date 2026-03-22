import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { EmotionAdviceService } from '@/modules/checkin/services/emotion-advice.service';
import { EmotionZoneService } from '@/modules/emotion-zone/services/emotion-zone.service';

async function seed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const emotionZoneService = app.get(EmotionZoneService);
    const emotionAdviceService = app.get(EmotionAdviceService);

    await emotionZoneService.seedDefault();
    await emotionAdviceService.seedDefault();

    console.log('Seeded default emotion zones.');
    console.log('Seeded default emotion advices.');
  } finally {
    await app.close();
  }
}

void seed();
