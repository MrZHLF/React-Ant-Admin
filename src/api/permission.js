import service from './../utils/request'

/**
 * 获取角色权限
 */
export function GetRoles(data ={}){
    return service.request({
        url: "/role/",
        method: "post",
        data,
    })
}