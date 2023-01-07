import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicFile } from 'src/s3/modules/s3.modules';
import { FileUploaderController } from './fileUploader.controller';
import { FileUploaderService } from './fileUploader.service';
import { UploaderFile } from './modules/uploaderFile.module';

@Module({
    imports: [TypeOrmModule.forFeature([PublicFile])],
    controllers: [FileUploaderController],
    providers: [FileUploaderService,],
    exports: [FileUploaderService],
})
export class FileUploaderModule { }
