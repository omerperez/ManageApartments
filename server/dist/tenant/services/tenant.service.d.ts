import { Connection } from 'typeorm';
import { IObjectId } from 'src/apartment/modules/apartment.interface';
import { IEditTenant, ITenant, ITenantId } from '../modules/tenant.interface';
export declare class TenantService {
    private readonly connection;
    constructor(connection: Connection);
    tenantHistory(apartmentId: IObjectId): Promise<any>;
    create(tenant: ITenant): Promise<any>;
    edit(updateTenant: IEditTenant): Promise<any>;
    delete(tenantId: ITenantId): Promise<any>;
}
