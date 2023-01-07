import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post('/register')
    async registerUser(@Body() createUserDto: RegisterUserDto, @Res() res: Response) {
        try {
            const newUser: any = await this.userService.registerUser(createUserDto);
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
