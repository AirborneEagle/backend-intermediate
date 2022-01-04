import PostEntity from "src/posts/posts.entity"
import UserEntity from "src/users/users.entity"

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  UserEntity.sync({ alter: isDev })
  PostEntity.sync({ alter: isDev })
}
export default dbInit 
