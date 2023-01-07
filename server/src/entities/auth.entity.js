"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var RefreshToken = /** @class */ (function () {
    function RefreshToken(init) {
        Object.assign(this, init);
    }
    RefreshToken.prototype.sign = function () {
        return (0, jsonwebtoken_1.sign)(__assign({}, this), process.env.SECRET_TOKEN);
    };
    return RefreshToken;
}());
exports["default"] = RefreshToken;
