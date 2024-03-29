"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setError = exports.hasError = void 0;
const lodash_1 = require("lodash");
const errorName = {};
const errorType = {};
const hasError = type => !lodash_1.isUndefined(errorType[type]);
exports.hasError = hasError;
const setError = (type, message, statusCode) => {
    errorName[type] = type;
    errorType[type] = {
        message,
        statusCode
    };
};
exports.setError = setError;
exports.default = () => {
    return { errorName, errorType };
};
//# sourceMappingURL=errors.js.map