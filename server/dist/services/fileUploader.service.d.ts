/// <reference types="node" />
/// <reference types="multer" />
import { S3 } from "aws-sdk";
export declare class FileUploaderService {
    constructor();
    uploadFile(dataBuffer: Buffer, filename: string): Promise<string>;
    uploadSingleFile(s3: S3, dataBuffer: Buffer, filename: string): Promise<string>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<string[]>;
}
