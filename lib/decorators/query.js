"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = require("../load");
const path_1 = require("../helpers/path");
const errors_1 = require("../types/errors");
const resolverAction = (actionPath, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let output = {};
    output = yield ctx.registry
        .get('load')
        .controller(actionPath, args);
    const error = ctx.registry
        .get('error')
        .get();
    if (error) {
        errors_1.setError('MISSING', error, 400);
        throw new Error(error.message);
    }
    return output;
});
exports.Query = (path) => {
    return (target, propertyKey, descriptor) => {
        load_1.setQuery(path ? path : propertyKey, (root, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            const actionPath = path_1.getPath(target) + '/' + propertyKey;
            return resolverAction(actionPath, args, ctx);
        }));
    };
};
//# sourceMappingURL=query.js.map