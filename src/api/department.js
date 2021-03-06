import service from './../utils/request'

/**
 * 添加部门
 * @param {data} data 
 */
export function DepartmentAddApi(data){
    return service.request({
        url: "/department/add/",
        method: "post",
        data,
    })
}

/**
 * 获取列表部门
 * @param {data} data 
 */
 export function GetList(data){
    return service.request({
        url: "/department/list/",
        method: "post",
        data,
    })
}

/**
 * 删除列表部门
 * @param {data} data 
 */
 export function Delete(data){
    return service.request({
        url: "/department/delete/",
        method: "post",
        data,
    })
}

/**
 * 禁启用
 * @param {data} data 
 */
 export function Status(data){
    return service.request({
        url: "/department/status/",
        method: "post",
        data,
    })
}

/**
 * 获取详情
 * @param {id} data 
 */
 export function Detailed(data){
    return service.request({
        url: "/department/detailed/",
        method: "post",
        data,
    })
}
/**
 * 编辑详情
 * @param {id，data} data 
 */
 export function Edit(data){
    return service.request({
        url: "/department/edit/",
        method: "post",
        data,
    })
}
