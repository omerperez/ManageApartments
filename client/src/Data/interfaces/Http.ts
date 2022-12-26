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

interface IUserReq {
    mobile: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type { IVerifyToken, LoginResponse, IUserReq };
