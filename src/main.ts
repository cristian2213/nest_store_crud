import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // it activates the validation
  app.enableCors(); // enabled

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // serialize

  const config = new DocumentBuilder()
    .setTitle('PRODUCTS STORE')
    .setDescription('Product store built in Nest.js')
    .setVersion('1.0')
    .addTag('store')
    .addBearerAuth({ in: 'Authorization', type: 'http', scheme: 'bearer' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
