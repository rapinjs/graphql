"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const helpers_1 = require("../helpers");
const schema_1 = require("../schema");
const lodash_1 = require("lodash");
const graphql_1 = require("graphql");
exports.ID = graphql_1.GraphQLID;
function ObjectType(input) {
    return (target) => {
        schema_1.createType(input ? input : false);
        schema_1.resetCurrent();
    };
}
exports.ObjectType = ObjectType;
function Field(type) {
    return (target, propertyKey) => {
        const name = target.constructor.name;
        const propertyType = Reflect.getMetadata('design:type', target, propertyKey);
        const metadataDesignType = propertyType;
        const fieldType = !lodash_1.isUndefined(type)
            ? helpers_1.searchType(type())
            : helpers_1.searchType(metadataDesignType);
        schema_1.setCurrentField(propertyKey, fieldType);
        schema_1.setCurrentType(name);
    };
}
exports.Field = Field;
//# sourceMappingURL=type.js.map