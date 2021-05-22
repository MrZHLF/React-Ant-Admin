import {setTokenKey,setUsernameKey,logout} from '../Type'
import { getToken,getUsername } from '@/utils/cookies'

// 参数
const app = {
    token:"" || getToken(),
    username:"" || getUsername()
}


// reducer
const appReducer = function(state = app, action) {
    console.log(action,'action')
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
            console.log(action,'action')
            return {
                ...state,
                username: action.value,
                token: action.value
            }
        }

        default:
            return state
    }
}


export default appReducer