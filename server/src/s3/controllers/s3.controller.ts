import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from "../services/s3.service";
import { Express } from 'express';

@Controller('s3')
export class S3Controller {
    constructor(private fileUploadService: S3Service) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        let filesUrl: string[] = [];
        files.forEach(async (file) => {
            filesUrl.push(await this.fileUploadService.uploadPublicFile(file.buffer, file.originalname));
        });
        return filesUrl;
    }
}