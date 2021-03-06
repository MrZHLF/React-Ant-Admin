import React, { Component } from 'react'
import { UserAdd,UserDetailed,UserEdit } from '@/api/user'
import { Modal,message,Checkbox } from 'antd';
import FormCom from '@c/form/Index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CheckboxAll from '@c/checkboxAll/Index'
import { validate_phone,validate_pass } from '@/utils/validate'
import {GetRoles }  from '@api/permission'
// 加密
var CryptoJS = require("crypto-js");
class UserModal extends Component {
    constructor(props) {
        super(props)
        const _this = this
        this.state = {
            isModalVisible:false,
            user_id:"",
            role_options:[], //角色权限
            role_value:[],
            role_menu_value:[], //菜单权限
            role_menu_init:[],///

            role_button_value:[],
            role_button_init:[],
            role_menu:[
                {
                    label:"用户管理",
                    value:"/user",
                    child_item:[
                        {
                            label:"用户列表",
                            value:"/user/list", 
                        },
                        {
                            label:"用户添加",
                            value:"/user/add", 
                        }
                    ]
                },
                {
                    label:"部门管理",
                    value:"/department",
                    child_item:[
                        {
                            label:"部门列表",
                            value:"/department/list", 
                        },
                        {
                            label:"部门添加",
                            value:"/department/add", 
                        }
                    ]
                }
            ],
            // 按钮
            role_button: [
                {
                    // 一级
                    label: "用户列表",
                    value: "userList",
                    // 子级
                    child_item: [
                        { label: "新增", value: "user:add" },
                        { label: "编辑", value: "user:edit" },
                        { label: "删除", value: "user:delete" },
                    ]
                },
                {
                    // 一级
                    label: "部门列表",
                    value: "departmentList",
                    // 子级
                    child_item: [
                        { label: "批量删除", value: "department:patchDelete" },
                        { label: "编辑", value: "department:edit" },
                        { label: "删除", value: "department:delete" },
                    ]
                }
            ],
            password_rules:[ //自定义校验
                ({getFieldValue})=>({
                    validator(rule,value) {
                        // 编辑状态
                        if (_this.state.user_id && !value && !getFieldValue('passwords')) {
                            return Promise.resolve()
                        }
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
                        if (_this.state.user_id && !value && !getFieldValue('password')) {
                            return Promise.resolve()
                        }
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
                    trigger:['onBlur'],
                    upload_field:true,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入密码",
                    rules:"",
                },
                {
                    type:"Input", 
                    value_type:"password", 
                    label:"确认密码",
                    trigger:['onBlur'],
                    name:"passwords",
                    upload_field:true,
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
                },
                {
                    type:"Slot",
                    label:"权限",
                    name:"role",
                    slotName:"role"
                },
                {
                    type:"Slot",
                    label:"菜单权限",
                    name:"role_menu",
                    slotName:"role_menu"
                },
                {
                    type:"Slot",
                    label:"按钮权限",
                    name:"role_button",
                    slotName:"role_button"
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
                    rules:  id ? "" : this.state.password_rules
                },
                2:{
                    rules: id ? "" : this.state.passwords_rules
                }
            }
        );
    }

    handleCancel = () => {
        // 清除
        this.child.onReset();
        this.setState({
            isModalVisible:false,
            formConfig:{
                setFieldValue:{} //青春form初始数据
            },
            role_value: [],
            role_menu_init:[],
            role_button_init:[]
        })
    }

    // 弹窗
    visibleModal = (params) => {
        this.setState({
            isModalVisible:params.status,
            user_id: params.user_id
        },() => {
            // 异步调用
            if (params.user_id) {
                this.getDetailed()
                this.updateItem(params.user_id)
            }
            
        })

        this.getRoles()
    }
    // 获取角色
    getRoles  = () => {
        GetRoles().then(response => {
            this.setState({
                role_options:response.data.data
            })
        })
    }

    // 获取详情
    getDetailed = () => {
        if (!this.state.user_id) { return false }
        UserDetailed({id:this.state.user_id}).then(response => {
            console.log(response,'response')
            let data = response.data.data
            this.setState({
                formConfig:{
                    setFieldValue:data
                },
                role_value: data.role ? data.role.split(",") : [],
                role_menu_init: data.role_menu ? data.role_menu.split(",") : [],
                role_button_init:data.role_button ? data.role_button.split(",") : [],
            })
        })
    }
    handleOk = () => {
        this.child.onSubmit()
    }

    onBlurEvent = (e) => {
        const value = e.currentTarget.value
        if(value) {
            this.updateItem(value ? false : true)
            return false
        }
    }

   

    // 提交
    submit = (value) => {
        this.formatMenuRole({key: "menu", state_key: "role_menu_value"});
        this.formatMenuRole({key: "button", state_key: "role_button_value"});
        this.state.user_id ? this.handlerFormEdit(value) : this.handlerFormAdd(value)
        
    }

    formatMenuRole = (params) => {
        const data = this.props[params.key];
        console.log(data)
        let arr = [];
        for(let key in data) {
            arr = arr.concat(data[key]);
        }
        this.setState({ [params.state_key]: arr })
    }

    handlerFormAdd = (value) => {
        let requestData = {
            ...value,
            password:CryptoJS.MD5(value.password).toString()
        }
         // 权限
        requestData.role = this.state.role_value.join();
         // 菜单
        requestData.role_menu = this.state.role_menu_value.join();

        // 按钮
        requestData.role_button = this.state.role_button_value.join();
        delete requestData.passwords
        UserAdd(requestData).then(response => {
            const data = response.data
            message.info(data.message)

            // 关闭弹窗
            this.handleCancel(false)
        })
    }
    
    handlerFormEdit = (value) => {
        const password = value.password
        const passwords = value.passwords
        if (password || passwords) {
            if (!validate_pass(password) || !validate_pass(passwords)) {
                message.error('请输入6-20位的英文加数字')
                return false
            }
        }

        if (passwords && passwords) {
            if(passwords !== passwords) {
                message.error('两次密码不一样')
                return
            }
        }
        let requestData = value
        requestData.id = this.state.user_id

        // 权限
        requestData.role = this.state.role_value.join();
        // 菜单
        requestData.role_menu = this.state.role_menu_value.join();

        // 按钮
        requestData.role_button = this.state.role_button_value.join();
        if (requestData.password) {
            requestData.password = CryptoJS.MD5(value.password).toString()
            delete requestData.passwords
        }
        UserEdit(requestData).then(response => {
            const data = response.data
            message.info(data.message)

            // 关闭弹窗
            this.handleCancel(false)
        })
    }

    onChangeRole= (value) => {
        this.setState({
            role_value:value
        })
    }

    render() {
        return (
            <Modal title="新增用户" visible={this.state.isModalVisible} footer={null} onCancel={this.handleCancel}>
                <FormCom onRef={this.onFormRef} onBlur={this.onBlurEvent} formConfig={this.state.formConfig} formLayout={this.state.formLayout} formItem={this.state.formItem} submit={this.onSubmit} submit={this.submit}>
                    <div ref="role">
                        <Checkbox.Group
                            options={this.state.role_options}
                            value={this.state.role_value}
                            onChange={this.onChangeRole}
                        />
                    </div>
                    <div ref="role_menu">
                        {
                            this.state.role_menu.map((item,index)=> {
                                return <CheckboxAll type="menu" data={item} key={index} init={this.state.role_menu_init} saveAllKey={true}/>

                            })
                        }
                    </div>
                    <div ref="role_button">
                        {
                            this.state.role_button.map((item,index)=> {
                                return <CheckboxAll type="button" data={item} key={index} init={this.state.role_button_init} />

                            })
                        }
                    </div>
                </FormCom>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.app.checked_all.menu,
    button: state.app.checked_all.button
})

export default connect(
    mapStateToProps,
    null
)(UserModal)