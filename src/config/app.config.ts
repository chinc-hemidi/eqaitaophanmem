import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  appUrl: process.env.APP_URL ?? 'http://localhost:3000',
  guiBaseUrl: process.env.GUI_BASE_URL ?? 'http://localhost:3000',
  checkinLimitPerDay: (process.env.CHECKIN_LIMIT_PER_DAY ?? 'true') === 'true',
}));
