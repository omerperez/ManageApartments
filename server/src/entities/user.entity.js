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
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var tenant_entity_1 = require("./tenant.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "firstName");
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "lastName");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, unique: true })
    ], User.prototype, "mobile");
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], User.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: tenant_entity_1.Tenant.name }] })
    ], User.prototype, "tenants");
    User = __decorate([
        (0, mongoose_1.Schema)()
    ], User);
    return User;
}(mongoose_2.Document));
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
