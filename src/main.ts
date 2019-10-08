import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

// tslint:disable-next-line:no-var-requires
require('dotenv').config({ path: 'deploy/env/secrets.env' });

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
