import React, { Component } from 'react'
import { Modal } from 'antd';
import FormCom from '@c/form/Index'
import { validate_phone } from '@/utils/validate'
class UserModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible:false,
            formConfig:{
                url:"jobAdd",
                editKey:"",
                initValue:{
                    number:0,
                    status:""
                },
                setFieldValue:{},
                formatFormKey:"parentId"
            },
            formLayout:{
                labelCol:{span:4  },
                wrapperCol:{span:20 },
            },
            formItem:[
                {
                    type:"Input", 
                    label:"用户名",
                    name:"username",
                    required:true,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入用户名"
                },
                {
                    type:"Input", 
                    label:"密码",
                    name:"password",
                    required:true,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入用户名"
                },
                {
                    type:"Input", 
                    label:"确认密码",
                    name:"password1",
                    required:true,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入确认密码"
                },
                {
                    type:"Input", 
                    label:"真实姓名",
                    name:"card_id",
                    required:true,
                    style:{width:"200px"},
                    placeholder:"请输入真实姓名"
                },
                {
                    type:"Input", 
                    label:"手机号",
                    name:"phone",
                    required:true,
                    style:{width:"200px"},
                    placeholder:"请输入11位数字的手机号",
                    rules:[ //自定义校验
                        ()=>({
                            validator(rule,value) {
                                // let regPhone = /^1[3456789]\d{9}$/;
                                if (validate_phone(value)) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject('手机号码有误')
                                }
                            }
                        })
                    ]
                },
                { 
                    type: "Radio",
                    label: "禁启用", 
                    name: "status", 
                    required: true,
                    options: [
                        { label: "禁用", value: false },
                        { label: "启用", value: true },
                    ]
                }
            ]
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    visibleModal = (status) => {
        this.setState({
            isModalVisible:status
        })
    }
    handleOk = () => {

    }
    handleCancel = () => {
        this.visibleModal(false)
    }
    render() {
        return (
            <Modal title="新增用户" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <FormCom formConfig={this.state.formConfig} formLayout={this.state.formLayout} formItem={this.state.formItem} submit={this.onSubmit} submitButton={false} />
            </Modal>
        )
    }
}
export default UserModal