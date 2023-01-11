"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApartmentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const apartment_entity_1 = require("../../entities/apartment.entity");
const apartment_repository_1 = require("../../repositories/apartment.repository");
const fileUploader_module_1 = require("../fileUploader/fileUploader.module");
const user_module_1 = require("../user/user.module");
const apartment_controller_1 = require("./apartment.controller");
const apartment_service_1 = require("./apartment.service");
let ApartmentModule = ApartmentModule_1 = class ApartmentModule {
};
ApartmentModule = ApartmentModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            fileUploader_module_1.FileUploaderModule,
            user_module_1.UserModule,
            ApartmentModule_1,
            mongoose_1.MongooseModule.forFeature([{ name: "Apartment", schema: apartment_entity_1.ApartmentSchema }]),
        ],
        controllers: [apartment_controller_1.ApartmentController],
        providers: [apartment_repository_1.ApartmentRepository, apartment_service_1.ApartmentService,],
        exports: [apartment_service_1.ApartmentService, apartment_repository_1.ApartmentRepository]
    })
], ApartmentModule);
exports.ApartmentModule = ApartmentModule;
//# sourceMappingURL=apartment.module.js.map