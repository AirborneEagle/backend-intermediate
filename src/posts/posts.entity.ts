import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import UserEntity from "src/users/users.entity";

@Table
export default class PostEntity extends Model {

    @Column
    message: string

    @ForeignKey(() => UserEntity)
    @Column
    userId: number

    @BelongsTo(() => UserEntity)
    user: UserEntity
}