
export const searchParamsToObject = (params) => {
    let searchObject = {}

    const searchParams = params.substr(1).split('&')

    searchParams.map(param => {
        const searchArray = param.split('=')
        searchObject[searchArray[0]] = searchArray[1]
    })
       
    return searchObject;
}