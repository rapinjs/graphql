export class Graphql {
  private registry
  constructor(registry) {
    this.registry = registry
  }

  public loadResolver(path, args) {
    return (argsResolver) => {
      return this.registry.get('load').controller(path, { ...args, args: argsResolver })
    }
  }
}
