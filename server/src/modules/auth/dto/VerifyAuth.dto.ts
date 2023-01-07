import { IsNotEmpty } from 'class-validator';

export class VerifyAuthDto {
    @IsNotEmpty()
    token: string;
}

