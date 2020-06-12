import { isUndefined } from 'lodash'
const errorName = {}

const errorType = {}

export const hasError = type => !isUndefined(errorType[type])

export const setError = (type, message, statusCode) => {
  errorName[type] = type
  errorType[type] = {
    message,
    statusCode
  }
}

export default () => {
  return { errorName, errorType }
}
