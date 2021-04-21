import React, { Component } from 'react'
import { Form,Input,Button  } from 'antd'
class FormCom extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }  

    rules = (item) => {
        // 处理校验问题
        let rules= []
        if(item.required) {
            let message = item.message  || `${item.label}不能为空`
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
                <Input/>
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
        })

        return formList
    }
    onSubmit = (value) => {

    }
    render() {
        return (
            <Form 
                ref="form"
                {...this.state.formLayout}
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