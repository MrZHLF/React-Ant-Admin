import React, { Component } from 'react'
import { Form,Input,Button, InputNumber,Radio,message  } from 'antd'

import { DepartmentAddApi } from '../../api/department'
export default class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            formLayout:{
                labelCol:{span:2  },
                wrapperCol:{span:22 },
            }
        }
    }
    onSubmit = (value) => {
        if (!value.name) {
            message.error('部门名称不能为空')
            return false
        }
        
        if (!value.number || value.number == 0) {
            message.error('人员数量不能为空')
            return false
        }
        if (!value.content) {
            message.error('描述不能为空')
            return false
        }
        this.setState({
            loading:true
        })
        DepartmentAddApi(value).then(response => {
            console.log(response,'response')
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            // 重置表单
            this.$refs.form.resetFields()
        }).catch(error=>{
            this.setState({
                loading:false
            })
        })
    }
    render() {
        return (
            <Form 
                ref="form"
                {...this.state.formLayout}
                onFinish={this.onSubmit}
                initialValues={{status:true,number: 0}}
            >
                <Form.Item label="部门名称" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="人员数量" name="number">
                    <InputNumber min={0} max={100} />
                </Form.Item>
                <Form.Item label="禁启用" name="status">
                    <Radio.Group>
                        <Radio value={false}>禁用</Radio>
                        <Radio value={true}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="描述" name="content">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">添加</Button>
                </Form.Item>
            </Form>
        )
    }
}
