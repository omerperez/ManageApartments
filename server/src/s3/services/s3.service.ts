import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicFile } from '../modules/s3.modules';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { env } from 'process';


@Injectable()
export class S3Service {
    constructor(
        @InjectRepository(PublicFile)
        private publicFilesRepository: Repository<PublicFile>,
        private readonly configService: ConfigService
    ) { }

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
        const s3 = new S3();
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
    }

    async uploadSingleFile(s3: S3, dataBuffer: Buffer, filename: string) {
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
    }

    async uploadMultipleFiles(files: Array<Express.Multer.File>) {
        const s3 = new S3();
        let uploadFiles: string[] = [];
        files.forEach(async (file) => {
            const currentUrl = await this.uploadSingleFile(s3, file.buffer, file.originalname)
            // .then((currentUrl) => {
            uploadFiles.push(currentUrl);
            // });
        })
        return uploadFiles;
    }

}
