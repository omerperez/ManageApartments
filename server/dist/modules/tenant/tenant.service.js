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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const tenant_repository_1 = require("../../repositories/tenant.repository");
const apartment_service_1 = require("../apartment/apartment.service");
const user_service_1 = require("../user/user.service");
let TenantService = class TenantService {
    constructor(userService, apartmentService, tenantRepository) {
        this.userService = userService;
        this.apartmentService = apartmentService;
        this.tenantRepository = tenantRepository;
    }
    async createTenant(createTenantDto, document) {
        const getUser = await this.userService.getUserByMobile(createTenantDto.owner);
        if (getUser) {
            const documentUrl = '';
            const tenant = await this.tenantRepository.createTenant(createTenantDto, documentUrl);
            if (tenant) {
                await this.apartmentService.changeTenant(createTenantDto.apartment, createTenantDto.id);
            }
            return tenant;
        }
        else {
            throw new common_1.UnauthorizedException('Incorrect');
        }
    }
    async getTenantById(id) {
        return await this.tenantRepository.getTenantById(id);
    }
};
TenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => apartment_service_1.ApartmentService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        apartment_service_1.ApartmentService,
        tenant_repository_1.TenantRepository])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map