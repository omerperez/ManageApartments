import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { TenantRepository } from 'src/repositories/tenant.repository';
import { ApartmentService } from '../apartment/apartment.service';
import { UserService } from '../user/user.service';
import { CreateTenantDto } from './dto/createTenant.dto';

@Injectable()
export class TenantService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => ApartmentService))
        private readonly apartmentService: ApartmentService,
        private readonly tenantRepository: TenantRepository,
    ) { }

    async createTenant(createTenantDto: CreateTenantDto, document: Express.Multer.File) {
        const getUser: any = await this.userService.getUserByMobile(createTenantDto.owner);
        if (getUser) {
            const documentUrl = '';
            const tenant = await this.tenantRepository.createTenant(createTenantDto, documentUrl);
            if (tenant) {
                await this.apartmentService.changeTenant(
                    createTenantDto.apartment,
                    createTenantDto.id
                )
            }
            return tenant;
        } else {
            throw new UnauthorizedException('Incorrect');
        }
    }

    // async getTenants(getQueryDto: GetQueryDto) {
    //     return await this.tenantRepository.getClients(getQueryDto);
    // }

    async getTenantById(id: MongooseSchema.Types.ObjectId) {
        return await this.tenantRepository.getTenantById(id);
    }
}
