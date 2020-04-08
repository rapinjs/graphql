import { setMutation } from '../load'
import { getRegistry, getPath } from '../helpers'
import { setError } from '../types/errors'

const resolverAction = async (actionPath, args) => {
  let output = {}
  output = await getRegistry()
    .get('load')
    .controller(actionPath, args)

  const error = getRegistry()
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
    setMutation(path ? path : propertyKey, async (root, args) => {
      const actionPath = getPath(target) + '/' + propertyKey

      getRegistry().get('request').post = {
        ...args,
        ...getRegistry().get('request').post,
      }

      return resolverAction(actionPath, args)
    })
  }
}
