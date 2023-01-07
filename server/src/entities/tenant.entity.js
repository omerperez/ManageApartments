"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TenantSchema = exports.Tenant = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var apartment_entity_1 = require("./apartment.entity");
var Tenant = /** @class */ (function (_super) {
    __extends(Tenant, _super);
    function Tenant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true, unique: true, type: String })
    ], Tenant.prototype, "id");
    __decorate([
        (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, required: true, ref: apartment_entity_1.Apartment.name })
    ], Tenant.prototype, "apartment");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "firstName");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "lastName");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "mobileNumber");
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], Tenant.prototype, "anotherMobileNumber");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "email");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "gender");
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], Tenant.prototype, "currentAgreement");
    __decorate([
        (0, mongoose_1.Prop)({ type: [String] })
    ], Tenant.prototype, "agreement");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "birthday");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "startDate");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Tenant.prototype, "endDate");
    Tenant = __decorate([
        (0, mongoose_1.Schema)()
    ], Tenant);
    return Tenant;
}(mongoose_2.Document));
exports.Tenant = Tenant;
exports.TenantSchema = mongoose_1.SchemaFactory.createForClass(Tenant);
