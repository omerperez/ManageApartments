/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tenant } from './tenant.entity';
export declare class Apartment extends Document {
    tenantsHistory: Tenant[];
    tenant: MongooseSchema.Types.ObjectId;
    owner: MongooseSchema.Types.ObjectId;
    name: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    floor: number;
    apartmentNumber: number;
    postCode: number;
    price: number;
    area: number;
    bedrooms: number;
    toilet: number;
    animals: string;
    includes: string;
    comments: string;
    mainImageIndex: number;
    images: string[];
}
export declare const ApartmentSchema: MongooseSchema<Apartment, import("mongoose").Model<Apartment, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Apartment>;
