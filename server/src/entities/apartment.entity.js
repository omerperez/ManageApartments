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
exports.ApartmentSchema = exports.Apartment = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var tenant_entity_1 = require("./tenant.entity");
var user_entity_1 = require("./user.entity");
var Apartment = /** @class */ (function (_super) {
    __extends(Apartment, _super);
    function Apartment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, required: false, ref: tenant_entity_1.Tenant.name })
    ], Apartment.prototype, "tenant");
    __decorate([
        (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, required: true, ref: user_entity_1.User.name })
    ], Apartment.prototype, "owner");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Apartment.prototype, "name");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Apartment.prototype, "city");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Apartment.prototype, "neighborhood");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], Apartment.prototype, "street");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: Number })
    ], Apartment.prototype, "number");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: Number })
    ], Apartment.prototype, "floor");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: Number })
    ], Apartment.prototype, "apartmentNumber");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: Number })
    ], Apartment.prototype, "postCode");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: Number })
    ], Apartment.prototype, "price");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: Number })
    ], Apartment.prototype, "area");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: Number })
    ], Apartment.prototype, "bedrooms");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: Number })
    ], Apartment.prototype, "toilet");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: String })
    ], Apartment.prototype, "animals");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: String })
    ], Apartment.prototype, "includes");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: String })
    ], Apartment.prototype, "comments");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: Number })
    ], Apartment.prototype, "mainImageIndex");
    __decorate([
        (0, mongoose_1.Prop)({ required: false, type: [String] })
    ], Apartment.prototype, "images");
    Apartment = __decorate([
        (0, mongoose_1.Schema)()
    ], Apartment);
    return Apartment;
}(mongoose_2.Document));
exports.Apartment = Apartment;
exports.ApartmentSchema = mongoose_1.SchemaFactory.createForClass(Apartment);
