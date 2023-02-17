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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const scrapper_service_1 = require("../../services/scrapper.service");
const registerUser_dto_1 = require("./dto/registerUser.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, scrapperService) {
        this.userService = userService;
        this.scrapperService = scrapperService;
    }
    async registerUser(createUserDto, res) {
        try {
            const newUser = await this.userService.registerUser(createUserDto);
            console.log(newUser);
            return res.status(common_1.HttpStatus.CREATED).send(newUser);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async calculatorPage(res) {
        try {
            const electricValue = await this.scrapperService.getTheCurrentElectricityPrice();
            const waterPricesValues = await this.scrapperService.getTheCurrentWaterPrice();
            console.log({
                water: waterPricesValues,
                electric: electricValue
            });
            return res.status(common_1.HttpStatus.CREATED).send({
                water: waterPricesValues,
                electric: electricValue
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Get)('/calculator'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "calculatorPage", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        scrapper_service_1.ScrapperService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map