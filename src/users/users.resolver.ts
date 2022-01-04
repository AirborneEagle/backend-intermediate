import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { IncomingMessage } from "http";
import { JwtPayload, verify } from "jsonwebtoken";
import { PostsService } from "src/posts/posts.service";
import { UserInput, User, LoginResponse, NameResponse, Post } from "../graphql";
import { UsersService } from "./users.service";

@Resolver("User")
export class UsersResolver {
    constructor(
        private usersService: UsersService,
        private postsService: PostsService
      ) {}    

      async _resolvePosts(userId: number) : Promise<Post[]>{
        const postEntities = await this.postsService.findByUserId(userId)
        return postEntities.map<Post>((pe, _index, _all) => {
          const post = new Post()
          post.message = pe.message
          post.userId = pe.userId
          return post
        })
      }

      @ResolveField()
      async posts(@Parent() user){
        const{id} = user
        return this._resolvePosts(id)
      }

      @ResolveField()
      async postCount(@Parent() user) : Promise<number>{
        const{id} = user
        return (await this._resolvePosts(id)).length
      }

      @Query()
      async getNames(@Context("req") request: IncomingMessage){
        console.log(request)
        const authToken = request.headers.authentication as string
        const decoded = verify(authToken, process.env.JWT_SECRET) as JwtPayload
        const email = decoded.email
        const user = await this.usersService.findOneByEmail(email)
        const response = new NameResponse()
        response.firstName = user.firstName
        response.lsatName = user.lastName
        return response
      }

      @Query()
      async getAllPosts(@Args('userKey') userKey: number){
        return this._resolvePosts(userKey)
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