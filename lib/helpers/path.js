"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.getPath = (target) => {
    const nameController = lodash_1.toLower(lodash_1.replace(target.constructor.name, /([a-z])([A-Z])/g, '$1/$2'));
    const path = nameController.split('/');
    path.shift();
    return path.join('/');
};
//# sourceMappingURL=path.js.map