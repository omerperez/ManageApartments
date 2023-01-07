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
exports.FileUploaderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const s3_modules_1 = require("../../s3/modules/s3.modules");
const config_1 = require("@nestjs/config");
let FileUploaderService = class FileUploaderService {
    constructor(publicFilesRepository, configService) {
        this.publicFilesRepository = publicFilesRepository;
        this.configService = configService;
    }
    async uploadFile(dataBuffer, filename) {
        const s3 = new aws_sdk_1.S3();
        const uploadResult = await s3.upload({
            Bucket: 'apartmentmanager',
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
            Bucket: 'apartmentmanager',
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
        await Promise.all(files.map(async (file) => {
            const currentUrl = await this.uploadSingleFile(s3, file.buffer, file.originalname);
            uploadFiles.push(currentUrl);
        }));
        return uploadFiles;
    }
};
FileUploaderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(s3_modules_1.PublicFile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], FileUploaderService);
exports.FileUploaderService = FileUploaderService;
//# sourceMappingURL=fileUploader.service.js.map