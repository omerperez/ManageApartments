import { IUserProperties } from "./IUser";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUserProperties;
}

interface IVerifyToken {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    iat: number;
    exp: number;
}

export type { IVerifyToken, LoginResponse };
