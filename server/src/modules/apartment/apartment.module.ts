import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentSchema } from 'src/entities/apartment.entity';

import { ApartmentRepository } from '../../repositories/apartment.repository';
import { FileUploaderModule } from '../fileUploader/fileUploader.module';
import { UserModule } from '../user/user.module';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

@Module({
    imports: [
        FileUploaderModule,
        UserModule,
        ApartmentModule,
        MongooseModule.forFeature([{ name: "Apartment", schema: ApartmentSchema }]),
    ],
    controllers: [ApartmentController],
    providers: [ApartmentRepository, ApartmentService,],
    exports: [ApartmentService, ApartmentRepository]
})
export class ApartmentModule { }
