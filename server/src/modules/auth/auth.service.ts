import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as jsonwebtoken from 'jsonwebtoken';
import RefreshToken from 'src/entities/auth.entity';
import { User } from 'src/entities/user.entity';
import { RegisterUserDto } from '../user/dto/registerUser.dto';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/LoginAuth.dto';

@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[] = [];
    constructor(private readonly userService: UserService) { }

    async login(
        loginAuthDto: LoginAuthDto,
        values: { userAgent: string; ipAddress: string }
    ) {
        const getUser: User | null = await this.userService.getUserByMobile(loginAuthDto.mobile);
        if (!getUser) {
            return undefined;
        }
        const isPasswordPropper = argon2.verify(getUser.password, loginAuthDto.password);
        if (isPasswordPropper) {
            const authProperties = await this.newRefreshAndAccessToken(getUser, values);
            delete getUser.password;
            return {
                user: getUser,
                auth: authProperties
            };
        } else {
            return undefined;
        }
    }

    async verify(
        token: string,
    ) {
        const verifyToken = await jsonwebtoken.verify(token, process.env.SECRET_TOKEN);
        if (typeof verifyToken === 'string') {
            return undefined;
        }
        return verifyToken;
    }

    private async newRefreshAndAccessToken(
        user: RegisterUserDto,
        values: { userAgent: string; ipAddress: string },
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const refreshObject = new RefreshToken({
            id:
                this.refreshTokens.length === 0
                    ? 0
                    : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
            ...values,
            userId: user.mobile,
        });
        this.refreshTokens.push(refreshObject);
        return {
            refreshToken: refreshObject.sign(),
            accessToken: jsonwebtoken.sign(
                {
                    userId: user.mobile,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
                process.env.SECRET_TOKEN,
                {
                    expiresIn: '6h',
                },
            ),
        };
    }


}
