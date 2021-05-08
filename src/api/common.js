import service from './../utils/request'

/**
 * 获取table列表
 * @param {data} data 
 */
 export function TableList(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
    })
}

/**
 * 删除table列表
 * @param {data} data 
 */
 export function TableDelete(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
    })
}


/**
 * 获取form列表
 * @param {params} params 
 */
 export function requestData(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data || {},
    })
}
