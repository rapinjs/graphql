import { setMutation } from '../load'
import { getPath } from '../helpers'
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
    throw new Error('MISSING')
  }

  return output
}

export const Mutation = (path?: string) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    setMutation(path ? path : propertyKey, async (root, args, ctx, info) => {
      const actionPath = getPath(target) + '/' + propertyKey

      // ctx.registry.get('request').post = {
      //   ...args,
      //   ...ctx.registry.get('request').post,
      // }

      return resolverAction(actionPath, args, ctx)
    })
  }
}
