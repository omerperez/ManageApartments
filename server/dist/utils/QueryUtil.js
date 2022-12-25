"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yesql_1 = require("yesql");
const getQueryAndObjectValues = (query, object) => {
    const queryInitParameters = (0, yesql_1.pg)(query)(object);
    return [queryInitParameters.text, queryInitParameters.values];
};
exports.default = getQueryAndObjectValues;
//# sourceMappingURL=QueryUtil.js.map