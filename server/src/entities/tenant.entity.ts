import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Apartment } from './apartment.entity';


@Schema()
export class Tenant extends Document {

    @Prop({ required: true, unique: true, type: String })
    id: string;

    // Apartment
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'Apartment' })
    apartment: MongooseSchema.Types.ObjectId;

    @Prop({ required: true, type: String })
    firstName: string;

    @Prop({ required: true, type: String })
    lastName: string;

    @Prop({ required: true, type: String })
    mobileNumber: string;

    @Prop({ type: String })
    anotherMobileNumber: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    gender: string;

    @Prop({ type: String })
    currentAgreement: string;

    @Prop({ type: [String] })
    agreement: string[];

    @Prop({ required: true, type: String })
    birthday: string;

    @Prop({ required: true, type: String })
    startDate: string;

    @Prop({ required: true, type: String })
    endDate: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
