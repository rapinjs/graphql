"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = require("../load");
const results = {};
exports.Query = path => {
    return (target, propertyKey, descriptor) => {
        load_1.setResolver(path, () => {
            console.log(path);
        });
    };
};
exports.default = results;
//# sourceMappingURL=resolver.js.map