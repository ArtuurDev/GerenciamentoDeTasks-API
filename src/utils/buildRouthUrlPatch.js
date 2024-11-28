export function buildRouthUrlPath(urlPath) {

    const routeParamtersDinamics = /:([a-zA-Z]+)/g
    const urlPathSubstitution = urlPath.replaceAll(routeParamtersDinamics, '(?<$1>[a-z0-9\-_]+)')

    const regex = new RegExp(`^${urlPathSubstitution}`)

    return regex


}