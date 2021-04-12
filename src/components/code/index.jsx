
import React, { Component } from 'react'
import {Button, message } from 'antd';

import { GetCode } from './../../api/account'
import { validate_email } from './../../utils/validate'


let timer = null; //定时器

class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            code_button_loading:false,
            code_button_disabled:false,
            code_button_text: "获取验证码"
        }
    }
    // 监听父组件传递的值
    componentWillReceiveProps({username}) {
        console.log(username,'username');
        this.setState({
            username
        })
    }

    // 销毁组件
    componentWillUnmount() {
        clearInterval(timer)
    }

    // 获取验证码
    getCode = () => {
        let { username } = this.state
        if (!username) {
            message.warning('邮箱不能为空')
            return
        }
        if (!validate_email(username)) {
            message.warning('邮箱格式不正确')
            return
        }
        this.setState({
            code_button_loading:true,
            code_button_text:"发送中"
        })
        const requestData = {
            username,
            module:'login'
        }
        GetCode(requestData).then(response => {
            console.log(response)
            this.setState({
                code_button_loading:false
            })
            this.countDown()
        }).catch(error => {
            this.setState({
                code_button_loading:false,
                code_button_text:"重新获取"
            })
        })
    }
    countDown = () => {
        let sec = 60;
        this.setState({
            code_button_loading:false,
            code_button_disabled:true,
            code_button_text:`${sec}S`,
        })
        // 409019683
        timer = setInterval(() => {
            sec--;
            if (sec == 0) {
                this.setState({
                    code_button_text:'重新获取',
                    code_button_disabled:false,
                })
                clearInterval(timer)
                return
            }
            this.setState({
                code_button_text:`${sec}S`
            })
            
        },1000)
    }
    render() {
        return <Button type="danger" disabled={this.state.code_button_disabled} loading={this.state.code_button_loading} className="login-form-button" onClick={this.getCode} block>{this.state.code_button_text}</Button>
    }
}
export default Code