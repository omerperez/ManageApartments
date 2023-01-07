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
exports.ApartmentService = void 0;
const common_1 = require("@nestjs/common");
const apartment_repository_1 = require("../../repositories/apartment.repository");
const fileUploader_service_1 = require("../fileUploader/fileUploader.service");
let ApartmentService = class ApartmentService {
    constructor(apartmentRepository, fileUploaderService) {
        this.apartmentRepository = apartmentRepository;
        this.fileUploaderService = fileUploaderService;
    }
    async getUserApartments(mobile) {
        return await this.apartmentRepository.getUserApartments(mobile);
    }
    async createApartment(createApartmentDto, files) {
        const aprtmentImagesUrl = await this.fileUploaderService.uploadMultipleFiles(files);
        return await this.apartmentRepository.createApartment(createApartmentDto, aprtmentImagesUrl);
    }
    async getApartmentById(apartmentId) {
        return await this.apartmentRepository.getApartmentById(apartmentId);
    }
    async changeTenant(apartmentId, tenantId) {
        return await this.apartmentRepository.changeTenant(apartmentId, tenantId);
    }
};
ApartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [apartment_repository_1.ApartmentRepository,
        fileUploader_service_1.FileUploaderService])
], ApartmentService);
exports.ApartmentService = ApartmentService;
//# sourceMappingURL=apartment.service.js.map