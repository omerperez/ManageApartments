import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import getQueryAndObjectValues from 'src/utils/QueryUtil';
import tenantQueries from 'src/sql/tenantQueries';
import { IObjectId } from 'src/apartment/modules/apartment.interface';
import { IEditTenant, ITenant, ITenantId } from '../modules/tenant.interface';

@Injectable()
export class TenantService {
    constructor(@InjectConnection() private readonly connection: Connection) { }

    async tenantHistory(apartmentId: IObjectId) {
        const [tenantsHistoryQuery, parameters] = getQueryAndObjectValues(
            tenantQueries.createTenant,
            apartmentId,
        );
        return await this.connection.query(
            tenantsHistoryQuery as string,
            parameters as any[],
        );
    }

    async create(tenant: ITenant) {
        const [createQuery, parameters] = getQueryAndObjectValues(
            tenantQueries.createTenant,
            tenant,
        );
        return await this.connection.query(
            createQuery as string,
            parameters as any[],
        );
    }

    async edit(updateTenant: IEditTenant) {
        const [editQuery, parameters] = getQueryAndObjectValues(
            tenantQueries.editTenant,
            updateTenant,
        );
        return await this.connection.query(
            editQuery as string,
            parameters as any[],
        );
    }

    async delete(tenantId: ITenantId) {
        const [deleteQuery, parameters] = getQueryAndObjectValues(
            tenantQueries.deleteTenant,
            tenantId,
        );
        return await this.connection.query(
            deleteQuery as string,
            parameters as any[],
        );
    }
}
