import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { roleMenuAction } from '@/store/action/App'

import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

class checkboxAll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked_default:[],
            checked_length: 0,
            checked_list:[],
            indeterminate:false,
            checkedAll:false
        }
    }

    UNSAFE_componentWillReceiveProps(nextPtops) {
        this.checkboxInit(nextPtops.init)
    }

    componentWillUnmount() {
        this.props.actions.roleMenu({})
    }

    checkboxInit = (data) => {
        const check_list = data;
        const checked = check_list.filter(item => {
            return item.indexOf(this.props.data.value) != -1
        })
        this.setState({
            checked_list: checked
        },() => {
            this.isCheckAll()
        })
        
    }

    // 判断全选
    isCheckAll = () => {
        const {checked_length,checked_list } = this.state;
        // 部分选中
        let indeterminate = false;
        // 全部
        let checkAll = false;

        if(checked_length !== checked_list.length) {
            // 部分选中
            indeterminate = true;
            checkAll = false;
        }

        if(checked_length === checked_list.length) {
            // 全部选中
            indeterminate = false;
            checkAll = true;
        }

        if(checked_list.length === 0) {
            // 都没有选中
            indeterminate = false;
            checkAll = false;
        }

        this.setState({
            indeterminate,
            checkAll
        })
    }

    componentDidMount() {

        // 存储默认长度
        const checked_list = this.props.data.child_item;
        let checked_value = null
        if (checked_list && checked_list.length > 0) {
            checked_value = checked_list.map(item=>item.value)
        }

        this.setState({
            checked_default:checked_value,
            checked_length:checked_value.length
        })
    }

    // 单个选中
    onChange = (value) => {
        this.updateStateCheckedList(value)
    }
    
    // 全选反选
    onCheckAllChange = (e) => {
        const checked= e.target.checked;
        this.updateStateCheckedList(checked ? this.state.checked_default : [])
    }

     // 更新值
    updateStateCheckedList = (data) => {
        this.setState({
            checked_list:data
        },() => {
            this.isCheckAll()
        })
    }

    updateRoleMenu = () => {
        console.log(555555)
        const checked = this.state.checked_list;
        // store
        let StoreChecked = this.props.menu;
        const first = this.props.data;
        // 判断是否存在对象
        if (!StoreChecked[first.value]) {
            StoreChecked[first.value] = {}
        }

        // 存储数据
        if(checked.length > 0) {

            // 第一种 获取文本
            // const object = {}
            // checked.forEach(item => {
            //     let options = first.child_item.filter(child => child.value === item)
            //     if(options.length > 0) {
            //         object[item] = options[0]
            //     }
            // })
            // StoreChecked[first.value] = object

            // 第二种 不需要文本
            StoreChecked[first.value] = checked
        }

        // 删除数据
        if(checked.length === 0) {
            delete StoreChecked[first.value]
        }
        
        this.props.actions.roleMenu(StoreChecked)
    }

    render() {
        const { label,value,child_item} = this.props.data 
        const {checked_list,indeterminate,checkedAll} = this.state
        return (
            <Fragment>
                <div className="checkbox-wrap">
                    <div className="all"  >
                        <Checkbox indeterminate={indeterminate} checked={checkedAll} onChange={this.onCheckAllChange}>{label} </Checkbox>
                    </div>
                    <div className="item">
                        <CheckboxGroup options={child_item} value={checked_list} onChange={this.onChange}/>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

// 类型检测
checkboxAll.propTypes = {
    data: PropTypes.object,
    init:PropTypes.array
}
// 默认值
checkboxAll.defaultProps = {
    data: {},
    init:[]
}

const mapStateToProps = (state) => ({
    menu: state.app.checked_all
})

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            roleMenu: roleMenuAction
        },dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(checkboxAll)