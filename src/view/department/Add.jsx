import React, { Component,Fragment } from 'react'
import { message  } from 'antd'

import { DepartmentAddApi,Detailed,Edit } from '../../api/department'

import FormCom from '@c/form/Index'
export default class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            id:"",
            formConfig:{
                url:"departmentAdd",
                initValue:{
                    number:0,
                    status:true
                },
                setFieldValue:{}
            },
            formLayout:{
                labelCol:{span:2  },
                wrapperCol:{span:22 },
            },
            formItem:[
                {
                    type:"Input", 
                    label:"部门名称",
                    name:"name",required:true,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入部门名称"
                },
                {
                    type:"InputNumber", 
                    label:"人员数量",
                    name:"number",
                    required:true,
                    min:0,
                    max:100,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入人员数量"
                },
                {
                    type:"Radio", 
                    label:"禁启用",
                    name:"status",
                    required:true,
                    options:[
                        {label:"禁用",value:false},
                        {label:"启用",value:true}
                    ],
                },
                {
                    type:"Input", 
                    label:"描述",
                    name:"content",
                    required:true,
                    placeholder:"请输入描述内容"
                }
            ]
        }
    }
    componentWillMount(){
        if (this.props.location.state) {
            this.setState({
                id:this.props.location.state.id
            })
        }
    }
    componentDidMount() {
        this.getDerailed()
    }
    getDerailed() {
        // 获取表单详情
        if(!this.props.location.state) {return false}
        Detailed({id:this.state.id}).then(response => {
            console.log(response)
            this.setState({
                formConfig:{
                    ...this.state.formConfig,
                    setFieldValue:response.data.data
                }
            })
            // this.refs.form.setFieldsValue(response.data.data)
        })
    }
    onSubmit = (value) => {
        // if (!value.name) {
        //     message.error('部门名称不能为空')
        //     return false
        // }
        
        // if (!value.number || value.number == 0) {
        //     message.error('人员数量不能为空')
        //     return false
        // }
        // if (!value.content) {
        //     message.error('描述不能为空')
        //     return false
        // }
        this.setState({
            loading:true
        })

        this.state.id ? this.onHandleEdit(value) : this.onHandleAdd(value)
        
    }

    // 添加信息
    onHandleAdd = (value) => {
        DepartmentAddApi(value).then(response => {
            console.log(response,'response')
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            // 重置表单
            this.refs.form.resetFields()
        }).catch(error=>{
            this.setState({
                loading:false
            })
        })
    }
    // 编辑信息
    onHandleEdit = (value) => {
        const requestData = value
        requestData.id = this.state.id
        Edit(requestData).then(response => {
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
        }).catch(error=>{
            this.setState({
                loading:false
            })
        })
    }
    render() {
        return (
            <Fragment>
                <FormCom formConfig={this.state.formConfig} formLayout={this.state.formLayout} formItem={this.state.formItem} submit={this.onSubmit}></FormCom>
                {/* <Form 
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
                </Form> */}
            </Fragment>
        )
    }
}
