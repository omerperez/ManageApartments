import { Module } from '@nestjs/common';
import { UploaderFile } from './modules/UploaderFile.module';
import { FileUploaderService } from './fileUploader.service';

@Module({
    imports: [UploaderFile],
    providers: [FileUploaderService,],
    exports: [FileUploaderService],
})
export class FileUploaderModule { }
