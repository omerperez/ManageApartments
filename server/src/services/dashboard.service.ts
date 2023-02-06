import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Tenant } from 'src/entities/tenant.entity';
import { TenantService } from 'src/modules/tenant/tenant.service';

@Injectable()
export class DashboardService {
    constructor(
        @Inject(forwardRef(() => TenantService))
        private readonly tenantService: TenantService,
    ) { }

    async getAgreementsData(tenantId: string) {
        return await this.tenantService.getTenantsByFilter(
            { id: tenantId }, 'id firstName lastName agreement'
        );
    }

    async getAgreementsCountForEachTenant(ownerId: string) {
        const tenantList: Tenant[] = await this.tenantService.getTenantHistory(ownerId);
        const result: { id: string; name: string; agreementsCount: number; isActive: boolean }[] = [];
        tenantList.map((tenant) => {
            result.push({
                id: tenant.id,
                name: `${tenant.firstName} ${tenant.lastName}`,
                agreementsCount: tenant.agreement.length + 1,
                isActive: false
            })
        });
        return result;
    }
}

