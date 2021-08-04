import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      postgres: {
        host: process.env.POSTGRES_DB_HOST,
        name: process.env.POSTGRES_DB_NAME,
        port: parseInt(process.env.POSTGRES_DB_PORT),
        user: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASSWORD,
      },
    },
    jwt: {
      apiKey: process.env.API_KEY,
    },
  };
});
