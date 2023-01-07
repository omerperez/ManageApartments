import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    password: string;
}