import { Connection } from 'typeorm';
import { UpdateUser, User, UserId } from '../modules/user.interface';
export declare class UserService {
    private readonly connection;
    constructor(connection: Connection);
    getUserById(userId: UserId): Promise<User>;
    register(user: User): Promise<any>;
    edit(user: UpdateUser): Promise<any>;
    delete(userId: UserId): Promise<any>;
}
