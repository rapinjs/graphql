"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graphql {
    constructor(registry) {
        this.registry = registry;
    }
    loadResolver(path, args) {
        return root => {
            return this.registry.get('load').controller(path, Object.assign({}, args, { root }));
        };
    }
}
exports.Graphql = Graphql;
//# sourceMappingURL=plugin.js.map