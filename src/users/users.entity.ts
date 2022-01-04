import { BeforeCreate, Column, HasMany, IsEmail, Table, Unique } from "sequelize-typescript";
import * as bcrypt from 'bcrypt';
import { Model } from "sequelize-typescript";
import { sign } from 'jsonwebtoken';
import PostEntity from "src/posts/posts.entity";

@Table
export default class UserEntity extends Model{

    @Column
    firstName: string

    @Column
    lastName: string

    @IsEmail
    @Unique
    @Column
    email: string

    @Column
    password: string

    @HasMany(() => PostEntity)
    posts: PostEntity[]

    @BeforeCreate
    static async hashPassword(instance: UserEntity) {
      if (instance.password) {
        instance.password = await bcrypt.hash(instance.password, 10);
      }
    }

    get authToken() {
      return sign(
        {
          id: this.id,
          email: this.email,
        },
        process.env.JWT_SECRET,
        { expiresIn:  process.env.JWT_EXPIRATION_TIME}
      );
    }
  
    async comparePassword(attempt: string): Promise<boolean> {
      return bcrypt.compare(attempt, this.password || '');
    }  
  
}