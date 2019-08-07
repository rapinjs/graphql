import { setQuery } from '../load'
import { getPath } from '../helpers/path'
import { getRegistry } from '../helpers/registry'
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

export const Query = path => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    setQuery(path, async (root, args) => {
      const actionPath = getPath(target) + '/' + propertyKey

      return resolverAction(actionPath, args)
    })
  }
}
