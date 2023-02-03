"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const apartment_entity_1 = require("../../entities/apartment.entity");
const tenant_entity_1 = require("../../entities/tenant.entity");
const dashboard_service_1 = require("../../services/dashboard.service");
const user_entity_1 = require("../../entities/user.entity");
const tenant_repository_1 = require("../../repositories/tenant.repository");
const apartment_module_1 = require("../apartment/apartment.module");
const apartment_service_1 = require("../apartment/apartment.service");
const fileUploader_module_1 = require("../fileUploader/fileUploader.module");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
const tenant_controller_1 = require("./tenant.controller");
const tenant_service_1 = require("./tenant.service");
let TenantModule = class TenantModule {
};
TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            fileUploader_module_1.FileUploaderModule,
            user_module_1.UserModule,
            apartment_module_1.ApartmentModule,
            mongoose_1.MongooseModule.forFeature([{ name: "User", schema: user_entity_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "Apartment", schema: apartment_entity_1.ApartmentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: "Tenant", schema: tenant_entity_1.TenantSchema }]),
        ],
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService, tenant_repository_1.TenantRepository, user_service_1.UserService, apartment_service_1.ApartmentService, dashboard_service_1.DashboardService],
        exports: [tenant_service_1.TenantService, tenant_repository_1.TenantRepository],
    })
], TenantModule);
exports.TenantModule = TenantModule;
//# sourceMappingURL=tenant.module.js.map