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

    async getAgreementsData(ownerId: string) {
        const tenantList: Tenant[] = await this.tenantService.getTenantHistory(ownerId);
        const result = new Map<string, {
            agreements: string[],
            currentAgreement: string
        }[]>();
        tenantList.map((tenant) => {
            if (!result.has(tenant.firstName)) {
                result.set(tenant.firstName, [])
            }
            const update = [
                ...result.get(tenant.firstName),
                {
                    name: tenant.firstName + ' ' + tenant.lastName,
                    agreements: tenant.agreement,
                    currentAgreement: tenant.currentAgreement
                }]
            result.set(tenant.firstName, update);
        })
        console.log(result)
        return Promise.resolve(Array.from(result.values()));
        // return agreementsData;
    }
}
