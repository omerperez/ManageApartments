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
const tenant_entity_1 = require("../entities/tenant.entity");
let TenantRepository = class TenantRepository {
    constructor(tenantModel) {
        this.tenantModel = tenantModel;
    }
    async createTenant(createTenantDto, document) {
        let tenant = await this.getTenantById(createTenantDto.id);
        if (tenant) {
            throw new common_1.ConflictException('Tenant Already Exists!');
        }
        tenant = new this.tenantModel(Object.assign(Object.assign({}, createTenantDto), { agreement: [document], currentAgreement: document }));
        try {
            tenant = await tenant.save();
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
    __metadata("design:paramtypes", [mongoose_2.Model])
], TenantRepository);
exports.TenantRepository = TenantRepository;
//# sourceMappingURL=tenant.repository.js.map