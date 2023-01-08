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
exports.TenantRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const apartment_service_1 = require("../modules/apartment/apartment.service");
const user_service_1 = require("../modules/user/user.service");
const tenant_entity_1 = require("../entities/tenant.entity");
let TenantRepository = class TenantRepository {
    constructor(tenantModel, userService, apartmentService) {
        this.tenantModel = tenantModel;
        this.userService = userService;
        this.apartmentService = apartmentService;
    }
    async createTenant(createTenantDto, document) {
        const currentUser = await this.userService.getUserByMobile(createTenantDto.owner);
        console.log(currentUser);
        if (currentUser) {
            createTenantDto.owner = currentUser._id;
        }
        else {
            throw new common_1.InternalServerErrorException('User Not Exist');
        }
        let tenant;
        tenant = new this.tenantModel(Object.assign(Object.assign({}, createTenantDto), { _id: createTenantDto.id, agreement: [document], currentAgreement: document }));
        try {
            tenant = await tenant.save();
            console.log(tenant);
            this.apartmentService.changeTenant(tenant.apartment, tenant._id, tenant.owner);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al consultar la BD', error);
        }
        return tenant;
    }
    async getTenantById(id) {
        let tenant;
        try {
            tenant = await this.tenantModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('No existe el registro con id' + id, error);
        }
        if (!tenant) {
            throw new common_1.NotFoundException('The tenant with this id does not exist');
        }
        return tenant;
    }
};
TenantRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(tenant_entity_1.Tenant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        apartment_service_1.ApartmentService])
], TenantRepository);
exports.TenantRepository = TenantRepository;
//# sourceMappingURL=tenant.repository.js.map