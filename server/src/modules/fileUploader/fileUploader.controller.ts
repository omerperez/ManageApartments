import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploaderService } from "./fileUploader.service";

@Controller('s3')
export class FileUploaderController {
    constructor(private fileUploadService: FileUploaderService) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        let filesUrl: string[] = [];
        files.forEach(async (file) => {
            filesUrl.push(await this.fileUploadService.uploadFile(file.buffer, file.originalname));
        });
        return filesUrl;
    }
}