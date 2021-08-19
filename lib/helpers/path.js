"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPath = void 0;
const lodash_1 = require("lodash");
const getPath = (target) => {
    const nameController = lodash_1.toLower(lodash_1.replace(target.constructor.name, /([a-z])([A-Z])/g, '$1/$2'));
    const path = nameController.split('/');
    path.shift();
    return path.join('/');
};
exports.getPath = getPath;
//# sourceMappingURL=path.js.map