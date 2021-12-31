
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class User {
    __typename?: 'User';
    name: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getUsers(id: string): User | Promise<User>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUser(firstName: string, lastName: string, email: string, password: string): User | Promise<User>;
}

type Nullable<T> = T | null;
