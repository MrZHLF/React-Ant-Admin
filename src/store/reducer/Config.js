import { configAddStatus } from './../Type'
// 参数
const config = {
    status:[
        {label:"禁用",value:false},
        {label:"启用",value:true}
    ]
}


// reducer
const configReducer = function(state = config, action) {
    switch (action.type) {
        case configAddStatus: {
            return {
                ...state,
                status: [...state.status,action.payload]
            }
        }
        default:
            return state
    }

    // 第二种写法
    // if (action.type === 'ADD_STATUS') {
    //     const stateData = JSON.parse(JSON.stringify(state))
    //     stateData.status.push(action.payload)
    //     return stateData;
    // }
    // return state
}


export default configReducer