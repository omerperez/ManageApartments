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
exports.ApartmentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const apartment_service_1 = require("./apartment.service");
let ApartmentController = class ApartmentController {
    constructor(apartmentService) {
        this.apartmentService = apartmentService;
    }
    async getUserApartments(query, response) {
        try {
            const userApartments = await this.apartmentService.getUserApartments(query.mobile);
            return response.status(common_1.HttpStatus.OK).send(userApartments);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async createApartment(files, body, res) {
        const apartmentDetails = body.apartmentDetails.trim();
        const createApartmentDto = JSON.parse(apartmentDetails);
        try {
            const newApartment = await this.apartmentService.createApartment(createApartmentDto, files);
            return res.status(common_1.HttpStatus.OK).send(newApartment);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async editApartment(files, body, res) {
        const apartmentDetails = body.updateApartment.trim();
        const updateApartment = JSON.parse(apartmentDetails);
        try {
            const update = await this.apartmentService.editApartment(updateApartment, files);
            return res.status(common_1.HttpStatus.OK).send(update);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getApartmentById(query, response) {
        const apartment = await this.apartmentService.getApartmentById(query.id, query.owner);
        return response.status(common_1.HttpStatus.OK).send(apartment);
    }
};
__decorate([
    (0, common_1.Get)('/my-apartments'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "getUserApartments", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "createApartment", null);
__decorate([
    (0, common_1.Post)('/edit'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "editApartment", null);
__decorate([
    (0, common_1.Get)('/find'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "getApartmentById", null);
ApartmentController = __decorate([
    (0, common_1.Controller)('apartment'),
    __metadata("design:paramtypes", [apartment_service_1.ApartmentService])
], ApartmentController);
exports.ApartmentController = ApartmentController;
//# sourceMappingURL=apartment.controller.js.map