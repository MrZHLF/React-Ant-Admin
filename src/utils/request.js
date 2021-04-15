import axios from 'axios'
import { getToken,getUsername } from './cookies'
import { message } from 'antd'

const service = axios.create({
    baseURL:process.env.REACT_APP_API,
    timeout:5000,
})

// 请求拦截
service.interceptors.request.use(function(config) {
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config
},function(error) {
    return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(function(response) {
    const data = response.data;
    if(data.resCode !== 0) {
        // 全局错误拦截
        message.info(data.message)
        return  Promise.reject(response)
    } else {
        // 成功
        return response
    }
},function(error) {
    return Promise.reject(error)
})

export default service