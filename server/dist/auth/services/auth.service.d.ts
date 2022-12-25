import * as jsonwebtoken from 'jsonwebtoken';
import { User } from '../../user/modules/user.interface';
import { UserService } from '../../user/services/user.service';
export declare class AuthService {
    private readonly userService;
    private refreshTokens;
    constructor(userService: UserService);
    login(mobile: string, password: string, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    } | undefined>;
    verify(token: string): Promise<jsonwebtoken.JwtPayload>;
    refresh(refreshStr: string): Promise<string | undefined>;
    private retrieveRefreshToken;
    private newRefreshAndAccessToken;
    logout(refreshStr: string): Promise<void>;
}
