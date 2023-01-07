import { Response } from 'express';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    registerUser(createUserDto: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
