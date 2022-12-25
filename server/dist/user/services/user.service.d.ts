import { Connection } from 'typeorm';
import { ILogin, UpdateUser, User, UserId } from '../modules/user.interface';
export declare class UserService {
    private readonly connection;
    constructor(connection: Connection);
    login(loginProperties: ILogin): Promise<User>;
    verify(token: string): string | import("jsonwebtoken").JwtPayload;
    getById(userId: UserId): Promise<User>;
    create(user: User): Promise<any>;
    edit(user: UpdateUser): Promise<any>;
    delete(userId: UserId): Promise<any>;
}
