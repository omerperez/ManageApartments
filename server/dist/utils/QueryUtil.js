"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yesql = require("yesql");
const getQueryAndObjectValues = (query, object) => {
    const queryInitParameters = yesql.pg(query)(object);
    return [queryInitParameters.text, queryInitParameters.values];
};
exports.default = getQueryAndObjectValues;
//# sourceMappingURL=QueryUtil.js.map