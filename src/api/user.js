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
 * 编辑用户
 * @param {data} data 
 */
 export function UserEdit(data){
    return service.request({
        url: "/user/edit/",
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

/**
 * 详情
 */
 export function Status(data){
    return service.request({
        url: "/user/status/",
        method: "post",
        data,
    })
}