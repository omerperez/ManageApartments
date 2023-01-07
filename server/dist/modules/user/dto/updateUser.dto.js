"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const registerUser_dto_1 = require("./registerUser.dto");
class UpdateUserDto extends (0, mapped_types_1.PartialType)(registerUser_dto_1.RegisterUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=updateUser.dto.js.map