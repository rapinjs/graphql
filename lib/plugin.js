"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graphql {
    constructor(registry) {
        this.registry = registry;
    }
    loadResolver(path, args) {
        return (argsResolver) => {
            return this.registry.get('load').controller(path, Object.assign({}, args, { args: argsResolver }));
        };
    }
}
exports.Graphql = Graphql;
//# sourceMappingURL=plugin.js.map