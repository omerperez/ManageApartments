import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class EditTenantDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    apartment: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    mobileNumber: string;

    @IsOptional()
    anotherMobileNumber: number;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    currentAgreement: string;

    @IsOptional()
    agreement: string[];

    @IsNotEmpty()
    birthday: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

    @IsNotEmpty()
    owner: string;
}
