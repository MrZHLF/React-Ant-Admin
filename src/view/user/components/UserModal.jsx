import React, { Component } from 'react'
import { UserAdd,UserDetailed } from '@/api/user'
import { Modal,message } from 'antd';
import FormCom from '@c/form/Index'
import { validate_phone,validate_pass } from '@/utils/validate'

// 加密
var CryptoJS = require("crypto-js");
class UserModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible:false,
            user_id:"",
            password_rules:[ //自定义校验
                ()=>({
                    validator(rule,value) {
                        if (validate_pass(value)) {
                            return Promise.resolve()
                        } else {
                            return Promise.reject('密码格式不正确')
                        }
                    }
                })
            ],
            passwords_rules:[ //自定义校验
                ({getFieldValue})=>({
                    validator(rule,value) {
                        if (!value || getFieldValue('password') !== value) {
                            return Promise.reject('两次密码不相同')
                        }
                        return Promise.resolve()
                    }
                })
            ],
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
                    value_type:"password", 
                    label:"密码",
                    name:"password",
                    upload_field:true,
                    required:false,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入密码",
                    rules:""
                },
                {
                    type:"Input", 
                    value_type:"password", 
                    label:"确认密码",
                    name:"passwords",
                    upload_field:true,
                    required:false,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入确认密码",
                    rules:""
                },
                {
                    type:"Input", 
                    label:"真实姓名",
                    name:"truename",
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

    onFormRef = (ref) => {
        this.child = ref
    }

    // 修改数组的对象
    updateArrayItem = (index,key) => {
        this.setState({
            formItem:  this.state.formItem.map((item,_index) => index.includes(_index) ? {...item,...key[_index]} : item)
        })
    }

    updateItem = (id) => {
        this.updateArrayItem(
            [1,2],
            {
                1:{
                    required: id ? false : true,
                    rules:  id ? "" : this.state.password_rules
                },
                2:{
                    required: id ? false : true,
                    rules: id ? "" : this.state.passwords_rules
                }
            }
        );
    }


    // 弹窗
    visibleModal = (params) => {
        this.setState({
            isModalVisible:params.status,
            user_id: params.user_id
        },() => {
            // 异步调用
            this.getDetailed()
            this.updateItem(params.user_id)
        })
    }

    getDetailed = () => {
        if (!this.state.user_id) { return false }
        UserDetailed({id:this.state.user_id}).then(response => {
            this.setState({
                formConfig:{
                    setFieldValue:response.data.data
                }
            })
        })
    }
    handleOk = () => {
        this.child.onSubmit()
    }
    handleCancel = () => {
         // 清除
        this.child.onReset()
        this.visibleModal(false)
    }
    submit = (value) => {
        let requestData = {
            ...value,
            password:CryptoJS.MD5(value.password).toString()
        }
        delete requestData.passwords
        UserAdd(requestData).then(response => {
            console.log(response,'response')
            const data = response.data
            message.info(data.message)

            // 关闭弹窗
            this.handleCancel(false)
        })
    }

    
    render() {
        return (
            <Modal title="新增用户" visible={this.state.isModalVisible} footer={null} onCancel={this.handleCancel}>
                <FormCom onRef={this.onFormRef} formConfig={this.state.formConfig} formLayout={this.state.formLayout} formItem={this.state.formItem} submit={this.onSubmit} submit={this.submit} />
            </Modal>
        )
    }
}
export default UserModal