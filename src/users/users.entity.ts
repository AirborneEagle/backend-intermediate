import { BeforeCreate, Column, Table } from "sequelize-typescript";
import * as bcrypt from 'bcrypt';
import { Model } from "sequelize-typescript";

@Table
export default class UserEntity extends Model{
    @Column
    firstName: string
    @Column
    lastName: string
    @Column
    email: string
    @Column
    password: string

    @BeforeCreate
    static async hashPassword(instance: UserEntity) {
      if (instance.password) {
        instance.password = await bcrypt.hash(instance.password, 10);
      }
    }
  
}