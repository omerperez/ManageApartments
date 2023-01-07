/// <reference types="multer" />
import { Response } from 'express';
import { CreateTenantDto } from './dto/createTenant.dto';
import { TenantService } from './tenant.service';
export declare class TenantController {
    private tenantService;
    constructor(tenantService: TenantService);
    createClient(createClientDto: CreateTenantDto, doc: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
}
