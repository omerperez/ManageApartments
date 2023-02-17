import { Response } from 'express';
import { ScrapperService } from 'src/services/scrapper.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    private scrapperService;
    constructor(userService: UserService, scrapperService: ScrapperService);
    registerUser(createUserDto: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    calculatorPage(res: Response): Promise<Response<any, Record<string, any>>>;
}
