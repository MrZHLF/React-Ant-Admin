import { createStore,combineReducers } from 'redux';

import config from './reducer/Config'
import department from './reducer/Department'
import app from './reducer/App'

// 创建reducer对象
const allReducer = {
    config,
    department,
    app
}

// 合并
const rootReducer = combineReducers(allReducer)

// 创建store实例
const store = createStore(rootReducer)

export default store;