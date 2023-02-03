/// <reference types="node" />
/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { UploaderFile } from './modules/UploaderFile.module';
import { Repository } from 'typeorm';
export declare class FileUploaderService {
    private publicFilesRepository;
    private readonly configService;
    constructor(publicFilesRepository: Repository<UploaderFile>, configService: ConfigService);
    uploadFile(dataBuffer: Buffer, filename: string): Promise<string>;
    uploadSingleFile(s3: S3, dataBuffer: Buffer, filename: string): Promise<string>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<string[]>;
}
