/// <reference types="node" />
/// <reference types="multer" />
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { PublicFile } from 'src/s3/modules/s3.modules';
import { ConfigService } from '@nestjs/config';
export declare class FileUploaderService {
    private publicFilesRepository;
    private readonly configService;
    constructor(publicFilesRepository: Repository<PublicFile>, configService: ConfigService);
    uploadFile(dataBuffer: Buffer, filename: string): Promise<string>;
    uploadSingleFile(s3: S3, dataBuffer: Buffer, filename: string): Promise<string>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<string[]>;
}
