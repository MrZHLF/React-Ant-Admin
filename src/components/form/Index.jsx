import React, { Component } from 'react'


import {requestData} from '@api/common'
import requestUrl from "@api/requestUrl"

import { Form,Input,Button, Select,InputNumber,Radio,message } from 'antd'
const { Option } = Select;


class FormCom extends Component {
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
    onSubmit = (value) => {
        this.setState({
            loading:true
        })
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data:value
        }
        requestData(data).then(response => {
            console.log(response,'response')
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            this.refs.form.resetFields()
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
                initialValues={{status:true,number: 0}}
            >
                {this.initFormItem()}
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">添加</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default FormCom