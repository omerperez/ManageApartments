import { UserService } from '../../user/services/user.service';
export declare class AuthService {
    private readonly userService;
    private refreshTokens;
    constructor(userService: UserService);
    refresh(refreshStr: string): Promise<string | undefined>;
    private retrieveRefreshToken;
    login(mobile: string, password: string, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    } | undefined>;
    private newRefreshAndAccessToken;
    logout(refreshStr: string): Promise<void>;
}
