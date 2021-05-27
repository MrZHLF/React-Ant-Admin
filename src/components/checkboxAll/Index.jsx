import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'


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
        const {checked_length } = this.state;
        const length = value.length


        if (checked_length !== length) {
            // 部分选中
            this.indeterminateStatus(true)
            this.checkedAllStatus(false)
        } 

        if (checked_length === length) {
            // 全部选中
            this.indeterminateStatus(false)
            this.checkedAllStatus(true)
        } 

        if(length==0){
            // 没有选中
            this.indeterminateStatus(false)
            this.checkedAllStatus(false)
        }
        
        this.setState({
            checked_list:value
        })
    }

        // 部分按钮状态
        indeterminateStatus = (value) => {
            this.setState({
                indeterminate:value
            })
        }

        // 全选按钮状态
        checkedAllStatus = (value) => {
            this.setState({
                checkedAll:value
            })
        }
    
    // 全选反选
    onCheckAllChange = (e) => {
        const checked= e.target.checked;
        this.setState({
            checked_list:checked ? this.state.checked_default : []
        })
        this.checkedAllStatus(checked)
        this.indeterminateStatus(false)
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
    data: PropTypes.object
}
// 默认值
checkboxAll.defaultProps = {
    data: {}
}


export default checkboxAll