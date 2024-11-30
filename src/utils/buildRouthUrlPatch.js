export function buildRouthUrlPath(urlPath) {

    const routeParametersDynamic = /:([a-zA-Z]+)\??/g; // modifiquei para aceitar string vazia
    const urlPathSubstitution = urlPath.replaceAll(routeParametersDynamic, '(?<$1>[a-z0-9\\-_]*)'); //O uso de "*" permite capturar strings vazias para parâmetros opcionais.
    const regex = new RegExp(`^${urlPathSubstitution}$`);
    
    return regex;


}