import { IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber()
  mobile: string;

  @IsNotEmpty()
  password: string;
}

export class Verify {
  @IsNotEmpty()
  token: string;
}

