import { Schema as MongooseSchema } from 'mongoose';
export declare class CreateSaleDto {
    clientId: MongooseSchema.Types.ObjectId;
    productId: MongooseSchema.Types.ObjectId;
    userId: MongooseSchema.Types.ObjectId;
    total: number;
}
