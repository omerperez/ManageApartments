import { Schema as MongooseSchema } from 'mongoose';
export declare class GetQueryDto {
    id: MongooseSchema.Types.ObjectId;
    from?: number;
    limit?: number;
}
