import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { ApartmentRepository } from 'src/repositories/apartment.repository';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { CreateApartmentDto } from './dto/createProduct.dto';

@Injectable()
export class ApartmentService {
    constructor(
        private apartmentRepository: ApartmentRepository,
        private fileUploaderService: FileUploaderService
    ) { }

    async getUserApartments(mobile: string) {
        return await this.apartmentRepository.getUserApartments(mobile);
    }

    async createApartment(createApartmentDto: CreateApartmentDto, files: Array<Express.Multer.File>) {
        const aprtmentImagesUrl = await this.fileUploaderService.uploadMultipleFiles(files);
        return await this.apartmentRepository.createApartment(createApartmentDto, aprtmentImagesUrl);
    }

    async getApartmentById(apartmentId: MongooseSchema.Types.ObjectId) {
        return await this.apartmentRepository.getApartmentById(apartmentId);
    }

    async changeTenant(
        apartmentId: MongooseSchema.Types.ObjectId,
        tenantId: MongooseSchema.Types.ObjectId
    ) {
        return await this.apartmentRepository.changeTenant(apartmentId, tenantId);
    }

    // async getProducts(getQueryDto: GetQueryDto) {
    //     return await this.apartmentRepository.getProducts(getQueryDto);
    // }

    // async updateProduct(updateProductDto: UpdateProductDto, session: ClientSession) {
    //     return await this.apartmentRepository.updateProduct(updateProductDto, session);
    // }
}
