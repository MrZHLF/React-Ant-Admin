import service from './../utils/request'
/**
 * 获取列表
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
 * 删除列表
 * @param {data} data 
 */
 export function TableDelete(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
    })
}