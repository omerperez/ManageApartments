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
        const ownerMobile = createTenantDto.owner;
        const currentUser = await this.userService.getUserByMobile(createTenantDto.owner);
        if (currentUser) {
            createTenantDto.owner = currentUser._id;
        }
        else {
            throw new common_1.InternalServerErrorException('User Not Exist');
        }
        let tenant = new this.tenantModel(Object.assign(Object.assign({}, createTenantDto), { agreement: [document], currentAgreement: document }));
        try {
            tenant = await this.tenantModel.create(tenant);
            const currentApartment = await this.apartmentService
                .getApartmentById(createTenantDto.apartment, ownerMobile);
            if (currentApartment.tenant) {
                currentApartment.tenantsHistory = currentApartment.tenantsHistory.concat(currentApartment.tenant);
            }
            currentApartment.tenant = tenant._id;
            await currentApartment.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al consultar la BD', error);
        }
        return tenant;
    }
    async editTenant(editTenantDto, document) {
        const currentUser = await this.userService.getUserByMobile(editTenantDto.owner);
        if (currentUser) {
            editTenantDto.owner = currentUser._id;
        }
        else {
            throw new common_1.InternalServerErrorException('User Not Exist');
        }
        let tenant;
        try {
            if (document) {
                const agreements = editTenantDto.agreement.concat(editTenantDto.currentAgreement);
                editTenantDto.currentAgreement = document;
                editTenantDto.agreement = agreements;
            }
            tenant = await this.tenantModel.findOneAndUpdate({ _id: editTenantDto._id }, editTenantDto, {
                returnOriginal: false
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return tenant;
    }
    async getTenantHistory(owner) {
        const currentUser = await this.userService.getUserByMobile(owner);
        let tenantsHistory;
        try {
            if (currentUser) {
                const apartments = await this.apartmentService.getUserApartmentsId(currentUser._id);
                const allTenant = await this.tenantModel.find();
                const apartmentsJson = JSON.stringify(apartments);
                tenantsHistory = allTenant.filter((tenant) => {
                    return (apartmentsJson.indexOf(JSON.stringify(tenant.apartment)) !== -1);
                });
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al consultar la BD', error);
        }
        return tenantsHistory;
    }
    async changeTenant(data) {
        const currentUser = await this.userService.getUserByMobile(data.owner);
        let apartment;
        try {
            apartment = await this.apartmentService.getApartmentById(data.apartmentId, data.owner);
            if (apartment && currentUser._id.equals(apartment.owner)) {
                apartment = Object.assign(Object.assign({}, apartment._doc), { id: data.apartmentId, owner: data.owner, tenantsHistory: apartment.tenant ? apartment.tenantsHistory.concat(apartment.tenant) : apartment.tenantsHistory });
                if (data.newTenantId) {
                    const newTenant = await this.tenantModel.findById(data.newTenantId);
                    apartment.tenant = newTenant._id;
                }
                else {
                    apartment.tenant = null;
                }
                apartment = await this.apartmentService.editApartment(apartment, []);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al consultar la BD', error);
        }
        return apartment;
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