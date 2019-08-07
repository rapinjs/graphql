"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importStar(require("./types/errors"));
const fs_1 = __importDefault(require("fs"));
__export(require("./decorators"));
const load_1 = require("./load");
const apollo_server_koa_1 = require("apollo-server-koa");
const registry_1 = require("./helpers/registry");
const plugin_1 = require("./plugin");
class GraphQLPlugin {
    onAfterInitRouter({ app, config, registry }) {
        return __awaiter(this, void 0, void 0, function* () {
            registry.set('graphql', new plugin_1.Graphql(registry));
            registry_1.setRegistry(registry);
            const test = fs_1.default.readFileSync(config.graphql.schema);
            const server = new apollo_server_koa_1.ApolloServer({
                typeDefs: apollo_server_koa_1.gql(test.toString()),
                resolvers: {
                    Query: load_1.getQueries(),
                    Mutation: load_1.getMutations(),
                },
                formatError(err) {
                    const isCustomMessage = errors_1.hasError(err.message);
                    return {
                        message: isCustomMessage
                            ? errors_1.default().errorType[err.message].message
                            : err.message,
                        extensions: {
                            statusCode: isCustomMessage
                                ? errors_1.default().errorType[err.message].statusCode
                                : err.message,
                            code: err.originalError && err.originalError.name,
                        },
                        locations: err.locations,
                        path: err.path,
                    };
                },
            });
            server.applyMiddleware({ app });
        });
    }
}
exports.default = GraphQLPlugin;
//# sourceMappingURL=index.js.map