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
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ApartmentService } from 'src/modules/apartment/apartment.service';
import { ChangeTenantDto } from 'src/modules/tenant/dto/changeTenant.dto';
import { CreateTenantDto } from 'src/modules/tenant/dto/createTenant.dto';
import { EditTenantDto } from 'src/modules/tenant/dto/editTenant.dto';
import { UserService } from 'src/modules/user/user.service';
import { Tenant } from '../entities/tenant.entity';
export declare class TenantRepository {
    private readonly tenantModel;
    private readonly userService;
    private readonly apartmentService;
    constructor(tenantModel: Model<Tenant>, userService: UserService, apartmentService: ApartmentService);
    createTenant(createTenantDto: CreateTenantDto, document: string): Promise<Tenant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editTenant(editTenantDto: EditTenantDto, document: string | undefined): Promise<any>;
    getTenantHistory(owner: string): Promise<Tenant[]>;
    addTenantToHistory(apartment: any): any;
    changeTenant(data: ChangeTenantDto): Promise<any>;
    getTenantsByFilter(tenantsBySearchParams?: {
        [key: string]: boolean | number | string[] | string | MongooseSchema.Types.ObjectId;
    }, objectFields?: string): Promise<Tenant[]>;
    getTenantById(id: MongooseSchema.Types.ObjectId): Promise<any>;
}
