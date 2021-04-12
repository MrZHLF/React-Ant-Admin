import React, { Component,Fragment } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

// 组件
import Code from './../../components/code/index'

export default class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username:""
        }
    }
    onFinish = (values) => {
		console.log('Received values of form: ', values);
	};
    // 获取input中value
    inputChange = (e) => {
        let value = e.target.value
        this.setState({
            username:value
        })
    };
    toggleForm = () => {
        this.props.switchForm('login')
    }
    render() {
        let { username } = this.state
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={this.toggleForm}>登录</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={() => this.onFinish}
                    >
                        <Form.Item
                            name="username" rules={[
                                { required: true, message: '邮箱不能为空'},
                                { type: 'email', message: '邮箱格式不正确'},
                            ]}>
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}>
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={8}>
                                    <Code username={username}/>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}
