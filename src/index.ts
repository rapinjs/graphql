import errors, { hasError } from './types/errors'
import fs from 'fs'
export * from './decorators'
import { getQueries, getMutations } from './load'
import { ApolloServer, gql } from 'apollo-server-koa'
import { setRegistry } from './helpers/registry'
import { Graphql } from './plugin'

export default class GraphQLPlugin {
  public async onAfterInitRouter({ app, config, registry }) {

    registry.set('graphql', new Graphql(registry))
    setRegistry(registry)
    const test = fs.readFileSync(config.graphql.schema)
    const server = new ApolloServer({
      typeDefs: gql(test.toString()),
      resolvers: {
        Query: getQueries(),
        Mutation: getMutations(),
      },
      formatError(err) {
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

    server.applyMiddleware({ app })
  }
}
