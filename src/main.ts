import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript'
require('dotenv').config();

const sequelize = new Sequelize({
  host:process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ':memory:',
  models: ['*/**/*.entity.ts'],
  // modelMatch: (filename, member) => {
  //   return filename.substring(0, filename.indexOf('.entity.ts ')) === (member.toLowerCase()+'entity');
  // },
})


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
