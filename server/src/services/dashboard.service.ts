import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
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
        // const tenantList: { _id: string; firstName: string; lastName: string; agreement: string[] }[] = await this.tenantService.getTenantsByFilter(
        //     { _id: ownerId }, 'firstName lastName agreement'
        // );
        // const result = new Map<string, {
        //     agreements: string[],
        //     currentAgreement: string
        // }[]>();
        // tenantList.map((tenant) => {
        //     if (!result.has(tenant.firstName)) {
        //         result.set(tenant.firstName, [])
        //     }
        //     const update = [
        //         ...result.get(tenant.firstName),
        //         {
        //             name: tenant.firstName + ' ' + tenant.lastName,
        //             agreements: tenant.agreement,
        //             currentAgreement: tenant.currentAgreement
        //         }]
        //     result.set(tenant.firstName, update);
        // })
        // return Promise.resolve(Array.from(result.values()));
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
