import { IObjectId } from 'src/apartment/modules/apartment.interface';
import { IEditTenant, ITenant, ITenantId } from '../modules/tenant.interface';
import { TenantService } from '../services/tenant.service';
export declare class TenantController {
    private tenantService;
    constructor(tenantService: TenantService);
    tenantHistory(apartmentId: IObjectId): Promise<any>;
    create(tenant: ITenant): Promise<any>;
    edit(tenant: IEditTenant): Promise<any>;
    delete(tenant: ITenantId): Promise<any>;
}
