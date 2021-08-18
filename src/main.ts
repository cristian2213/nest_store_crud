import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// const whiteList: Array<string> = ['https://www.google.com'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // it activates the validation

  app.enableCors({
    origin: true,
    // origin: function (origin, callback) {
    //   if (whiteList.indexOf(origin) !== -1) {
    //     console.log('allowed cors for:', origin);
    //     callback(null, true);
    //   } else {
    //     console.log('blocked cors for:', origin);
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    // allowedHeaders:
    //   'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    // methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    // credentials: true,
  }); // enabled

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
