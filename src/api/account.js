import service from './../utils/request'

/**
 * 登录接口
 * @param {data} data 
 */
export function Login(data){
    return service.request({
        url: "/login/",
        method: "post",
        data,
    })
}