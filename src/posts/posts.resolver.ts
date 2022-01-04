import { UnauthorizedException } from "@nestjs/common";
import { Args, Context, GqlContextType, Mutation, Resolver } from "@nestjs/graphql";
import { IncomingMessage } from "http";
import { Post } from "src/graphql";
import { UsersService } from "src/users/users.service";
import { PostsService } from "./posts.service";

@Resolver("Post")
export class PostsResolver {
    constructor(
        private usersService: UsersService,
        private postsService: PostsService,
      ) {}    

    @Mutation("createPost")
    async createPost(@Args("message") message: string, @Context("req") request: IncomingMessage){
        const jwt = request.headers.authentication as string
        if(!jwt) {
            throw new UnauthorizedException("Not Authentication token was provided")
        }
        const user = await this.usersService.getByJwt(jwt)
        const post = await this.postsService.createPost(message, user)
        const response = new Post()
        response.message = post.message
        response.userId = user.id
        return response
    }
}