/// <reference types="node" />
/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { PublicFile } from '../modules/s3.modules';
export declare class S3Service {
    private publicFilesRepository;
    private readonly configService;
    constructor(publicFilesRepository: Repository<PublicFile>, configService: ConfigService);
    uploadPublicFile(dataBuffer: Buffer, filename: string): Promise<string>;
    uploadSingleFile(s3: S3, dataBuffer: Buffer, filename: string): Promise<string>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<string[]>;
}
