import {DeleteResult, UpdateResult} from 'typeorm';

import {IUser} from '../../entity';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;

    getUserPagination(searchObject: Partial<IUser>, limit: number, skip: number): Promise<[IUser[], number]>;

    getNewUsers(): Promise<IUser[]>;

    getUserByEmail(email: string): Promise<IUser | undefined>;

    getUserByParams(filteredObject: Partial<IUser>): Promise<IUser | undefined>;

    createUser(user: IUser): Promise<IUser>;

    updateUser(id: number, updateObject: Partial<IUser>): Promise<UpdateResult>

    deleteUser(id: number): Promise<DeleteResult>;
}