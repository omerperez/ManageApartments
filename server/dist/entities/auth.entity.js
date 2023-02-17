"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class RefreshToken {
    constructor(init) {
        Object.assign(this, init);
    }
    sign() {
        return (0, jsonwebtoken_1.sign)(Object.assign({}, this), process.env.SECRET_TOKEN);
    }
}
exports.default = RefreshToken;
//# sourceMappingURL=auth.entity.js.map