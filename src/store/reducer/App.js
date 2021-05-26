import {setTokenKey,setUsernameKey,logout,router} from '../Type'
import { getToken,getUsername } from '@/utils/cookies'

// 参数
const app = {
    token:"" || getToken(),
    username:"" || getUsername(),
    routers:[]
}


// reducer
const appReducer = function(state = app, action) {
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

        default:
            return state
    }
}


export default appReducer