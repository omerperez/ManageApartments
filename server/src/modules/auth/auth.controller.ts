import { BadRequestException, Body, Controller, Headers, Ip, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/LoginAuth.dto';
import { VerifyAuthDto } from './dto/VerifyAuth.dto';

@Controller('auth')
export class AuthController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private authService: AuthService) { }

    @Post('/login')
    async login(@Headers() headers, @Ip() ip: string, @Body() loginAuthDto: LoginAuthDto) {
        try {

            const results = await this.authService.login(loginAuthDto, {
                ipAddress: ip,
                userAgent: headers['user-agent'],
            });
            console.log(results);
            return results;
        } catch (error) {
            console.log("here")
            throw new BadRequestException(error);
        }
    }

    @Post('/verify')
    async verify(@Body() verifyAuthDto: VerifyAuthDto) {
        console.log(verifyAuthDto)
        return this.authService.verify(verifyAuthDto.token);
    }
}
