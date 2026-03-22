import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { validateEnv } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EmotionZoneModule } from './modules/emotion-zone/emotion-zone.module';
import { HealthModule } from './modules/health/health.module';
import { CheckinModule } from './modules/checkin/checkin.module';
import { QrModule } from './modules/qr/qr.module';
import { SystemModule } from './modules/system/system.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig],
      validate: validateEnv,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public', 'gui'),
      exclude: ['/api*'],
      serveRoot: '/',
    }),
    DatabaseModule,
    HealthModule,
    EmotionZoneModule,
    CheckinModule,
    QrModule,
    DashboardModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
