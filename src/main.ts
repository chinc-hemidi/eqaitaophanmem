import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { setupSwagger } from './config/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'dashboard', method: RequestMethod.GET },
      { path: 'qr-management', method: RequestMethod.GET },
      { path: 'thank-you', method: RequestMethod.GET },
      { path: 'checkin/:pointCode', method: RequestMethod.GET },
    ],
  });
  app.enableCors({
    origin: configService.get<string>('app.corsOrigin', '*'),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  setupSwagger(app);

  const port = configService.get<number>('app.port', 3000);
  await app.listen(port);

  Logger.log(`API running at http://localhost:${port}/api`, 'Bootstrap');
}

void bootstrap();
