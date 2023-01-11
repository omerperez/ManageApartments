import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { ApartmentRepository } from 'src/repositories/apartment.repository';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { CreateApartmentDto } from './dto/createApartment.dto';
import { UpdateApartmentDto } from './dto/updateApartment.dto';

@Injectable()
export class ApartmentService {
    constructor(
        private apartmentRepository: ApartmentRepository,
        private fileUploaderService: FileUploaderService
    ) { }

    async getUserApartments(mobile: string) {
        return await this.apartmentRepository.getUserApartments(mobile);
    }

    async getUserApartmentsId(owner: MongooseSchema.Types.ObjectId) {
        return await this.apartmentRepository.getUserApartmentsId(owner);
    }

    async createApartment(createApartmentDto: CreateApartmentDto, files: Array<Express.Multer.File>) {
        const aprtmentImagesUrl = await this.fileUploaderService.uploadMultipleFiles(files);
        return await this.apartmentRepository.createApartment(createApartmentDto, aprtmentImagesUrl);
    }

    async editApartment(updateApartment: UpdateApartmentDto, files: Array<Express.Multer.File>) {
        const newImagesUrl = await this.fileUploaderService.uploadMultipleFiles(files);
        return await this.apartmentRepository.editApartment(updateApartment, newImagesUrl);
    }

    async getApartmentById(apartmentId: string, owner: string) {
        return await this.apartmentRepository.getApartmentById(apartmentId, owner);
    }

    async changeTenant(
        apartmentId: string,
        tenantId: MongooseSchema.Types.ObjectId,
        owner: string,
    ) {
        const currentApartment = await this.apartmentRepository.getApartmentById(apartmentId, owner);
        return await this.apartmentRepository.changeTenant(currentApartment._id, tenantId);
    }

    // async getProducts(getQueryDto: GetQueryDto) {
    //     return await this.apartmentRepository.getProducts(getQueryDto);
    // }

    // async updateProduct(updateProductDto: UpdateProductDto, session: ClientSession) {
    //     return await this.apartmentRepository.updateProduct(updateProductDto, session);
    // }
}
