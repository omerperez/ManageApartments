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
exports.TenantController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const apartment_service_1 = require("../apartment/apartment.service");
const user_service_1 = require("../user/user.service");
const tenant_service_1 = require("./tenant.service");
let TenantController = class TenantController {
    constructor(tenantService, apartmentService, userService) {
        this.tenantService = tenantService;
        this.apartmentService = apartmentService;
        this.userService = userService;
    }
    async createClient(body, doc, res) {
        try {
            const tenant = body.tenant.trim();
            const createTenant = JSON.parse(tenant);
            const newClient = await this.tenantService.createTenant(createTenant, doc);
            return res.status(common_1.HttpStatus.CREATED).send(newClient);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getApartmentView(query, response) {
        const apartment = await this.apartmentService.getApartmentById(query.apartmentId, query.owner);
        const tenant = await this.tenantService.getTenantById(apartment.tenant);
        const tenantHistory = await this.tenantService.getTenantHistory(query.owner);
        return response.status(common_1.HttpStatus.OK).send({ apartment, tenant, tenantHistory });
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('doc')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "createClient", null);
__decorate([
    (0, common_1.Get)('/find'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getApartmentView", null);
TenantController = __decorate([
    (0, common_1.Controller)('tenant'),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        apartment_service_1.ApartmentService,
        user_service_1.UserService])
], TenantController);
exports.TenantController = TenantController;
//# sourceMappingURL=tenant.controller.js.map