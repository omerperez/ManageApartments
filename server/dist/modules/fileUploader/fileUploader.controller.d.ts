/// <reference types="multer" />
import { FileUploaderService } from "./fileUploader.service";
export declare class FileUploaderController {
    private fileUploadService;
    constructor(fileUploadService: FileUploaderService);
    uploadFile(files: Array<Express.Multer.File>): Promise<string[]>;
}
