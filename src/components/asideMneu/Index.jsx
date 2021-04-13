import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
import Router from './../../router/index'

import { UserOutlined } from '@ant-design/icons';
import {  Menu } from 'antd';
const { SubMenu } = Menu;
console.log(Router,'Router');
class AsideMenu extends Component {
    // 处理一级菜单栏
    renderMenu =({title,key}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }   
    // 处理子级菜单栏
    renderSubMnenu = ({title,key,child}) => {
        return (
            <SubMenu key={key} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMnenu(item) : this.renderMenu(item)
                    })
                }
            </SubMenu>
        )
        
    }
    render() {
        return (
            <Fragment>
               
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMnenu(firstItem) : this.renderMenu(firstItem)
                        }) 
                    }
                    
                    </Menu>
            </Fragment>
        )
    }
}
export default AsideMenu