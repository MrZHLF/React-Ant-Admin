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

/**
 * 验证码接口
 * @param {username} data 
 */
 export function GetCode(data){
    return service.request({
        url: "/getSms/",
        method: "post",
        data,
    })
}

