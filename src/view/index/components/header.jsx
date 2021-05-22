import React, { Component } from 'react'
import {  MenuFoldOutlined ,MenuUnfoldOutlined,LoginOutlined} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logoutAction} from '@/store/action/App'
import './aside.scss';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed:props.collapsed
        }
    }
    componentWillReceiveProps({collapsed}){
        this.setState({
            collapsed
        })
    }
    toggleMenu = () => {
        this.props.toggle()
        
    }
    // 退出
    logout = () => {
        // 调用action
        console.log(66)
        this.props.actions.logout()
        this.props.history.push('/')
    }
    render() {
        const { collapsed }= this.state
        return (
            <div className={ collapsed ? "collapsed-close" : ""}>
                <h1 className="logo">
                    <span>LOGO</span>
                </h1> 
                <div className="header-wrap">
                    <span onClick={this.toggleMenu} className="collapsed-icon">
                    {collapsed ?  <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </span>
                    <div onClick={this.logout}>
                        <span className="name">{this.props.userName}</span>
                        <LoginOutlined />
                        <span className="logout">退出</span>
                    </div>
                </div>
                
            </div>
        )
    }
}

// 获取state状态数据
const mapStateToProps = (state) => {
    console.log(state.app,'mapStateToProps')
    return {
        userName: state.app.username
    }
}

// 派发
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            logout:logoutAction
        },dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header))