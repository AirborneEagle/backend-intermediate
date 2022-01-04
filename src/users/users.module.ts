import { Module } from '@nestjs/common';
import { RedisCacheService } from 'src/db/redis.service';
import { PostsService } from 'src/posts/posts.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [RedisCacheService, PostsService, UsersService, UsersResolver],
})
export class UsersModule {}
