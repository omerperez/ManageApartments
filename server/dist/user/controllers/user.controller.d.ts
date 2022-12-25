import { ILogin, UpdateUser, User, UserId } from '../modules/user.interface';
import { UserService } from '../services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(loginProperties: ILogin): Promise<User>;
    getById(userId: UserId): Promise<User>;
    create(user: User): Promise<any>;
    edit(user: UpdateUser): Promise<any>;
    delete(userId: UserId): Promise<any>;
}
