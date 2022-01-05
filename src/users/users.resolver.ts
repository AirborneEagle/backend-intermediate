import { CacheKey, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { IncomingMessage } from "http";
import { JwtPayload, verify } from "jsonwebtoken";
import { RedisCacheService } from "src/db/redis.service";
import PostEntity from "src/posts/posts.entity";
import { PostsService } from "src/posts/posts.service";
import { UserInput, User, LoginResponse, NameResponse, Post } from "../graphql";
import { AuthGuard, Jwt } from "./users.enhancements";
import { UsersService } from "./users.service";

@Resolver("User")
export class UsersResolver {
    constructor(
        private usersService: UsersService,
        private postsService: PostsService,
        private redisSerice: RedisCacheService
      ) {}    

      async _resolveUserPosts(userId: number) : Promise<Post[]>{
        return await this.redisSerice.getOrCacheListQuery(PostEntity, {userId: userId})
      }

      @ResolveField()
      async posts(@Parent() user){
        const{id} = user
        return this._resolveUserPosts(id)
      }

      @ResolveField()
      async postCount(@Parent() user) : Promise<number>{
        const{id} = user
        return (await this._resolveUserPosts(id)).length
      }

      @Query()
      @UseGuards(AuthGuard)
      async getNames(@Jwt() jwt: string){
        const user = await this.usersService.getByJwt(jwt)
        const response = new NameResponse()
        response.firstName = user.firstName
        response.lsatName = user.lastName
        return response
      }

      @Query()
      async getAllPosts(@Args('userKey') userKey: number){
        return this._resolveUserPosts(userKey)
      }

      @Mutation()
      async userLogin(@Args('email') email: string, @Args('password') password: string) {
        // In order to avoid sending plain text passwords over the wire, I am sending a base64 encrypted string.
        const decodedPassword = Buffer.from(password, "base64").toString()
        const user = await this.usersService.findOneByEmailAndPassword(email, decodedPassword);
        if(user) {
          const response = new LoginResponse()
          response.jwt = user.authToken
          response.user = user
          return response
        }
      }

      @Mutation("createUser")
      async createUser(@Args('input')input: UserInput) {
        // In order to avoid sending plain text passwords over the wire, I am sending a base64 encrypted string.
        const decodedPassword = Buffer.from(input.password, "base64").toString()
        const newUser = await this.usersService.createUser(input.firstName, input.lastName, input.email, decodedPassword);
        const response = new User()
        response.firstName = newUser.firstName
        response.lastName = newUser.lastName
        response.email = newUser.email
        return response
      }
}