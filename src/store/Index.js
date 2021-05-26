import { createStore,combineReducers,applyMiddleware,compose } from 'redux';

// redux-thunk
import thunk from 'redux-thunk'

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
// const store = createStore(rootReducer,applyMiddleware(thunk))

// 调试redux
const store = createStore(rootReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store;

// 第二种方法 调试redux
// 下载 redux-devtools-extension
// 引入 import { composeWithDevTools} from 'redux-devtools-extension'
// 使用  const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))