import { Tenant } from 'src/entities/tenant.entity';
import { TenantService } from 'src/modules/tenant/tenant.service';
export declare class DashboardService {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    getAgreementsData(tenantId: string): Promise<Tenant[]>;
    getAgreementsCountForEachTenant(ownerId: string): Promise<{
        id: string;
        name: string;
        agreementsCount: number;
        isActive: boolean;
    }[]>;
}
