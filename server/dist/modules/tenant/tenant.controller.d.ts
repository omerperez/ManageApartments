/// <reference types="multer" />
import { Response } from 'express';
import { TenantService } from './tenant.service';
export declare class TenantController {
    private tenantService;
    constructor(tenantService: TenantService);
    createClient(body: {
        tenant: string;
    }, doc: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
}
