import { setQuery } from '../load'
import { getPath } from '../helpers/path'
import { setError } from '../types/errors'

const resolverAction = async (actionPath, args, ctx) => {
  let output = {}
  output = await ctx.registry
    .get('load')
    .controller(actionPath, args)

    const error = ctx.registry
      .get('error')
      .get()
    if (error) {
      setError('MISSING', error, 400)
      throw new Error(error.message)
    }

  return output
}

export const Query = (path?: string) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    setQuery(path ? path: propertyKey, async (root, args, ctx, info) => {
      const actionPath = getPath(target) + '/' + propertyKey

      return resolverAction(actionPath, args, ctx)
    })
  }
}
