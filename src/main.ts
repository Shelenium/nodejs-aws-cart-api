#!/usr/bin/env node
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get('APP_PORT') || 4000;

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.listen(port, () => {
    console.log('App is running on %s port', port);
  });
}
bootstrap();

export async function nestLambdaBootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());
  return app;
}

if (process.env.NODE_ENV !== 'lambda') {
  (async () => {
    const app = await nestLambdaBootstrap();
    const configService = app.get(ConfigService);
    const port = configService.get('APP_PORT') || 4000;
    await app.listen(port);
    console.log(`Application is running locally on: http://localhost:${port}`);
  })();
}
