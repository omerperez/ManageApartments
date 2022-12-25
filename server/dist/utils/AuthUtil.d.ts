import jwt from 'jsonwebtoken';
import { User } from 'src/user/modules/user.interface';
declare const _default: {
    hashUserPassword: (password: string) => Promise<string>;
    login: (user: User) => Promise<string>;
    verify: (token: string) => string | jwt.JwtPayload;
    isValidPassword: (password: string, hashPassword: string) => Promise<boolean>;
};
export default _default;
