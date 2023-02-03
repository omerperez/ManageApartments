import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentSchema } from 'src/entities/apartment.entity';
import { TenantSchema } from 'src/entities/tenant.entity';
import { ApartmentRepository } from 'src/repositories/apartment.repository';
import { DashboardService } from 'src/services/dashboard.service';

import { UserSchema } from '../../entities/user.entity';
import { TenantRepository } from '../../repositories/tenant.repository';
import { ApartmentModule } from '../apartment/apartment.module';
import { ApartmentService } from '../apartment/apartment.service';
import { FileUploaderModule } from '../fileUploader/fileUploader.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Module({
    imports: [
        FileUploaderModule,
        UserModule,
        ApartmentModule,
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
        MongooseModule.forFeature([{ name: "Apartment", schema: ApartmentSchema }]),
        MongooseModule.forFeature([{ name: "Tenant", schema: TenantSchema }]),
    ],
    controllers: [TenantController],
    providers: [TenantService, TenantRepository, UserService, ApartmentService, DashboardService],
    exports: [TenantService, TenantRepository],
})
export class TenantModule { }
