import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploaderFile } from './modules/UploaderFile.module';
import { FileUploaderService } from './fileUploader.service';

@Module({
    imports: [TypeOrmModule.forFeature([UploaderFile])],
    providers: [FileUploaderService,],
    exports: [FileUploaderService],
})
export class FileUploaderModule { }
