import { Connection } from 'mongoose';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/LoginAuth.dto';
import { VerifyAuthDto } from './dto/VerifyAuth.dto';
export declare class AuthController {
    private readonly mongoConnection;
    private authService;
    constructor(mongoConnection: Connection, authService: AuthService);
    login(headers: any, ip: string, loginAuthDto: LoginAuthDto): Promise<{
        user: import("../../entities/user.entity").User;
        auth: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    verify(verifyAuthDto: VerifyAuthDto): Promise<import("jsonwebtoken").JwtPayload>;
}
