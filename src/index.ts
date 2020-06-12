import errors, { hasError } from './types/errors'
import fs from 'fs'
export * from './decorators'
import { getQueries, getMutations } from './load'
import { ApolloServer, gql } from 'apollo-server-koa'
import { Graphql } from './plugin'
import { isDev } from 'rapin'
import { codegen } from '@graphql-codegen/core';
import { buildSchema, GraphQLSchema, printSchema, parse } from 'graphql';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import {pluginEvent} from 'rapin/lib/helper/plugin'

export default class GraphQLPlugin {
  public async onAfterInitRouter({ app, config, registry }) {
    registry.set('graphql', new Graphql(registry))
    const test = fs.readFileSync(config.graphql.schema)
    const server = new ApolloServer({
      typeDefs: gql(test.toString()),
      playground: isDev,
      context: ({ ctx }) => ctx,
      resolvers: {
        Query: getQueries(),
        Mutation: getMutations(),
      },
      formatError(err) {
        pluginEvent('onError', {
          app,
          err,
          ctx: null,
          registry,
          config
        })
        const isCustomMessage = hasError(err.message)
        return {
          message: isCustomMessage
            ? errors().errorType[err.message].message
            : err.message,
          extensions: {
            statusCode: isCustomMessage
              ? errors().errorType[err.message].statusCode
              : err.message,
            code: err.originalError && err.originalError.name,
          },
          locations: err.locations,
          path: err.path,
        }
      },
    })

    if (config.graphql.generator) {
      const schema: GraphQLSchema = buildSchema(test.toString());
      const outputFile: string = config.graphql.generatorOutput || 'types/graphql.ts';
      const configGenerator = {
          filename: outputFile,
          schema: parse(printSchema(schema)), 
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
      }
      const output = await codegen(configGenerator)
      fs.writeFileSync(outputFile, output);
    }

    server.applyMiddleware({ app })
  }
}
