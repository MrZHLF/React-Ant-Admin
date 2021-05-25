import React, { Component,Fragment } from 'react'
import {Link,withRouter} from 'react-router-dom'
import Router from './../../router/index'

import {  Menu } from 'antd';
const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props) {
        super(props);
        this.state= {
            router:[],
            selectedKeys:[],
            openKeys:[]
        }
    }
    // 组件挂载完成之前
    UNSAFE_componentWillMount() {
        const role = sessionStorage.getItem('role').split(',')
        // 存储路由
        let routersArray = [];
        routersArray = Router.filter((item) => {
            // 第一层
            if (this.hasPermission(role,item)) {
                if (item.child && item.child.length > 0) {
                    item.child.filter(child => {
                        if(this.hasPermission(role,child)) {
                            return child
                        }
                    })
                    return item
                }
                return item
            }
        })
        console.log(routersArray,'routersArray')
        this.setState({
            router: routersArray
        })
    }

    hasPermission = (role,router) => {
        if (router.role && router.role.length > 0) {
            return role.some(elem => router.role.indexOf(elem) >= 0)
        }
    }

    componentDidMount(){
        // 菜单状态
        const pathname = this.props.location.pathname;
        const menukey = pathname.split("/").slice(0,3).join('/');

        const menuHigh = {
            selectedKeys: pathname,
            openKeys: menukey
        }
        this.selectMenuHigh(menuHigh)
    }

    selectMenu =({item,key,keyPath}) => {
        // 选中菜单
        const menuHigh = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length - 1]
        }
        this.selectMenuHigh(menuHigh)
    }

    openMenu = (openKeys) => {
        // 展开
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }


    selectMenuHigh = ({selectedKeys,openKeys}) => {
        // 菜单高亮
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        })
    }

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
        const { selectedKeys,openKeys,router } = this.state
        return (
            <Fragment>
                <Menu
                    onOpenChange={this.openMenu}
                    onClick={this.selectMenu}
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    {
                        router && router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMnenu(firstItem) : this.renderMenu(firstItem)
                        }) 
                    }
                    
                    </Menu>
            </Fragment>
        )
    }
}
export default withRouter(AsideMenu)