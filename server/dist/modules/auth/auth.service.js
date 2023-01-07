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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const jsonwebtoken = require("jsonwebtoken");
const auth_entity_1 = require("../../entities/auth.entity");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
        this.refreshTokens = [];
    }
    async login(loginAuthDto, values) {
        const getUser = await this.userService.getUserByMobile(loginAuthDto.mobile);
        if (!getUser) {
            return undefined;
        }
        const isPasswordPropper = argon2.verify(getUser.password, loginAuthDto.password);
        if (isPasswordPropper) {
            const authProperties = await this.newRefreshAndAccessToken(getUser, values);
            console.log(authProperties);
            delete getUser.password;
            return {
                user: getUser,
                auth: authProperties
            };
        }
        else {
            return undefined;
        }
    }
    async verify(token) {
        const verifyToken = await jsonwebtoken.verify(token, process.env.SECRET_TOKEN);
        console.log("verifyToken");
        console.log(verifyToken);
        if (typeof verifyToken === 'string') {
            return undefined;
        }
        return verifyToken;
    }
    async newRefreshAndAccessToken(user, values) {
        const refreshObject = new auth_entity_1.default(Object.assign(Object.assign({ id: this.refreshTokens.length === 0
                ? 0
                : this.refreshTokens[this.refreshTokens.length - 1].id + 1 }, values), { userId: user.mobile }));
        this.refreshTokens.push(refreshObject);
        return {
            refreshToken: refreshObject.sign(),
            accessToken: jsonwebtoken.sign({
                userId: user.mobile,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }, process.env.SECRET_TOKEN, {
                expiresIn: '6h',
            }),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map