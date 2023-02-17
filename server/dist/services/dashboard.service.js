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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../modules/tenant/tenant.service");
let DashboardService = class DashboardService {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async getAgreementsData(tenantId) {
        return await this.tenantService.getTenantsByFilter({ id: tenantId }, 'id firstName lastName agreement');
    }
    async getAgreementsCountForEachTenant(ownerId) {
        const tenantList = await this.tenantService.getTenantHistory(ownerId);
        const result = [];
        tenantList.map((tenant) => {
            result.push({
                id: tenant.id,
                name: `${tenant.firstName} ${tenant.lastName}`,
                agreementsCount: tenant.agreement.length + 1,
                isActive: false
            });
        });
        return result;
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_service_1.TenantService))),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map