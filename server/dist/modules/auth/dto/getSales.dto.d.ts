import { Schema as MongooseSchema } from 'mongoose';
export declare class GetSalesDto {
    id: MongooseSchema.Types.ObjectId;
    from: number;
    limit: number;
}
