import { replace, toLower } from 'lodash'

export const getPath = (target: Object): string => {
  const nameController: string = toLower(
    replace(target.constructor.name, /([a-z])([A-Z])/g, '$1/$2')
  )
  const path = nameController.split('/')
  path.shift()
  return path.join('/')
}
