import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateTenantDto } from 'src/modules/tenant/dto/createTenant.dto';
import { Tenant } from '../entities/tenant.entity';
export declare class TenantRepository {
    private readonly tenantModel;
    constructor(tenantModel: Model<Tenant>);
    createTenant(createTenantDto: CreateTenantDto, document: string): Promise<any>;
    getTenantById(id: MongooseSchema.Types.ObjectId): Promise<any>;
}
