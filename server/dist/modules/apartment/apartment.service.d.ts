/// <reference types="multer" />
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
import { Schema as MongooseSchema } from 'mongoose';
import { ApartmentRepository } from 'src/repositories/apartment.repository';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { CreateApartmentDto } from './dto/createApartment.dto';
import { UpdateApartmentDto } from './dto/updateApartment.dto';
export declare class ApartmentService {
    private apartmentRepository;
    private fileUploaderService;
    constructor(apartmentRepository: ApartmentRepository, fileUploaderService: FileUploaderService);
    getUserApartments(mobile: string): Promise<any[]>;
    getUserApartmentsId(owner: MongooseSchema.Types.ObjectId): Promise<any[]>;
    createApartment(createApartmentDto: CreateApartmentDto, files: Array<Express.Multer.File>): Promise<import("../../entities/apartment.entity").Apartment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editApartment(updateApartment: UpdateApartmentDto, files: Array<Express.Multer.File>): Promise<any>;
    getApartmentById(apartmentId: string, owner: string): Promise<any>;
    changeTenant(apartmentId: string, tenantId: MongooseSchema.Types.ObjectId, owner: string): Promise<any>;
    delete(apartmentId: string, ownerMobile: string): Promise<any>;
}
