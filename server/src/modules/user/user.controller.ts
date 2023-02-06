import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ScrapperService } from 'src/services/scrapper.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        private scrapperService: ScrapperService,
    ) { }
    @Post('/register')
    async registerUser(@Body() createUserDto: RegisterUserDto, @Res() res: Response) {
        try {
            const newUser: any = await this.userService.registerUser(createUserDto);
            console.log(newUser);
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get('/calculator')
    async calculatorPage(@Res() res: Response) {
        try {
            const electricValue = await this.scrapperService.getTheCurrentElectricityPrice();
            const waterPricesValues = await this.scrapperService.getTheCurrentWaterPrice();
            console.log({
                water: waterPricesValues,
                electric: electricValue
            })
            return res.status(HttpStatus.CREATED).send({
                water: waterPricesValues,
                electric: electricValue
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
