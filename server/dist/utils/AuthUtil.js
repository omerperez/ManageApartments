"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const process_1 = require("process");
const login = async (user) => {
    if (user) {
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.mobile }, process_1.env.SECRET_TOKEN);
        return accessToken;
    }
    return '';
};
const hashUserPassword = async (password) => {
    const salt = await (0, bcrypt_1.genSalt)(10);
    return await (0, bcrypt_1.hash)(password, salt);
};
const isValidPassword = async (password, hashPassword) => {
    return await (0, bcrypt_1.compare)(password, hashPassword);
};
const verify = (token) => {
    return jsonwebtoken_1.default.verify(token, process_1.env.SECRET_TOKEN);
};
exports.default = { hashUserPassword, login, verify, isValidPassword };
//# sourceMappingURL=AuthUtil.js.map