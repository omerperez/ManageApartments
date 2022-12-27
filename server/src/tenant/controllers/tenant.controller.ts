import { Body, Controller, Post } from '@nestjs/common';
import { IObjectId } from 'src/apartment/modules/apartment.interface';
import { IEditTenant, ITenant, ITenantId, } from '../modules/tenant.interface';
import { TenantService } from '../services/tenant.service';

@Controller('tenant')
export class TenantController {
    constructor(private tenantService: TenantService) { }

    @Post('history')
    async tenantHistory(@Body() apartmentId: IObjectId) {
        return await this.tenantService.tenantHistory(apartmentId);
    }

    @Post('create')
    async create(@Body() tenant: ITenant) {
        return await this.tenantService.create(tenant);
    }

    @Post('edit')
    async edit(@Body() tenant: IEditTenant) {
        return await this.tenantService.edit(tenant);
    }

    @Post('delete')
    async delete(@Body() tenant: ITenantId) {
        return await this.tenantService.delete(tenant);
    }

}
