/// <reference types="multer" />
import { Response } from 'express';
import { ApartmentService } from '../apartment/apartment.service';
import { UserService } from '../user/user.service';
import { ChangeTenantDto } from './dto/changeTenant.dto';
import { TenantService } from './tenant.service';
export declare class TenantController {
    private tenantService;
    private apartmentService;
    private userService;
    constructor(tenantService: TenantService, apartmentService: ApartmentService, userService: UserService);
    createClient(body: {
        tenant: string;
    }, doc: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    editTenant(body: {
        tenant: string;
    }, newDocument: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    getApartmentView(query: {
        apartmentId: string;
        owner: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    getTenantHistory(query: {
        owner: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    changeTenant(body: ChangeTenantDto, response: Response): Promise<Response<any, Record<string, any>>>;
}
