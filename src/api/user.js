import service from './../utils/request'

/**
 * 添加用户
 * @param {data} data 
 */
export function UserAdd(data){
    return service.request({
        url: "/user/add/",
        method: "post",
        data,
    })
}

/**
 * 详情
 */
 export function UserDetailed(data){
    return service.request({
        url: "/user/detailed/",
        method: "post",
        data,
    })
}