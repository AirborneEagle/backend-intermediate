import { Injectable } from "@nestjs/common";
import UserEntity from "./users.entity";

@Injectable()
export class UsersService {
    async findOneById(id: String){
    }
    async createUser(firstName: String, lastName: String, email: String, password: String) {
        const user = new UserEntity({firstName, lastName, email, password});
        return user.save()
    }
}