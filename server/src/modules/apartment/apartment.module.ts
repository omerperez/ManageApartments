import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentSchema } from 'src/entities/apartment.entity';
import { FileUploaderService } from 'src/services/fileUploader.service';
import { ApartmentRepository } from '../../repositories/apartment.repository';
import { UserModule } from '../user/user.module';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

@Module({
    imports: [
        UserModule,
        ApartmentModule,
        MongooseModule.forFeature([{ name: "Apartment", schema: ApartmentSchema }]),
    ],
    controllers: [ApartmentController],
    providers: [ApartmentRepository, ApartmentService, FileUploaderService],
    exports: [ApartmentService, ApartmentRepository]
})
export class ApartmentModule { }
