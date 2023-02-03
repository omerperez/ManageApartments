import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { env } from 'process';
import { UploaderFile } from './modules/UploaderFile.module';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Injectable()
export class FileUploaderService {
    constructor(
        @InjectRepository(UploaderFile)
        private publicFilesRepository: Repository<UploaderFile>,
        private readonly configService: ConfigService
    ) { }

    async uploadFile(dataBuffer: Buffer, filename: string): Promise<string> {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: env.AWS_PUBLIC_BUCKET_NAME,
            ContentDisposition: 'inline',
            ContentType: 'application/pdf',
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        }).promise();

        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        await this.publicFilesRepository.save(newFile);
        return newFile.url;
    }

    async uploadSingleFile(s3: S3, dataBuffer: Buffer, filename: string): Promise<string> {
        const uploadResult = await s3.upload({
            Bucket: env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        }).promise();
        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });

        await this.publicFilesRepository.save(newFile);
        return newFile.url;
    }

    async uploadMultipleFiles(files: Array<Express.Multer.File>) {
        const s3 = new S3();
        let uploadFiles: string[] = [];
        await Promise.all(files.map(async (file) => {
            const currentUrl = await this.uploadSingleFile(s3, file.buffer, file.originalname);
            uploadFiles.push(currentUrl);
        }));

        return uploadFiles;
    }
}
