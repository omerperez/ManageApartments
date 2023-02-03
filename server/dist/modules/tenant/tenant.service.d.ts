/// <reference types="multer" />
import { Schema as MongooseSchema } from 'mongoose';
import { TenantRepository } from 'src/repositories/tenant.repository';
import { ApartmentService } from '../apartment/apartment.service';
import { FileUploaderService } from '../fileUploader/fileUploader.service';
import { UserService } from '../user/user.service';
import { ChangeTenantDto } from './dto/changeTenant.dto';
import { CreateTenantDto } from './dto/createTenant.dto';
import { EditTenantDto } from './dto/editTenant.dto';
export declare class TenantService {
    private readonly userService;
    private readonly apartmentService;
    private readonly tenantRepository;
    private fileUploaderService;
    constructor(userService: UserService, apartmentService: ApartmentService, tenantRepository: TenantRepository, fileUploaderService: FileUploaderService);
    createTenant(createTenantDto: CreateTenantDto, document: Express.Multer.File): Promise<import("../../entities/tenant.entity").Tenant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editTenant(createTenantDto: EditTenantDto, document: Express.Multer.File): Promise<any>;
    getTenantHistory(owner: string): Promise<import("../../entities/tenant.entity").Tenant[]>;
    changeTenant(data: ChangeTenantDto): Promise<any>;
    getTenantById(id: MongooseSchema.Types.ObjectId): Promise<any>;
}
