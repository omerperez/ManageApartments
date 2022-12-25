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
const apartment_service_1 = require("../services/apartment.service");
let ApartmentController = class ApartmentController {
    constructor(apartmentService) {
        this.apartmentService = apartmentService;
    }
    async getManagerApartments(userId) {
        return await this.apartmentService.getApartmentByManagerId(userId);
    }
    async getById(apartmentId) {
        return await this.apartmentService.getById(apartmentId);
    }
    async create(apartment) {
        return await this.apartmentService.create(apartment);
    }
    async edit(apartment) {
        return await this.apartmentService.edit(apartment);
    }
    async delete(apartmentId) {
        return await this.apartmentService.delete(apartmentId);
    }
};
__decorate([
    (0, common_1.Post)('all'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "getManagerApartments", null);
__decorate([
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "edit", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentController.prototype, "delete", null);
ApartmentController = __decorate([
    (0, common_1.Controller)('apartment'),
    __metadata("design:paramtypes", [apartment_service_1.ApartmentService])
], ApartmentController);
exports.ApartmentController = ApartmentController;
//# sourceMappingURL=apartment.controller.js.map