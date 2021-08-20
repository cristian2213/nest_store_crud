import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { ProviderModule } from './providers/provider.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ErrorLogModule } from './error-log/error-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB_HOST: Joi.string().required(),
        POSTGRES_DB_NAME: Joi.string().required(),
        POSTGRES_DB_PORT: Joi.number().required(),
        POSTGRES_DB_USER: Joi.string().required(),
        POSTGRES_DB_PASSWORD: Joi.string().required(),

        // migration variables
        TYPEORM_CONNECTION: Joi.required(),
        TYPEORM_HOST: Joi.required(),
        TYPEORM_USERNAME: Joi.required(),
        TYPEORM_PASSWORD: Joi.required(),
        TYPEORM_DATABASE: Joi.required(),
        TYPEORM_PORT: Joi.required(),
        TYPEORM_SYNCHRONIZE: Joi.required(),
        TYPEORM_LOGGING: Joi.required(),
        TYPEORM_ENTITIES: Joi.required(),
        TYPEORM_MIGRATIONS: Joi.required(),
        TYPEORM_MIGRATIONS_DIR: Joi.required(),
        TYPEORM_MIGRATIONS_TABLE_NAME: Joi.required(),

        // jwt
        API_KEY: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ProviderModule,
    UserModule,
    AuthModule,
    ErrorLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
