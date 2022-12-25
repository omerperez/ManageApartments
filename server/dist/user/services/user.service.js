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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userQueries_1 = require("../../sql/userQueries");
const AuthUtil_1 = require("../../utils/AuthUtil");
const QueryUtil_1 = require("../../utils/QueryUtil");
const typeorm_2 = require("typeorm");
const argon2_1 = require("argon2");
let UserService = class UserService {
    constructor(connection) {
        this.connection = connection;
    }
    async login(loginProperties) {
        const [loginUserQuery, parameters] = (0, QueryUtil_1.default)(userQueries_1.default.userByMobile, { id: loginProperties.mobile });
        const currentUser = await this.connection.query(loginUserQuery, parameters);
        const isPasswordValid = await AuthUtil_1.default.isValidPassword(loginProperties.password, currentUser.password);
        if (isPasswordValid === true) {
            return currentUser;
        }
        else {
            return null;
        }
    }
    verify(token) {
        const accessToken = AuthUtil_1.default.verify(token);
        if (accessToken) {
            return accessToken;
        }
        return '';
    }
    async getById(userId) {
        const [currentUserQuery, parameters] = (0, QueryUtil_1.default)(userQueries_1.default.userByMobile, userId);
        const [currentUser] = await this.connection.query(currentUserQuery, parameters);
        return currentUser;
    }
    async create(user) {
        const hashPassword = await (0, argon2_1.hash)(user.password);
        user.password = hashPassword;
        const [createUserQuery, parameters] = (0, QueryUtil_1.default)(userQueries_1.default.createUser, user);
        return await this.connection.query(createUserQuery, parameters);
    }
    async edit(user) {
        const [editUserQuery, parameters] = (0, QueryUtil_1.default)(userQueries_1.default.editUser, user);
        return await this.connection.query(editUserQuery, parameters);
    }
    async delete(userId) {
        const [deleteUserQuery, parameters] = (0, QueryUtil_1.default)(userQueries_1.default.deleteUser, userId);
        return await this.connection.query(deleteUserQuery, parameters);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map