import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript'
import UserEntity from './users/users.entity';
require('dotenv').config();

const sequelize = new Sequelize({
  host:process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ':memory:',
  models: [UserEntity],
})


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
