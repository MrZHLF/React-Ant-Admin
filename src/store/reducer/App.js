import {setTokenKey,setUsernameKey,logout,router,checkedAll} from '../Type'
import { getToken,getUsername } from '@/utils/cookies'

// 参数
const app = {
    token:"" || getToken(),
    username:"" || getUsername(),
    routers:[],
    checked_all: {}
}


// reducer
const appReducer = function(state = app, action) {
    console.log(action,'actionaction')
    switch (action.type) {
        // 处理token
        case setTokenKey: {
            return {
                ...state,
                token: action.value
            }
        }

        case setUsernameKey: {
            // 处理username
            return {
                ...state,
                username: action.value
            }
        }

        case logout: {
            return {
                ...state,
                username: action.value,
                token: action.value
            }
        }

        case router: {
            return {
                ...state,
                routers: action.value,
            }
        }
        case checkedAll: {
            return {
                ...state,
                checked_all:action.value,
            }
        }

        default:
            return state
    }
}


export default appReducer