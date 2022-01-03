import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserInput, User } from "../graphql";
import { UsersService } from "./users.service";

@Resolver("User")
export class UsersResolver {
    constructor(
        private usersService: UsersService,
      ) {}    

      @Query()
      async getUser(@Args('id') id: String) {
        return this.usersService.findOneById(id);
      }
      @Mutation("createUser")
      async createUser(@Args('input')input: UserInput) {
        const newUser = await this.usersService.createUser(input.firstName, input.lastName, input.email, input.password);
        const response = new User()
        response.firstName = newUser.firstName
        response.lastName = newUser.lastName
        response.email = newUser.email
        return response
      }
}