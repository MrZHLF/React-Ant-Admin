import {setTokenKey,setUsernameKey, logout,router} from '../Type'
import { setToken,setUsername,removeToken,removeUsername } from '@/utils/cookies'
import { Login } from '@api/account'
import { getUserRole } from '@api/user'
import Router from './../../router/index'
export function setTokenAction(data) {
    setToken(data) //token存储
    return {
        type:setTokenKey,
        value: data,
        routers:[]
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

export function updateRouter(data) {
    return {
        type:router,
        value:data
    }
}

export const hasPermission = (role,router) => {
    if (router.role && router.role.length > 0) {
        return role.some(elem => router.role.indexOf(elem) >= 0)
    }
}

// 登录逻辑
export const accountLoginAction = (data) => dispatch => {
    return Login(data).then(response => {
        const data = response.data.data
        dispatch(setTokenAction(data.token))
        dispatch(setUsernameAction(data.username))
    }).catch(error => {
        console.log(error)
    })
}


// 获取用户角色
export const getUserRoleAction = () => dispatch => {
    return getUserRole().then(response => {
        const data = response.data.data
        // 角色
        const role = data.role.split(",")
        // 存储路由
        let routersArray = [];
        if(role.includes("admin")) {
            routersArray = Router
        } else {
            routersArray = Router.filter((item) => {
                // 第一层
                if (hasPermission(role,item)) {
                    if (item.child && item.child.length > 0) {
                        item.child.filter(child => {
                            if(this.hasPermission(role,child)) {
                                return child
                            }
                        })
                        return item
                    }
                    return item
                }
            })
        }
        dispatch(updateRouter(routersArray))
    }).catch(error => {
        console.log(error)
    })
}