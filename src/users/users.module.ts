import { Module } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [PostsService, UsersService, UsersResolver],
})
export class UsersModule {}
