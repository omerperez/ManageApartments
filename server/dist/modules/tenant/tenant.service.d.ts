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
import { TenantRepository } from 'src/repositories/tenant.repository';
import { ApartmentService } from '../apartment/apartment.service';
import { FileUploaderService } from '../../services/fileUploader.service';
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
    getTenantsByFilter(tenantsBySearchParams?: {
        [key: string]: boolean | number | string[] | string | MongooseSchema.Types.ObjectId;
    }, objectFields?: string): Promise<import("../../entities/tenant.entity").Tenant[]>;
    changeTenant(data: ChangeTenantDto): Promise<any>;
    getTenantById(id: MongooseSchema.Types.ObjectId): Promise<any>;
}
