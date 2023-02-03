import { TenantService } from 'src/modules/tenant/tenant.service';
export declare class DashboardService {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    getAgreementsData(ownerId: string): Promise<{
        agreements: string[];
        currentAgreement: string;
    }[][]>;
}
