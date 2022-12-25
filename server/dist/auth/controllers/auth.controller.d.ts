import { AuthService } from '../services/auth.service';
import RefreshTokenDto from '../dto/refresh-token.dto';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: any, ip: string, body: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(body: RefreshTokenDto): Promise<string>;
    logout(body: RefreshTokenDto): Promise<void>;
}
