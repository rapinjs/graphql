"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importStar(require("./types/errors"));
const fs_1 = __importDefault(require("fs"));
__exportStar(require("./decorators"), exports);
const load_1 = require("./load");
const apollo_server_koa_1 = require("apollo-server-koa");
const plugin_1 = require("./plugin");
const rapin_1 = require("rapin");
const logger_1 = require("rapin/lib/logger");
const core_1 = require("@graphql-codegen/core");
const graphql_1 = require("graphql");
const typescriptPlugin = __importStar(require("@graphql-codegen/typescript"));
const plugin_2 = require("rapin/lib/helper/plugin");
class GraphQLPlugin {
    onAfterInitRouter({ app, config, registry }) {
        return __awaiter(this, void 0, void 0, function* () {
            registry.set('graphql', new plugin_1.Graphql(registry));
            const test = fs_1.default.readFileSync(config.graphql.schema);
            let context = null;
            const server = new apollo_server_koa_1.ApolloServer({
                typeDefs: apollo_server_koa_1.gql(test.toString()),
                playground: rapin_1.isDev,
                context: ({ ctx }) => {
                    context = ctx;
                    return ctx;
                },
                resolvers: {
                    Query: load_1.getQueries(),
                    Mutation: load_1.getMutations(),
                },
                formatError(err) {
                    plugin_2.pluginEvent('onError', {
                        app,
                        err,
                        ctx: context,
                        registry,
                        config
                    });
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
            if (config.graphql.generator) {
                const logger = new logger_1.Logger('GraphQL plugin - generate code');
                const schema = graphql_1.buildSchema(test.toString());
                const outputFile = config.graphql.generatorOutput || 'types/graphql.ts';
                const configGenerator = {
                    filename: outputFile,
                    schema: graphql_1.parse(graphql_1.printSchema(schema)),
                    plugins: [
                        {
                            typescript: {},
                        },
                    ],
                    pluginMap: {
                        typescript: typescriptPlugin,
                    },
                    documents: [],
                    config: {}
                };
                const output = yield core_1.codegen(configGenerator);
                fs_1.default.writeFileSync(outputFile, output);
                logger.end();
            }
            server.applyMiddleware({ app });
        });
    }
}
exports.default = GraphQLPlugin;
//# sourceMappingURL=index.js.map