/// <reference types="multer" />
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
