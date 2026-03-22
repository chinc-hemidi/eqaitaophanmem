import * as Joi from 'joi';

interface EnvVars {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  CORS_ORIGIN: string;
  APP_URL: string;
  GUI_BASE_URL: string;
  CHECKIN_LIMIT_PER_DAY: 'true' | 'false';
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNC: 'true' | 'false';
  DB_LOGGING: 'true' | 'false';
}

export function validateEnv(config: Record<string, unknown>): EnvVars {
  const schema = Joi.object<EnvVars>({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(3000),
    CORS_ORIGIN: Joi.string().default('*'),
    APP_URL: Joi.string().uri().default('http://localhost:3000'),
    GUI_BASE_URL: Joi.string().uri().default('http://localhost:3000'),
    CHECKIN_LIMIT_PER_DAY: Joi.string().valid('true', 'false').default('true'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_SYNC: Joi.string().valid('true', 'false').default('false'),
    DB_LOGGING: Joi.string().valid('true', 'false').default('false'),
  });

  const { error, value } = schema.validate(config, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return value;
}
