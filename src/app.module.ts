import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        emitTypenameField: true,
        outputAs: 'class',
      },
    }),
  ],
})
export class AppModule {}
