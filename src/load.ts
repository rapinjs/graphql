let query = {}
let mutation = {}

export const setQuery = (path, resolver) => {
    query[path] = resolver
}

export const getQueries = () => {
    return query
}
export const setMutation = (path, resolver) => {
    mutation[path] = resolver
}

export const getMutations = () => {
    return mutation
}