"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMutations = exports.setMutation = exports.getQueries = exports.setQuery = void 0;
let query = {};
let mutation = {};
const setQuery = (path, resolver) => {
    query[path] = resolver;
};
exports.setQuery = setQuery;
const getQueries = () => {
    return query;
};
exports.getQueries = getQueries;
const setMutation = (path, resolver) => {
    mutation[path] = resolver;
};
exports.setMutation = setMutation;
const getMutations = () => {
    return mutation;
};
exports.getMutations = getMutations;
//# sourceMappingURL=load.js.map