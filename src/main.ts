import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // enabled
  app.useGlobalPipes(new ValidationPipe()); // it activates the validation
  await app.listen(3000);
}
bootstrap();
