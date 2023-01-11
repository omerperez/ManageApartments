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
exports.ApartmentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const apartment_entity_1 = require("../entities/apartment.entity");
const user_service_1 = require("../modules/user/user.service");
let ApartmentRepository = class ApartmentRepository {
    constructor(apartmentModel, userService) {
        this.apartmentModel = apartmentModel;
        this.userService = userService;
    }
    async getUserApartments(mobile) {
        let apartments;
        const currentUser = await this.userService.getUserByMobile(mobile);
        try {
            if (currentUser) {
                apartments = (await this.apartmentModel.find({ owner: currentUser._id }));
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!apartments || apartments.length === 0) {
            throw new common_1.NotFoundException('User dont have any apartment yet');
        }
        return apartments;
    }
    async getUserApartmentsId(owner) {
        let apartments;
        try {
            apartments = (await this.apartmentModel.find({ owner: owner }, '_id'));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!apartments || apartments.length === 0) {
            throw new common_1.NotFoundException('User dont have any apartment yet');
        }
        return apartments;
    }
    async createApartment(createApartmentDto, images) {
        const currentUser = await this.userService.getUserByMobile(createApartmentDto.owner);
        if (currentUser) {
            createApartmentDto.owner = currentUser._id;
        }
        else {
            throw new common_1.InternalServerErrorException('User Not Exist');
        }
        let apartment = new this.apartmentModel(Object.assign(Object.assign({}, createApartmentDto), { images: images }));
        try {
            apartment = await apartment.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return apartment;
    }
    async editApartment(updateApartment, newImagesUrl) {
        const currentUser = await this.userService.getUserByMobile(updateApartment.owner);
        if (currentUser) {
            updateApartment.owner = currentUser._id;
        }
        else {
            throw new common_1.InternalServerErrorException('User Not Exist');
        }
        let apartment;
        try {
            if (newImagesUrl.length > 0) {
                const updateImages = updateApartment.images.concat(newImagesUrl);
                updateApartment.images = updateImages;
            }
            apartment = await this.apartmentModel.findOneAndUpdate({ _id: updateApartment.id }, updateApartment, {
                returnOriginal: false
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return apartment;
    }
    async changeTenant(apartmentId, tenantId) {
        const apartment = await this.apartmentModel.findById(apartmentId);
        if (apartment) {
            apartment.tenant = tenantId;
            return await apartment.update();
        }
        return undefined;
    }
    async getApartmentById(id, owner) {
        let apartment;
        const currentUser = await this.userService.getUserByMobile(owner);
        try {
            apartment = await this.apartmentModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return apartment;
    }
};
ApartmentRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(apartment_entity_1.Apartment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], ApartmentRepository);
exports.ApartmentRepository = ApartmentRepository;
//# sourceMappingURL=apartment.repository.js.map