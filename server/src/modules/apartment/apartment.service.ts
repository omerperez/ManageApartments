import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { Apartment } from 'src/entities/apartment.entity';
import { ApartmentRepository } from 'src/repositories/apartment.repository';
import { DashboardService } from 'src/services/dashboard.service';
import { FileUploaderService } from '../../services/fileUploader.service';
import { CreateApartmentDto } from './dto/createApartment.dto';
import { UpdateApartmentDto } from './dto/updateApartment.dto';

@Injectable()
export class ApartmentService {
    constructor(
        private apartmentRepository: ApartmentRepository,
        private fileUploaderService: FileUploaderService,
    ) { }

    async getUserApartments(mobile: string) {
        const apartments = await this.apartmentRepository.getUserApartments(mobile);
        let dashboardResults;
        if (apartments) {
            dashboardResults = this.getDashboardCards(apartments);
        }
        console.log(dashboardResults);
        return {
            dashboardResults, apartments
        }
    }

    getDashboardCards(apartments: Apartment[] | undefined) {

        let results = {
            availability: 0,
            revenues: 0,
            count: apartments.length,
            expiringContractscount: 0
        }
        if (apartments) {
            apartments.map((apartment) => {
                if (apartment.tenant) {
                    results.availability += 1;
                    results.revenues += apartment.price;
                }
            })
        }
        return results;
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

    async delete(apartmentId: string, ownerMobile: string) {
        return await this.apartmentRepository.delete(apartmentId, ownerMobile);
    }
}
