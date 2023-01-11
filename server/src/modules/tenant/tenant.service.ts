import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { TenantRepository } from 'src/repositories/tenant.repository';
import { ApartmentService } from '../apartment/apartment.service';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { UserService } from '../user/user.service';
import { CreateTenantDto } from './dto/createTenant.dto';

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
        // } else {
        //     throw new UnauthorizedException('Incorrect');
        // }
    }

    // async getTenants(getQueryDto: GetQueryDto) {
    //     return await this.tenantRepository.getClients(getQueryDto);
    // }
    async getTenantHistory(owner: string) {
        return await this.tenantRepository.getTenantHistory(owner);
    }

    async getTenantById(id: MongooseSchema.Types.ObjectId) {
        return await this.tenantRepository.getTenantById(id);
    }
}
