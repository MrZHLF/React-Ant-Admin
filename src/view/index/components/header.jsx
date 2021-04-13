import React, { Component } from 'react'
import {  MenuFoldOutlined ,MenuUnfoldOutlined} from '@ant-design/icons';
import './aside.scss';
export default class Header extends Component {
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
                </div>
            </div>
        )
    }
}
