/// <reference types="multer" />
import { Schema as MongooseSchema } from 'mongoose';
import { TenantRepository } from 'src/repositories/tenant.repository';
import { ApartmentService } from '../apartment/apartment.service';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { UserService } from '../user/user.service';
import { CreateTenantDto } from './dto/createTenant.dto';
export declare class TenantService {
    private readonly userService;
    private readonly apartmentService;
    private readonly tenantRepository;
    private fileUploaderService;
    constructor(userService: UserService, apartmentService: ApartmentService, tenantRepository: TenantRepository, fileUploaderService: FileUploaderService);
    createTenant(createTenantDto: CreateTenantDto, document: Express.Multer.File): Promise<any>;
    getTenantById(id: MongooseSchema.Types.ObjectId): Promise<any>;
}
