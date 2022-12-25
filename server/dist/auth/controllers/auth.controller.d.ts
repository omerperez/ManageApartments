import { AuthService } from '../services/auth.service';
import RefreshTokenDto from '../dto/refresh-token.dto';
import { LoginDto, Verify } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: any, ip: string, body: LoginDto): Promise<{
        user: import("../../user/modules/user.interface").User;
        accessToken: string;
        refreshToken: string;
    }>;
    verify(request: any, ip: string, body: Verify): Promise<import("jsonwebtoken").JwtPayload>;
    refreshToken(body: RefreshTokenDto): Promise<string>;
    logout(body: RefreshTokenDto): Promise<void>;
}
