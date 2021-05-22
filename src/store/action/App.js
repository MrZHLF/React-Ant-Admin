import {setTokenKey,setUsernameKey, logout} from '../Type'
import { setToken,setUsername,removeToken,removeUsername } from '@/utils/cookies'

export function setTokenAction(data) {
    setToken(data) //token存储
    return {
        type:setTokenKey,
        value: data
    }
}

// 设置用户名
export function setUsernameAction(data) {
    setUsername(data)
    return {
        type:setUsernameKey,
        value: data
    }
}

// 清除token
export function logoutAction() {
    removeToken();
    removeUsername()
    return {
        type: logout,
        value:""
    }
}