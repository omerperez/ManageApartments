import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class UpdateApartmentDto {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    owner: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    neighborhood: string;
    @IsNotEmpty()
    street: string;
    @IsNotEmpty()
    number: number;
    @IsOptional()
    floor: number;
    @IsOptional()
    apartmentNumber: number;
    @IsOptional()
    postCode: number;
    @IsNotEmpty()
    price: number;
    @IsNotEmpty()
    area: number;
    @IsNotEmpty()
    bedrooms: number;
    @IsNotEmpty()
    toilet: number;
    @IsOptional()
    animals: string;
    @IsOptional()
    includes: string;
    @IsOptional()
    comments: string;
    @IsOptional()
    mainImageIndex: number;
    @IsOptional()
    images: string[];
    @IsOptional()
    tenant: string;
    @IsOptional()
    tenantsHistory: string[];
}
