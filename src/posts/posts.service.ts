import { Injectable } from "@nestjs/common";
import UserEntity from "src/users/users.entity";
import PostEntity from "./posts.entity";

@Injectable()
export class PostsService {
    async findAll(where: object) {
      return await PostEntity.findAll({where})
    }

    async findByUserId(userId: number) :Promise<PostEntity[]>{
      return await PostEntity.findAll({where: {userId: userId}})
    }

    async createPost(message: string, user: UserEntity) : Promise<PostEntity>{
        const post = new PostEntity()
        post.message = message
        post.userId = user.id
        post.save()
        return post
    }
}