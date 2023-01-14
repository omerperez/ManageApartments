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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const aws_sdk_1 = require("aws-sdk");
const process_1 = require("process");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const s3_modules_1 = require("../modules/s3.modules");
let S3Service = class S3Service {
    constructor(publicFilesRepository, configService) {
        this.publicFilesRepository = publicFilesRepository;
        this.configService = configService;
    }
    async uploadPublicFile(dataBuffer, filename) {
        const s3 = new aws_sdk_1.S3();
        const uploadResult = await s3.upload({
            Bucket: process_1.env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${(0, uuid_1.v4)()}-${filename}`
        }).promise();
        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        await this.publicFilesRepository.save(newFile);
        return newFile.url;
    }
    async uploadSingleFile(s3, dataBuffer, filename) {
        const uploadResult = await s3.upload({
            Bucket: process_1.env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${(0, uuid_1.v4)()}-${filename}`
        }).promise();
        const newFile = this.publicFilesRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
        await this.publicFilesRepository.save(newFile);
        return newFile.url;
    }
    async uploadMultipleFiles(files) {
        const s3 = new aws_sdk_1.S3();
        let uploadFiles = [];
        files.forEach(async (file) => {
            const currentUrl = await this.uploadSingleFile(s3, file.buffer, file.originalname);
            uploadFiles.push(currentUrl);
        });
        return uploadFiles;
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(s3_modules_1.PublicFile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map