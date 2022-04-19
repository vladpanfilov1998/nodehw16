import {DeleteResult, UpdateResult} from 'typeorm';
import bcrypt from 'bcrypt';

import {config} from '../config';
import {IUser} from '../entity';
import {userRepository} from '../repositories';
import {ErrorHandler} from '../error';
import {IPaginationResponse} from '../interfaces';

class UserService {
    public async getUsers() {
        return userRepository.getUsers();
    }

    public async getUsersPagination(searchObject: Partial<IUser>, limit: number = 10, page: number = 1):
        Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);
        const [data, totalCount] = await userRepository.getUserPagination(searchObject, limit, skip);
        return {
            page,
            perPage: limit,
            totalCount,
            data,
        };
    }

    public async getNewUsers(): Promise<IUser[]> {
        return userRepository.getNewUsers();
    }

    public async createUser(user: IUser): Promise<IUser> {
        const {password} = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = {...user, password: hashedPassword};

        return userRepository.createUser(dataToSave);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async updateUser(id: number, password: string):
        Promise<UpdateResult> {
        const hashedPassword = await this._hashPassword(password);
        return userRepository.updateUser(id, {password: hashedPassword});
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        return userRepository.deleteUser(+id);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new ErrorHandler('Email or password not valid', 400);
        }
    }

    private _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();