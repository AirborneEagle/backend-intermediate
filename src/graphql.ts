
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class User {
    firstName: string;
    lastName: string;
    email: string;
}

export class LoginResponse {
    jwt: string;
    user: User;
}

export abstract class IQuery {
    abstract userLogin(email?: Nullable<string>, password?: Nullable<string>): LoginResponse | Promise<LoginResponse>;
}

export abstract class IMutation {
    abstract createUser(input: UserInput): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
