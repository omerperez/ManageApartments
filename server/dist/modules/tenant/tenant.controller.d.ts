/// <reference types="multer" />
import { Response } from 'express';
import { DashboardService } from 'src/services/dashboard.service';
import { ApartmentService } from '../apartment/apartment.service';
import { ChangeTenantDto } from './dto/changeTenant.dto';
import { TenantService } from './tenant.service';
export declare class TenantController {
    private tenantService;
    private apartmentService;
    private dashboardService;
    constructor(tenantService: TenantService, apartmentService: ApartmentService, dashboardService: DashboardService);
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
    getAgreements(query: {
        id: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    getAgreementsCountForEachTenant(query: {
        owner: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
}
