import React, { Component,Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

import { setToken } from './../../utils/session'
// 验证
import { validate_password,validate_email } from './../../utils/validate'

import { Login } from './../../api/account'

// 组件
import Code from './../../components/code/index'
// 加密
var CryptoJS = require("crypto-js");


class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            password:"",
            code:"",
            code_button_loading:false,
            code_button_disabled:false,
            code_button_text: "获取验证码",
            module:'login',
            loading:false,
        }
    }
    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password:CryptoJS.MD5(this.state.password).toString(),
            code:this.state.code
        }
        this.setState({
            loading:true
        })
        Login(requestData).then(res => {
            console.log(res)
            this.setState({
                loading:false
            })
            const data = res.data.data
            setToken(data.token) //token存储
            this.props.history.push('/index')
        }).catch(error => {
            this.setState({
                loading:false
            })
        })
	};
    // 获取input中value
    inputChangeUserName = (e) => {
        let value = e.target.value
        this.setState({
            username:value
        })
    }
    inputChangePassword= (e) => {
        let value = e.target.value
        this.setState({
            password:value
        })
    }
    inputChangeCode= (e) => {
        let value = e.target.value
        this.setState({
            code:value
        })
    }

    toggleForm = () => {
        this.props.switchForm('register')
    }
    render() {
        const { username , module, loading} = this.state
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick = {this.toggleForm}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username" rules={[
                                { required: true, message: '邮箱不能为空'},
                                { type: 'email', message: '邮箱格式不正确'},
                            ]}>
                            <Input value={username} onChange={this.inputChangeUserName} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true,message: '密码不能为空'},
                                // {min:6,message:"密码长度不能小于6位"},
                                // {max:20,message:"密码长度不能大于20位"}
                                {pattern:validate_password,message:"请输入大于6位小于20位数字+字母"}
                            ]}>
                            <Input onChange={this.inputChangePassword} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[
                                {required: true,message: '验证码不能为空'},
                                {len: 6,message: '请输入长度为6位的验证码'},
                            ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={8}>
                                    <Code module={module} username={username}/>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}
export default withRouter(LoginForm)