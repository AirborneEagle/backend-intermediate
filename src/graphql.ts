
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

export class Post {
    message?: Nullable<string>;
    userId?: Nullable<number>;
}

export abstract class IMutation {
    abstract createPost(message?: Nullable<string>): Nullable<Post> | Promise<Nullable<Post>>;

    abstract userLogin(email?: Nullable<string>, password?: Nullable<string>): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract createUser(input: UserInput): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    firstName: string;
    lastName: string;
    email: string;
    posts?: Nullable<Nullable<Post>[]>;
}

export class LoginResponse {
    jwt: string;
    user: User;
}

export class NameResponse {
    firstName: string;
    lsatName: string;
}

export abstract class IQuery {
    abstract getNames(): Nullable<NameResponse> | Promise<Nullable<NameResponse>>;
}

type Nullable<T> = T | null;
