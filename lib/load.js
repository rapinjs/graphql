"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let query = {};
let mutation = {};
exports.setQuery = (path, resolver) => {
    query[path] = resolver;
};
exports.getQueries = () => {
    return query;
};
exports.setMutation = (path, resolver) => {
    mutation[path] = resolver;
};
exports.getMutations = () => {
    return mutation;
};
//# sourceMappingURL=load.js.map