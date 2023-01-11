import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploaderFile } from './modules/uploaderFile.module';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { env } from 'process';
import { PublicFile } from 'src/s3/modules/s3.modules';
import { ConfigService } from '@nestjs/config';
import e from 'express';


@Injectable()
export class FileUploaderService {
    constructor(
        @InjectRepository(PublicFile)
        private publicFilesRepository: Repository<PublicFile>,
        private readonly configService: ConfigService
    ) { }

    async uploadFile(dataBuffer: Buffer, filename: string): Promise<string> {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: 'apartmentmanager',
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
        // return {
        //     key: uploadResult.Key,
        //     url: uploadResult.Location
        // }

        // const newFile = this.fileUploaderRepository.create({
        //     key: uploadResult.Key,
        //     url: uploadResult.Location
        // });

        // await this.fileUploaderRepository.save(newFile);
        // return newFile.url;
    }

    async uploadSingleFile(s3: S3, dataBuffer: Buffer, filename: string): Promise<string> {
        const uploadResult = await s3.upload({
            Bucket: 'apartmentmanager',
            // env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        }).promise();
        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });

        await this.publicFilesRepository.save(newFile);
        return newFile.url;
        // const newFile = this.fileUploaderRepository.create({
        //     key: uploadResult.Key,
        //     url: uploadResult.Location
        // });

        // await this.fileUploaderRepository.save(newFile);
        // return newFile.url;
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
