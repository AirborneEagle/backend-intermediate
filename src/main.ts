import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript'
import UserEntity from './users/users.entity';
import dbInit from './db/init';
import PostEntity from './posts/posts.entity';
require('dotenv').config();

// TODO move this into the db Init.
const sequelize = new Sequelize({
  host:process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  storage: ':memory:',
  models: [UserEntity, PostEntity],
})


async function bootstrap() {
  dbInit()
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
