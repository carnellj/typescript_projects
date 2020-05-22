import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  logger.log(`Starting service on port ${port}`);
  await app.listen(port);
}
bootstrap();
