"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploaderService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const process_1 = require("process");
const uuid_1 = require("uuid");
let FileUploaderService = class FileUploaderService {
    constructor() { }
    async uploadFile(dataBuffer, filename) {
        const s3 = new aws_sdk_1.S3();
        const { Location: location } = await s3
            .upload({
            Bucket: process_1.env.AWS_PUBLIC_BUCKET_NAME,
            ContentDisposition: "inline",
            ContentType: "application/pdf",
            Body: dataBuffer,
            Key: `${(0, uuid_1.v4)()}-${filename}`,
        })
            .promise();
        return location;
    }
    async uploadSingleFile(s3, dataBuffer, filename) {
        const { Location: location } = await s3
            .upload({
            Bucket: process_1.env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${(0, uuid_1.v4)()}-${filename}`,
        })
            .promise();
        return location;
    }
    async uploadMultipleFiles(files) {
        const s3 = new aws_sdk_1.S3();
        let uploadFiles = [];
        await Promise.all(files.map(async (file) => {
            const currentUrl = await this.uploadSingleFile(s3, file.buffer, file.originalname);
            uploadFiles.push(currentUrl);
        }));
        return uploadFiles;
    }
};
FileUploaderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileUploaderService);
exports.FileUploaderService = FileUploaderService;
//# sourceMappingURL=fileUploader.service.js.map