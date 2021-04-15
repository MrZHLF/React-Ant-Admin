import React, { Component,Fragment } from 'react'

import  { Form, Input, Button,Table,Switch, message } from 'antd'
import { GetList,Delete } from '@api/department'
class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {title:"部门名称",dataIndex:"name",key:"name"},
                {
                    title:"禁启用",
                    dataIndex:"status",
                    key:"status",
                    render:(text,rowData)  => {
                        return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
                    }
                },
                {title:"人员数量",dataIndex:"number",key:"number"},
                {
                    title:"操作",
                    dataIndex:"opeartion",
                    key:"opeartion",
                    width: 215,
                    render:(text,rowData)=> {
                        return (
                            <div className="inline-button">
                                <Button type="primary">编辑</Button>
                                <Button onClick={()=>this.onHandlerDelete(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data:[],
            pageNumber:1,
            pageSize:10,
            keyWork:"",
            selectedRowKeys:[]
        }
    }
    // 生命周期挂载完成
    componentDidMount(){
        this.loadData()
    }
    loadData =() =>{
        const {pageNumber, pageSize, keyWork}=this.state
        const requestData = {
            pageNumber,
            pageSize,
        }
        if (keyWork) {
            requestData.name = keyWork
        }
        GetList(requestData).then(response => {
            const responseData = response.data.data
            if(responseData.data) {
                this.setState({
                    data:responseData.data
                })
            }
            console.log(responseData)
        })
    }
    // 搜索
    onFinish = (value) => {
        console.log(value)
        this.setState({
            keyWork:value.name,
            pageNumber:1,
            pageSize:10
        })
        this.loadData()
    }
    onHandlerDelete =(id) => {
        if (!id) { return false }
        Delete({id}).then(response => {
            message.info(response.data.message)
            this.loadData()
        })
    }
    // 复选框
    onCheckebox = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys
        })
    }
    render() {
        const { columns,data } =this.state
        const rowSelection = {
            onChange: this.onCheckebox
        }
        return (
            <Fragment>
                <Form 
                    onFinish={this.onFinish}
                    layout="inline">
                    <Form.Item label="部门名称" name="name">
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrap">
                    <Table
                        rowSelection={rowSelection}
                        columns={columns} 
                        dataSource={data} 
                        bordered  
                        rowKey="id"
                    >

                    </Table>
                </div>
                
            </Fragment>
        )
    }
}
export default DepartmentList