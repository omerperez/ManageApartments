import { Schema as MongooseSchema } from 'mongoose';
export declare class CreateTenantDto {
    id: MongooseSchema.Types.ObjectId;
    apartment: MongooseSchema.Types.ObjectId;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    anotherMobileNumber: number;
    email: string;
    gender: string;
    birthday: string;
    startDate: string;
    endDate: string;
    owner: string;
}
