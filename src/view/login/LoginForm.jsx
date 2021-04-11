import React, { Component,Fragment } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

// 验证
import { validate_password } from './../../utils/validate'

import { Login } from './../../api/account'

export default class LoginForm extends Component {

    onFinish = (values) => {
        console.log(values,'values')
        Login().then(res => {
            console.log(res)
        })
	};
    toggleForm = () => {
        this.props.switchForm('register')
    }
    render() {
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true,message: '密码不能为空'},
                                // {min:6,message:"密码长度不能小于6位"},
                                // {max:20,message:"密码长度不能大于20位"}
                                {pattern:validate_password,message:"请输入大于6位小于20位数字+字母"}
                            ]}>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[
                                {required: true,message: '验证码不能为空'},
                                {len: 6,message: '请输入长度为6位的验证码'},
                            ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={8}>
                                    <Button type="danger" className="login-form-button" block>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}
