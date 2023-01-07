/// <reference types="multer" />
import { Schema as MongooseSchema } from 'mongoose';
import { ApartmentRepository } from 'src/repositories/apartment.repository';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { CreateApartmentDto } from './dto/createProduct.dto';
export declare class ApartmentService {
    private apartmentRepository;
    private fileUploaderService;
    constructor(apartmentRepository: ApartmentRepository, fileUploaderService: FileUploaderService);
    getUserApartments(mobile: string): Promise<any[]>;
    createApartment(createApartmentDto: CreateApartmentDto, files: Array<Express.Multer.File>): Promise<import("../../entities/apartment.entity").Apartment & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getApartmentById(apartmentId: MongooseSchema.Types.ObjectId): Promise<any>;
    changeTenant(apartmentId: MongooseSchema.Types.ObjectId, tenantId: MongooseSchema.Types.ObjectId): Promise<any>;
}
