import { Injectable } from "@nestjs/common";
import UserEntity from "src/users/users.entity";
import PostEntity from "./posts.entity";

@Injectable()
export class PostsService {

    async createPost(message: string, user: UserEntity) : Promise<PostEntity>{
        const post = new PostEntity()
        post.message = message
        post.userId = user.id
        post.save()
        return post
    }
}