import { createStore,combineReducers } from 'redux';

import configReducer from './reducer/Config'
import departmentReducer from './reducer/Department'

// 创建reducer对象
const allReducer = {
    config:configReducer,
    department:departmentReducer
}

// 合并
const rootReducer = combineReducers(allReducer)

// 创建store实例
const store = createStore(rootReducer)

export default store;