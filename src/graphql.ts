
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

export class UserResponse {
    __typename?: 'UserResponse';
    firstName: string;
    lastName: string;
    email: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getUser(id: string): UserResponse | Promise<UserResponse>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUser(input: UserInput): UserResponse | Promise<UserResponse>;
}

type Nullable<T> = T | null;
