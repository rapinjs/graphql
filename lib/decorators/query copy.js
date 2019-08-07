"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = require("../load");
exports.Query = path => {
    return (target, propertyKey, descriptor) => {
        load_1.setQuery(path, () => {
            console.log(path);
        });
    };
};
//# sourceMappingURL=query copy.js.map