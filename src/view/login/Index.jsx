import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import './index.scss';

// 组件
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Login extends Component {
	constructor() {
    super();
		this.state = {
			formType:'login'
		}
  }
	
	switchForm = (value) => {
		// 切换状态
		this.setState({
			formType:value
		})
	}

	render() {
		return (
			<div className="form-wrap">
				<div>
					{
						this.state.formType === 'login' 
						? <LoginForm  switchForm={this.switchForm}/> 
						: <RegisterForm switchForm={this.switchForm}/>
					}
				</div>
			</div>
		)
	}
}
export default Login