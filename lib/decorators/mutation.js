"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = require("../load");
const helpers_1 = require("../helpers");
const errors_1 = require("../types/errors");
const resolverAction = (actionPath, args) => __awaiter(this, void 0, void 0, function* () {
    let output = {};
    output = yield helpers_1.getRegistry()
        .get('load')
        .controller(actionPath, args);
    const error = helpers_1.getRegistry()
        .get('error')
        .get();
    if (error) {
        errors_1.setError('MISSING', error, 400);
        throw new Error('MISSING');
    }
    return output;
});
exports.Mutation = path => {
    return (target, propertyKey, descriptor) => {
        load_1.setMutation(path, (root, args) => __awaiter(this, void 0, void 0, function* () {
            const actionPath = helpers_1.getPath(target) + '/' + propertyKey;
            helpers_1.getRegistry().get('request').post = Object.assign({}, args, helpers_1.getRegistry().get('request').post);
            return resolverAction(actionPath, args);
        }));
    };
};
//# sourceMappingURL=mutation.js.map