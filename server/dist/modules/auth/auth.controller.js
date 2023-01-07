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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("./auth.service");
const LoginAuth_dto_1 = require("./dto/LoginAuth.dto");
const VerifyAuth_dto_1 = require("./dto/VerifyAuth.dto");
let AuthController = class AuthController {
    constructor(mongoConnection, authService) {
        this.mongoConnection = mongoConnection;
        this.authService = authService;
    }
    async login(headers, ip, loginAuthDto) {
        try {
            const results = await this.authService.login(loginAuthDto, {
                ipAddress: ip,
                userAgent: headers['user-agent'],
            });
            console.log(results);
            return results;
        }
        catch (error) {
            console.log("here");
            throw new common_1.BadRequestException(error);
        }
    }
    async verify(verifyAuthDto) {
        console.log(verifyAuthDto);
        return this.authService.verify(verifyAuthDto.token);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, LoginAuth_dto_1.LoginAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VerifyAuth_dto_1.VerifyAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection, auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map