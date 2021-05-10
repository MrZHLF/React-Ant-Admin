import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {requestData} from '@api/common'
import requestUrl from "@api/requestUrl"

import SelectComponent from './../select/Index'
import UploadComponent from './../upload/Index'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { Form,Input,Button, Select,InputNumber,Radio,message,DatePicker } from 'antd'
const { Option } = Select;



class FormCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesPreixr:{
                "Input": "请输入",
                "Radio": "请选择",
                "Date": "请选择",
                "Select": "请选择",
                "Upload": "请上传"
            },
            loading:false
        }
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

    validatorSelect= (rule,value) => {
        if (value || value[rule.field]) {
            return  Promise.resolve()
        }
        return Promise.reject("选项不能为空")
    }

    // 处理input
    inputElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder}/>
            </Form.Item>
        )
    }

    // 处理inputnumber
    inputNumberElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber style={item.style} placeholder={item.placeholder} min={item.min} max={item.max}/>
            </Form.Item>
        )
    }

    // select
    selectElem = (item) => {
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

    // select组件
    SelectComponent = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator:this.validatorSelect}]}>
                <SelectComponent url={item.url} propsKey={item.propsKey} name={item.name}/>
            </Form.Item>
        )
    }

    // 单选
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

    // 日期组件
    dateElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <DatePicker locale={locale}  format={item.format} picker={item.mode}/>
            </Form.Item>
        )
    }
    // 上传
    uploadElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator:this.validatorSelect}]}>
                <UploadComponent name={item.name}></UploadComponent>
            </Form.Item>
        )
    }

    // 插槽
    slotElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                {/* { this.props.children ? this.props.children.filter(elem => elem.ref == item.slotName)[0] : '' } */}
                {/* 判断传递过来的是否是数组或者对象 */}

                {
                    this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(elem => elem.ref == item.slotName)[0] : this.props.children
                }

            </Form.Item>
        )
    }

    // 栏目
    columnElem = (item) => {
        return (
            <div className="form-column">
                <h4>{item.label}</h4>
            </div>
        )
    }

    // 初始化
    initFormItem = () => {
        const { formItem } = this.props
        if (!formItem || (formItem && formItem.length === 0)) { return false; }
        
        const formList = [];

        formItem.forEach(item => {
            if (item.type === 'Input') {
                formList.push(this.inputElem(item)) 
            }

            if (item.type === 'SelectComponent') {
                formList.push(this.SelectComponent(item)) 
            }

            if (item.type === 'Select') {
                formList.push(this.selectElem(item)) 
            }

            if(item.type === 'InputNumber') {
                formList.push(this.inputNumberElem(item))
            }

            if(item.type === 'Radio') {
                formList.push(this.radioElem(item))
            }

            if(item.type === 'Date') {
                formList.push(this.dateElem(item))
            }
            
            if(item.type === 'Upload') {
                formList.push(this.uploadElem(item))
            }

            if(item.type === 'Slot') {
                formList.push(this.slotElem(item))
            }

            if(item.type === 'Column') {
                formList.push(this.columnElem(item))
            }
        })

        return formList
    }

    formatData = (value) => {
        const requestData = JSON.parse(JSON.stringify(value))
        // 需要格式化的 JSON对象的key
        const { formatFormKey, editKey, setFieldValue } = this.props.formConfig;
        const keyValue = requestData[formatFormKey]
        // 如果是json对象
        if (Object.prototype.toString.call(keyValue) === "[object Object]") {
            requestData[formatFormKey] = keyValue[formatFormKey]
        }
        // 判断是否存在编辑知道id
        if (editKey) {
            requestData[editKey] = setFieldValue[editKey]
        }
        return requestData
    }

    onSubmit = (value) => {
        // 添加 
        if (this.props.submit) {
            this.props.submit(value)
            return false
        }
        this.setState({
            loading:true
        })

        // 数据格式化
        let paramsData = this.formatData(value)

        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: paramsData
        }
        requestData(data).then(response => {
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            // this.refs.form.resetFields()
        }).catch(error => {
            this.setState({
                loading:false
            })
        })
    }
    render() {
        return (
            <Form 
                ref="form"
                {...this.props.formLayout}
                onFinish={this.onSubmit}
                initialValues={this.props.formConfig.initValue}
            >
                {this.initFormItem()}
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">添加</Button>
                </Form.Item>
            </Form>
        )
    }
}


// 类型检测
FormCom.propTypes = {
    formConfig: PropTypes.object
}
// 默认值
FormCom.defaultProps = {
    formConfig: {},
}
export default FormCom