export declare const Query: (path?: string) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => void

export declare const Mutation: (path?: string) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => void

export declare interface Graphql {
  loadResolver(path: string, args: any): any
}

declare module 'rapin' {
  interface Context {
    graphql: Graphql
  }
}