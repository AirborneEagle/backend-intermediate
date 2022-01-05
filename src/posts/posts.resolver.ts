import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Context, GqlContextType, Mutation, Resolver } from "@nestjs/graphql";
import { IncomingMessage } from "http";
import { Post } from "src/graphql";
import { AuthGuard, Jwt } from "src/users/users.enhancements";
import { UsersService } from "src/users/users.service";
import { PostsService } from "./posts.service";

@Resolver("Post")
export class PostsResolver {
    constructor(
        private usersService: UsersService,
        private postsService: PostsService,
      ) {}    

    @Mutation("createPost")
    @UseGuards(AuthGuard)
    async createPost(@Args("message") message: string, @Jwt() jwt: string){
        const user = await this.usersService.getByJwt(jwt)
        const post = await this.postsService.createPost(message, user)
        const response = new Post()
        response.message = post.message
        response.userId = user.id
        return response
    }
}