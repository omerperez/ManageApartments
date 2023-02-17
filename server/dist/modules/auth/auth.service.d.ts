import * as jsonwebtoken from 'jsonwebtoken';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/LoginAuth.dto';
export declare class AuthService {
    private readonly userService;
    private refreshTokens;
    constructor(userService: UserService);
    login(loginAuthDto: LoginAuthDto, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        user: User;
        auth: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    verify(token: string): Promise<jsonwebtoken.JwtPayload>;
    private newRefreshAndAccessToken;
}
