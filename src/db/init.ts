import UserEntity from "src/users/users.entity"

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  UserEntity.sync({ alter: isDev })
}
export default dbInit 
