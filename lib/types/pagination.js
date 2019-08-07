"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sortObjectType = new graphql_1.GraphQLObjectType({
    name: 'sort',
    fields: {
        direction: {
            type: graphql_1.GraphQLString
        },
        property: {
            type: graphql_1.GraphQLString
        }
    }
});
exports.ObjectTypePagination = type => {
    return new graphql_1.GraphQLObjectType({
        name: `${type}Result`,
        fields: {
            content: {
                type: graphql_1.GraphQLList(type)
            },
            first: {
                type: graphql_1.GraphQLInt
            },
            last: {
                type: graphql_1.GraphQLInt
            },
            number: {
                type: graphql_1.GraphQLInt
            },
            numberOfElements: {
                type: graphql_1.GraphQLInt
            },
            size: {
                type: graphql_1.GraphQLInt
            },
            sort: {
                type: sortObjectType
            },
            totalElements: {
                type: graphql_1.GraphQLInt
            },
            totalPages: {
                type: graphql_1.GraphQLInt
            }
        }
    });
};
//# sourceMappingURL=pagination.js.map