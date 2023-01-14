import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateTenantDto {

    @IsNotEmpty()
    id: MongooseSchema.Types.ObjectId;

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
    birthday: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

    @IsNotEmpty()
    owner: string;
}
