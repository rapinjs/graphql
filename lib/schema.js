"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const lodash_1 = require("lodash");
let localRegistry;
const queryFields = {};
const mutationFields = {};
let typeFields = {};
let typeName = '';
const types = {};
exports.init = ({ registry }) => {
    localRegistry = registry;
};
exports.getRegistry = () => localRegistry;
exports.createType = (input = false) => {
    types[typeName] = new graphql_1.GraphQLObjectType({
        name: typeName,
        fields: typeFields,
    });
    if (input) {
        const inputFields = {};
        for (const key of lodash_1.keys(typeFields)) {
            if (!graphql_1.isInputType(typeFields[key].type)) {
                if (typeFields[key].type.constructor.name === 'GraphQLList') {
                    inputFields[key] = {
                        type: graphql_1.GraphQLList(types[typeFields[key].type.ofType.name + 'Input']),
                    };
                }
                else {
                    inputFields[key] = {
                        type: types[typeFields[key].type.name + 'Input'],
                    };
                }
            }
            else {
                inputFields[key] = typeFields[key];
            }
        }
        types[typeName + 'Input'] = new graphql_1.GraphQLInputObjectType({
            name: typeName + 'Input',
            fields: inputFields,
        });
    }
};
exports.getType = (name) => {
    return types[name];
};
exports.setCurrentType = (name) => {
    typeName = name;
};
exports.setCurrentField = (name, value) => {
    typeFields[name] = { type: value };
};
exports.resetCurrent = () => {
    typeName = '';
    typeFields = {};
};
exports.setQuery = (name, type, resolve, args) => {
    queryFields[name] = {
        type,
        resolve,
        args,
    };
};
exports.setMutation = (name, type, resolve, args) => {
    mutationFields[name] = {
        type,
        resolve,
        args,
    };
};
exports.schema = () => {
    return new graphql_1.GraphQLSchema({
        query: new graphql_1.GraphQLObjectType({
            name: 'Query',
            fields: queryFields,
        }),
        types: lodash_1.toArray(types),
        mutation: new graphql_1.GraphQLObjectType({
            name: 'Mutation',
            fields: mutationFields,
        }),
    });
};
//# sourceMappingURL=schema.js.map