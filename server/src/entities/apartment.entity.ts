import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tenant } from './tenant.entity';

import { User } from './user.entity';

@Schema()
export class Apartment extends Document {

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Tenant.name }], required: false, })
    tenantsHistory: Tenant[];

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Tenant.name })
    tenant: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: User.name })
    owner: MongooseSchema.Types.ObjectId;

    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    city: string;

    @Prop({ required: true, type: String })
    neighborhood: string;

    @Prop({ required: true, type: String })
    street: string;

    @Prop({ required: true, type: Number })
    number: number;

    @Prop({ required: false, type: Number })
    floor: number;

    @Prop({ required: false, type: Number })
    apartmentNumber: number;

    @Prop({ required: false, type: Number })
    postCode: number;

    @Prop({ required: true, type: Number })
    price: number;

    @Prop({ required: true, type: Number })
    area: number;

    @Prop({ required: true, type: Number })
    bedrooms: number;

    @Prop({ required: true, type: Number })
    toilet: number;

    @Prop({ required: false, type: String })
    animals: string;

    @Prop({ required: false, type: String })
    includes: string;

    @Prop({ required: false, type: String })
    comments: string;

    @Prop({ required: false, type: Number })
    mainImageIndex: number;

    @Prop({ required: false, type: [String] })
    images: string[];
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
