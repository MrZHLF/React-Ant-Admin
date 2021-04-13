import React, { Component } from 'react'

import './index.scss';
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
import ContainerMain from '../../components/containerMain/Index'
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;



class Index extends Component {
    constructor(props) {
    super(props);
    this.state={}
    }
    render() {
        return (
            <Layout className="layout-wrap">
                    <Header className="layout-header"><LayoutHeader/></Header>
                <Layout>
                    <Sider width="250px">
                        <LayoutAside/>
                    </Sider>
                    <Content className="layout-main">
                        <ContainerMain/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default Index