"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema_1 = require("../schema");
const lodash_1 = require("lodash");
exports.searchType = name => {
    let type = name;
    let isArray = false;
    if (type === Array) {
        type = type[0];
        isArray = true;
    }
    if (typeof type === 'object' && !graphql_1.isScalarType(type) && !graphql_1.isObjectType(type)) {
        type = type[0];
        isArray = true;
    }
    if (type === String || type === Date) {
        type = graphql_1.GraphQLString;
    }
    else if (type === Number) {
        return graphql_1.GraphQLInt;
    }
    else {
        if (!graphql_1.isObjectType(type) && !graphql_1.isScalarType(type)) {
            if (lodash_1.isString(type)) {
                type = schema_1.getType(type);
            }
            else {
                type = schema_1.getType(type.name);
            }
        }
    }
    return isArray ? graphql_1.GraphQLList(type) : type;
};
//# sourceMappingURL=type.js.map