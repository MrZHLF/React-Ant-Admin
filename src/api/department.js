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
