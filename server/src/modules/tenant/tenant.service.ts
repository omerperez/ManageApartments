import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { TenantRepository } from 'src/repositories/tenant.repository';
import { ApartmentService } from '../apartment/apartment.service';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { UserService } from '../user/user.service';
import { ChangeTenantDto } from './dto/changeTenant.dto';
import { CreateTenantDto } from './dto/createTenant.dto';
import { EditTenantDto } from './dto/editTenant.dto';

@Injectable()
export class TenantService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => ApartmentService))
        private readonly apartmentService: ApartmentService,
        private readonly tenantRepository: TenantRepository,
        private fileUploaderService: FileUploaderService
    ) { }

    async createTenant(createTenantDto: CreateTenantDto, document: Express.Multer.File) {
        const documentUrl = await this.fileUploaderService.uploadFile(document.buffer, document.originalname);
        const tenant = await this.tenantRepository.createTenant(createTenantDto, documentUrl);
        return tenant;
    }

    async editTenant(createTenantDto: EditTenantDto, document: Express.Multer.File) {
        let documentUrl;
        if (document) {
            documentUrl = await this.fileUploaderService.uploadFile(document.buffer, document.originalname);
        }
        return await this.tenantRepository.editTenant(createTenantDto, documentUrl);
    }
    async getTenantHistory(owner: string) {
        return await this.tenantRepository.getTenantHistory(owner);
    }

    async changeTenant(data: ChangeTenantDto) {
        return await this.tenantRepository.changeTenant(data);
    }
    async getTenantById(id: MongooseSchema.Types.ObjectId) {
        if (id) {
            return await this.tenantRepository.getTenantById(id);
        }
        return undefined;
    }
}
