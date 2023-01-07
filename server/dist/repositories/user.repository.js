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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../entities/user.entity");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async registerUser(registerUserDto) {
        let user = await this.getUserByMobile(registerUserDto.mobile);
        if (user) {
            throw new common_1.ConflictException('User already exists');
        }
        user = new this.userModel(registerUserDto);
        try {
            user = await user.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!user) {
            throw new common_1.ConflictException('User not created');
        }
        return user;
    }
    async getUserById(id) {
        let user;
        try {
            user = await this.userModel.findById({ _id: id });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getUserByMobile(mobile) {
        let user;
        try {
            user = await this.userModel.findOne({ mobile: mobile });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return user;
    }
};
UserRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map