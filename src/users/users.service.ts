import { Injectable } from "@nestjs/common";
import UserEntity from "./users.entity";

@Injectable()
export class UsersService {
    async findOneByEmail(email: string) {
        return UserEntity.findOne({where: { email: `${email}` }})
    }
    async findOneByEmailAndPassword(email: string, password: string){
        const user :UserEntity = await this.findOneByEmail(email)
        if (await user.comparePassword(password)) {
            return user
        }
    }
    async createUser(firstName: string, lastName: string, email: string, password: string) {
        const user = new UserEntity({firstName, lastName, email, password});
        return user.save()
    }
}