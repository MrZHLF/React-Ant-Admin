import React, { Component } from 'react'
import PropTypes from 'prop-types'
import requestUrl from "@api/requestUrl"
import { TableList } from '@api/common'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import {addDepartmentList,updateDepartmentList} from '@/store/action/Department'

import { Form,Input,Button, Select,InputNumber,Radio,message } from 'antd'
const { Option } = Select;


class FormSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesPreixr:{
                "Input": "请输入",
                "Radio": "请选择",
                "Select": "请选择"
            },
            loading:false
        }
    }

    componentDidMount() {
        this.onSubmit()
    }
    componentWillReceiveProps({formConfig}) {
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
    }

    rules = (item) => {
        const { mesPreixr } = this.state;
        // 处理校验问题
        let rules= []
        if(item.required) {
            let message = item.message  || `${mesPreixr[item.type]}${item.label}`
            rules.push({required:true,message})
        }
        if(item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules)
        }
        return rules
    }

    inputElem = (item) => {
        // 处理input
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder}/>
            </Form.Item>
        )
    }

    inputNumberElem = (item) => {
        // 处理inputnumber
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber style={item.style} placeholder={item.placeholder} min={item.min} max={item.max}/>
            </Form.Item>
        )
    }

    // select
    selectElem = (item) => {
        // 处理input
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option key={elem.value} value={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    radioElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio key={elem.value} value={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }

    // 初始化
    initFormItem = () => {
        const { formItem } = this.props
        if (!formItem || (formItem && formItem.length === 0)) { return false; }
        
        const formList = [];

        formItem.map(item => {
            if (item.type === 'Input') {
                formList.push(this.inputElem(item)) 
            }

            if (item.type === 'Select') {
                item.options = this.props.config[item.optionsKey]
                formList.push(this.selectElem(item)) 
            }

            if(item.type === 'InputNumber') {
                formList.push(this.inputNumberElem(item))
            }

            if(item.type === 'Radio') {
                formList.push(this.radioElem(item))
            }
        })

        return formList
    }

    search = (params) => {
        const requestData = {
            url:requestUrl[params.url],
            data:{
                pageNumber:1,
                pageSize:10
            }
        }
        // 搜索参数
        if(Object.keys(params.searchData).length != 0)  {
            for (let key in params.searchData) {
                requestData.data[key] = params.searchData[key]
            }
        }
        TableList(requestData).then(response => {
            const responseData = response.data.data
            console.log(responseData)
            // this.props.listData(responseData)
            this.props.actions.addData(responseData)
            
        }).catch(error=> {

        })
    }

    onSubmit = (value) => {
        let searchData = {};
        for (let key in value) {
            if (value[key] !== undefined && value[key] !== "") {
                searchData[key] = value[key]
            }
        }
        this.search({
            url:"departmentList",
            searchData
        })
    }
    render() {
        return (
            <Form 
                layout="inline"
                ref="form"
                {...this.props.formLayout}
                onFinish={this.onSubmit}
                initialValues={this.props.formConfig.initValue}
            >
                {this.initFormItem()}
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
        )
    }
}

// 类型检测
FormSearch.propTypes = {
    formConfig: PropTypes.object
}
// 默认值
FormSearch.defaultProps = {
    formConfig: {},
}

// 获取store值
const mapStateToProps = (state) => ({
    config: state.config
})

// 执行action
const mapDispatchToProps = (dispatch) => {
    return {
        // listData: bindActionCreators(addDepartmentList,dispatch) 单个的
        actions: bindActionCreators({
            addData:addDepartmentList,
            updateData:updateDepartmentList
        },dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormSearch) 