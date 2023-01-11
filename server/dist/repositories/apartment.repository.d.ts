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
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Apartment } from 'src/entities/apartment.entity';
import { UpdateApartmentDto } from 'src/modules/apartment/dto/updateApartment.dto';
import { UserService } from 'src/modules/user/user.service';
import { CreateApartmentDto } from '../modules/apartment/dto/createApartment.dto';
export declare class ApartmentRepository {
    private readonly apartmentModel;
    private readonly userService;
    constructor(apartmentModel: Model<Apartment>, userService: UserService);
    getUserApartments(mobile: string): Promise<any[]>;
    getUserApartmentsId(owner: MongooseSchema.Types.ObjectId): Promise<any[]>;
    createApartment(createApartmentDto: CreateApartmentDto, images: String[]): Promise<Apartment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editApartment(updateApartment: UpdateApartmentDto, newImagesUrl: string[]): Promise<any>;
    changeTenant(apartmentId: MongooseSchema.Types.ObjectId, tenantId: MongooseSchema.Types.ObjectId): Promise<any>;
    getApartmentById(id: string, owner: string): Promise<any>;
}
