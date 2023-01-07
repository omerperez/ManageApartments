/// <reference types="multer" />
import { S3Service } from "../services/s3.service";
export declare class S3Controller {
    private fileUploadService;
    constructor(fileUploadService: S3Service);
    uploadFile(files: Array<Express.Multer.File>): Promise<string[]>;
}
