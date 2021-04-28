import {setTokenKey,setUsernameKey} from '../Type'
import { getToken,getUsername } from '@/utils/cookies'

// 参数
const app = {
    token:"" || getToken(),
    username:"" || getUsername()
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

        default:
            return state
    }
}


export default appReducer