interface IVerifyToken {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    iat: number;
    exp: number;
}

interface LoginUserDto {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface IVerifyDto {
    user: LoginUserDto;
}

export type { IVerifyToken, LoginUserDto };