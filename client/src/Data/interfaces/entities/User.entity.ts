interface IAuthenticationProperties {
    accessToken: string;
    refreshToken: string;
}

interface IUser {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    tenants: string[];
}

interface ILoginUserDto {
    user: IUser;
    auth: IAuthenticationProperties;
}

export type { ILoginUserDto };