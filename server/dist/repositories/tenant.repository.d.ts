import { Model, Schema as MongooseSchema } from 'mongoose';
import { ApartmentService } from 'src/modules/apartment/apartment.service';
import { CreateTenantDto } from 'src/modules/tenant/dto/createTenant.dto';
import { UserService } from 'src/modules/user/user.service';
import { Tenant } from '../entities/tenant.entity';
export declare class TenantRepository {
    private readonly tenantModel;
    private readonly userService;
    private readonly apartmentService;
    constructor(tenantModel: Model<Tenant>, userService: UserService, apartmentService: ApartmentService);
    createTenant(createTenantDto: CreateTenantDto, document: string): Promise<any>;
    getTenantHistory(owner: string): Promise<any>;
    getTenantById(id: MongooseSchema.Types.ObjectId): Promise<any>;
}
