import {setTokenKey,setUsernameKey} from '../Type'
import { setToken,setUsername } from '@/utils/cookies'

export function setTokenAction(data) {
    setToken(data) //token存储
    return {
        type:setTokenKey,
        value: data
    }
}


export function setUsernameAction(data) {
    setUsername(data)
    return {
        type:setUsernameKey,
        value: data
    }
}
