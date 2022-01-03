
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
    __typename?: 'User';
    firstName: string;
    lastName: string;
    email: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUser(input: UserInput): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
