export class Graphql {
  private registry
  constructor(registry) {
    this.registry = registry
  }

  public loadResolver(path, args) {
    return (root, argsResolver) => {
      return this.registry.get('load').controller(path, { ...args, root, args: argsResolver })
    }
  }
}
