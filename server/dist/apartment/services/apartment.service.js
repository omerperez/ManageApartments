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
exports.ApartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const apartmentQueries_1 = require("../../sql/apartmentQueries");
const tenantQueries_1 = require("../../sql/tenantQueries");
const QueryUtil_1 = require("../../utils/QueryUtil");
const typeorm_2 = require("typeorm");
let ApartmentService = class ApartmentService {
    constructor(connection) {
        this.connection = connection;
    }
    async getById(apartmentId) {
        const [currentApartmentQuery, parameters] = (0, QueryUtil_1.default)(apartmentQueries_1.default.apartmentById, apartmentId);
        const [currentApartment] = await this.connection.query(currentApartmentQuery, parameters);
        if (currentApartment) {
            const [tenantByIdQuery, tenantParameters] = (0, QueryUtil_1.default)(tenantQueries_1.default.tenantById, { currentTenantId: currentApartment.currentTenantId });
            const tenant = await this.connection.query(tenantByIdQuery, tenantParameters);
            return {
                apartment: currentApartment,
                tenant: tenant,
            };
        }
        return undefined;
    }
    async getApartmentByManagerId(id) {
        const [apartmentByManagerQuery, parameters] = (0, QueryUtil_1.default)(apartmentQueries_1.default.getManagerApartmentById, id);
        return await this.connection.query(apartmentByManagerQuery, parameters);
    }
    async create(apartment) {
        const [createQuery, parameters] = (0, QueryUtil_1.default)(apartmentQueries_1.default.createApartment, apartment);
        return await this.connection.query(createQuery, parameters);
    }
    async edit(apartment) {
        const [editQuery, parameters] = (0, QueryUtil_1.default)(apartmentQueries_1.default.editApartment, apartment);
        return await this.connection.query(editQuery, parameters);
    }
    async delete(apartmentId) {
        const [deleteQuery, parameters] = (0, QueryUtil_1.default)(apartmentQueries_1.default.deleteApartment, apartmentId);
        return await this.connection.query(deleteQuery, parameters);
    }
};
ApartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], ApartmentService);
exports.ApartmentService = ApartmentService;
//# sourceMappingURL=apartment.service.js.map